"use strict";

import * as REST from "./rest.js";
import AlbumRenderer from "./view/renderer/albumrenderer.js";
import ArtistRenderer from "./view/renderer/artistrenderer.js";
import TrackRenderer from "./view/renderer/trackrenderer.js";
import ListRenderer from "./view/renderer/listrenderer.js";
import ArtistCreateDialog from "./view/artistdialog/artistcreatedialog.js";
import ArtistDeleteDialog from "./view/artistdialog/artistdeletedialog.js";

window.addEventListener("load", initApp);

const artistRenderer = new ArtistRenderer();
const albumRenderer = new AlbumRenderer();
const trackRenderer = new TrackRenderer();

let artists = [];
let artistList = new ListRenderer([], "#artists", artistRenderer);
let albums = [];
let tracks = [];
let deleteDialog = null;

async function initApp() {
  console.log("JS kører");
  const searchInput = document.querySelector("#searchbar");
  searchInput.addEventListener("input", () => {
    const query = searchInput.value;
    searchBackend(query, artistListRenderer, albumListRenderer, trackListRenderer);
  });

  // EVENT LISTENERS

  // CREATE EVENT
  const createButton = document.querySelector("#create-new-button");
  const artistCreateDialog = new ArtistCreateDialog("artist-create-dialog");
  artistCreateDialog.render();
  createButton.addEventListener("click", () => {
    artistCreateDialog.show();
  });

  // DELETE EVENT
  const container = document.querySelector("#artists");
  container.addEventListener("click", async (event) => {
    if (event.target.classList.contains("artist-delete-button")) {
      const artistId = event.target.getAttribute("data-artist-id");
      if (artistId) {
        const confirmed = confirm("Are you sure you want to delete this artist?");
        if (confirmed) {
          const deleted = await REST.deleteArtist(artistId);
          if (deleted) {
            // Refresh the artist list
            const updatedArtists = await REST.readArtists();
            artistList.setList(updatedArtists);
            artistList.render();
          }
        }
      }
    }
  });

  const artists = await REST.readArtists();
  const albums = await REST.readAlbums();
  const tracks = await REST.readTracks();

  const artistListRenderer = new ListRenderer(artists, "#artists", artistRenderer);
  const albumListRenderer = new ListRenderer(albums, "#albums", albumRenderer);
  const trackListRenderer = new ListRenderer(tracks, "#tracks", trackRenderer);

  // Sort and render the lists as needed
  // artistListRenderer.sort("name", "asc");
  artistListRenderer.render();

  // Clear and render a new list
  //albumListRenderer.clear();
  //albumListRenderer.sort("release_date", "desc");
  albumListRenderer.render();

  trackListRenderer.render();

  await REST.updateArtistsGrid();
}

function renderArtists(artists) {
  const container = document.querySelector("#artists");
  container.innerHTML = "";
  for (const artist of artists) {
    const html = artistRenderer.render(artist);
    container.insertAdjacentHTML("beforeend", html);
  }
}

function renderAlbums(albums) {
  const container = document.querySelector("#albums");
  container.innerHTML = "";
  for (const album of albums) {
    const html = albumRenderer.render(album);
    container.insertAdjacentHTML("beforeend", html);
  }
}

function renderTracks(tracks) {
  const container = document.querySelector("#tracks");
  container.innerHTML = "";
  for (const track of tracks) {
    const html = trackRenderer.render(track);
    container.insertAdjacentHTML("beforeend", html);
  }
}

async function createArtist(artist) {
  try {
    await REST.createArtist(artist);

    const updatedArtists = await REST.readArtists();
    artistList.setList(updatedArtists);
    artistList.render();
  } catch (error) {
    console.log(error);
  }
}

async function deleteArtist(artist) {
  try {
    await REST.deleteArtist(artist);

    artists = await REST.readArtists();
    artistList.setList(artist);
    artistList.render();
  } catch (error) {
    console.log(error);
  }
}

export { artistRenderer, albumRenderer, trackRenderer, renderAlbums, renderArtists, renderTracks, createArtist, deleteArtist };
