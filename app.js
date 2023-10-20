"use strict";

import * as REST from "./rest.js";
import AlbumRenderer from "./view/renderer/albumrenderer.js";
import ArtistRenderer from "./view/renderer/artistrenderer.js";
import TrackRenderer from "./view/renderer/trackrenderer.js";
import ListRenderer from "./view/renderer/listrenderer.js";
import ArtistCreateDialog from "./view/artistdialog/artistcreatedialog.js";
import ArtistDeleteDialog from "./view/artistdialog/artistdeletedialog.js";
import ArtistUpdateDialog from "./view/artistdialog/artistupdatedialog.js";
import AlbumCreateDialog from "./view/albumdialog/albumcreatedialog.js";
import TrackCreateDialog from "./view/trackdialog/trackcreatedialog.js";

// INITIALIZE RENDERERS
const artistRenderer = new ArtistRenderer();
const albumRenderer = new AlbumRenderer();
const trackRenderer = new TrackRenderer();

// INITIALIZE EMPTY ARRAYS
let artists = [];
let albums = [];
let tracks = [];

// INITIALIZE LIST RENDERERS
let artistList = new ListRenderer([], "#artists", artistRenderer);
let albumList = new ListRenderer([], "#albums", albumRenderer);
let trackList = new ListRenderer([], "#tracks", trackRenderer);

// EVENT LISTENERS
window.addEventListener("load", initApp);

async function initApp() {
  console.log("JS kører");

  // SEARCH EVENT
  const searchInput = document.querySelector("#searchbar");
  searchInput.addEventListener("input", () => {
    const query = searchInput.value;
    searchBackend(query, artistListRenderer, albumListRenderer, trackListRenderer);
  });

  //  EVENTS
  setUpCreateArtistDialog();
  setUpCreateAlbumDialog();
  setUpCreateTrackDialog();
  setUpDeleteEvent();

  // VIRKER IKKE
  document.addEventListener("click", event => {
    if (event.target.classList.contains("update-artist-button")) {
      const artistId = event.target.getAttribute("data-artist-id");
      openArtistUpdateDialog(artistId);
    }
  });

  function openArtistUpdateDialog(artistId) {
    // Create an instance of the ArtistUpdateDialog
    const updateDialog = new ArtistUpdateDialog();
    updateDialog.setArtist(artistId);
    updateDialog.render();
    updateDialog.show();
  }

  function setUpCreateArtistDialog() {
    const createArtistButton = document.querySelector("#create-artist-button");
    const artistCreateDialog = new ArtistCreateDialog("artist-create-dialog");
    artistCreateDialog.render();
    createArtistButton.addEventListener("click", () => {
      artistCreateDialog.show();
    });
  }

  function setUpCreateAlbumDialog() {
    const createAlbumButton = document.querySelector("#create-album-button");
    const albumCreateDialog = new AlbumCreateDialog("album-create-dialog");
    albumCreateDialog.render();
    albumCreateDialog.populateArtistsDropdown();
    createAlbumButton.addEventListener("click", () => {
      albumCreateDialog.show();
    });
  }

  function setUpCreateTrackDialog() {
    const createTrackButton = document.querySelector("#create-track-button");
    const trackCreateDialog = new TrackCreateDialog("track-create-dialog");
    trackCreateDialog.render();
    createTrackButton.addEventListener("click", () => {
      trackCreateDialog.show();
    });
  }

  function setUpDeleteEvent() {
    // const deleteArtistButton = document.querySelector(".artist-delete-button");
    // const deleteDialog = new ArtistDeleteDialog("artist-delete-dialog");
    // deleteDialog.render();
    // deleteArtistButton.addEventListener("click", () => {
    //   deleteDialog.show();
    // });
  }

  artists = await REST.readArtists();
  albums = await REST.readAlbums();
  tracks = await REST.readTracks();

  const artistListRenderer = new ListRenderer(artists, "#artists", artistRenderer);
  const albumListRenderer = new ListRenderer(albums, "#albums", albumRenderer);
  const trackListRenderer = new ListRenderer(tracks, "#tracks", trackRenderer);

  artistListRenderer.render();
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

// ARTIST CREATE, UPDATE, DELETE
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

async function updateArtist(artist) {
  try {
    await REST.updateArtist(artist);
    artists = await REST.readArtists();
    artistList.setList(artists);
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

// ALBUM CREATE, UPDATE, DELETE
async function createAlbum(album) {
  try {
    await REST.createAlbum(album); // Make sure createAlbum in rest.js returns a promise

    const updatedAlbums = await REST.readAlbums();
    albumList.setList(updatedAlbums);
    albumList.render();
  } catch (error) {
    console.log(error);
  }
}

async function updateAlbum(album) {
  try {
    await REST.updateAlbum(album);
    albums = await REST.readAlbums();
    albumList.setList(albums);
    albumList.render();
  } catch (error) {
    console.log(error);
  }
}

async function deleteAlbum() {
  await REST.deleteAlbum(album);
  albums = await REST.readAlbums();
  albumList.setList(album);
  albumList.render();
}

async function createTrack(track) {
  try {
    await REST.createTrack(track);
    const updatedTracks = await REST.readTracks();
    trackList.setList(updatedTracks);
    trackList.render();
  } catch (error) {
    console.log(error);
  }
}

export {
  artistRenderer,
  albumRenderer,
  trackRenderer,
  renderAlbums,
  renderArtists,
  renderTracks,
  createArtist,
  deleteArtist,
  createAlbum,
  updateArtist,
  updateAlbum,
  deleteAlbum,
  createTrack,
};
