"use strict";

import { updateArtistsGrid, searchBackend, readArtists, readAlbums, readTracks } from "./rest.js";
import AlbumRenderer from "./view/albumrenderer.js";
import ArtistRenderer from "./view/artistrenderer.js";
import TrackRenderer from "./view/trackrenderer.js";
import ListRenderer from "./view/listrenderer.js";

window.addEventListener("load", initApp);

let artists = [];
let albums = [];
let tracks = [];

const artistRenderer = new ArtistRenderer();
const albumRenderer = new AlbumRenderer();
const trackRenderer = new TrackRenderer();

async function initApp() {
  console.log("JS kører");
  const searchInput = document.querySelector("#searchbar");
  searchInput.addEventListener("input", () => {
    const query = searchInput.value;
    searchBackend(query);
  });

  const artists = await readArtists();
  const albums = await readAlbums();
  const tracks = await readTracks();

  const artistListRenderer = new ListRenderer(artists, "#artists", artistRenderer);
  const albumListRenderer = new ListRenderer(albums, "#albums", albumRenderer);
  const trackListRenderer = new ListRenderer(tracks, "#tracks", trackRenderer);

  // Sort and render the lists as needed
  // artistListRenderer.sort("name", "asc");
  artistListRenderer.render();

  // Clear and render a new list
  albumListRenderer.clear();
  //albumListRenderer.sort("release_date", "desc");
  albumListRenderer.render();

  await updateArtistsGrid();
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

export { artistRenderer, albumRenderer, trackRenderer, renderAlbums, renderArtists, renderTracks };
