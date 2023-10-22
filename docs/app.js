"use strict";

import * as REST from "../rest.js";
import AlbumRenderer from "../view/renderer/albumrenderer.js";
import ArtistRenderer from "../view/renderer/artistrenderer.js";
import TrackRenderer from "../view/renderer/trackrenderer.js";
import ListRenderer from "../view/renderer/listrenderer.js";
import ArtistCreateDialog from "../view/artistdialog/artistcreatedialog.js";
import ArtistDeleteDialog from "../view/artistdialog/artistdeletedialog.js";
import ArtistUpdateDialog from "../view/artistdialog/artistupdatedialog.js";
import AlbumCreateDialog from "../view/albumdialog/albumcreatedialog.js";
import AlbumUpdateDialog from "../view/albumdialog/albumupdatedialog.js";
import AlbumDeleteDialog from "../view/albumdialog/albumdeletedialog.js";
import TrackCreateDialog from "../view/trackdialog/trackcreatedialog.js";
import TrackUpdateDialog from "../view/trackdialog/trackupdatedialog.js";
import TrackDeleteDialog from "../view/trackdialog/trackdeletedialog.js";

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
    REST.searchBackend(query, artistListRenderer, albumListRenderer, trackListRenderer);
  });

  //  EVENTS FOR CREATE BUTTONS
  setUpCreateArtistDialog();
  setUpCreateAlbumDialog();
  setUpCreateTrackDialog();

  // OPEN DIALOG FUNCTION
  // Open dialog function
  function openDialog(dialog) {
    dialog.show();
    const closeDialogButton = dialog.getCloseButton(); // Make sure your dialog class has a method to get the close button

    function closeDialogHandler() {
      dialog.close();
      closeDialogButton.removeEventListener("click", closeDialogHandler);
    }

    closeDialogButton.addEventListener("click", closeDialogHandler);
  }

  // ARTIST UPDATE EVENT
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("update-artist-button")) {
      const artistId = event.target.getAttribute("data-artist-id");
      const artistName = event.target.parentElement.querySelector("h2").getAttribute("data-artist-name");
      const careerStart = event.target.parentElement.querySelector("p").getAttribute("data-career-start");
      openArtistUpdateDialog(artistId, artistName, careerStart);
    }
  });

  // Open Artist Update Dialog function
  function openArtistUpdateDialog(artistId, artistName, careerStart) {
    const updateDialog = new ArtistUpdateDialog();
    updateDialog.render();
    updateDialog.setArtist(artistId, artistName, careerStart);
    openDialog(updateDialog);
  }

  // ALBUM UPDATE EVENT
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("update-album-button")) {
      const albumId = event.target.getAttribute("data-album-id");
      const artistId = event.target.getAttribute("data-artist-id");
      const albumTitle = event.target.parentElement.querySelector("h2").getAttribute("data-album-title");
      const releaseDate = event.target.parentElement.querySelector("p").getAttribute("data-release-date");
      openAlbumUpdateDialog(albumId, albumTitle, releaseDate, artistId);
    }
  });

  async function openAlbumUpdateDialog(albumId, albumTitle, releaseDate, artistId) {
    const updateDialog = new AlbumUpdateDialog();
    updateDialog.render();
    // const selectedArtistId = artistId;
    updateDialog.populateArtistsDropdown();
    updateDialog.setAlbum(albumId, albumTitle, releaseDate, artistId);
    openDialog(updateDialog);
  }

  // TRACK UPDATE EVENT
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("track-update-button")) {
      const trackId = event.target.getAttribute("data-track-id");
      const albumId = event.target.getAttribute("data-album-id");
      const artistId = event.target.getAttribute("data-artist-id");
      const trackTitle = event.target.parentElement.querySelector("h2").getAttribute("data-track-title");
      const trackDuration = event.target.parentElement.querySelector("p").getAttribute("data-track-duration");
      openTrackUpdateDialog(trackId, trackTitle, trackDuration, albumId, artistId);
    }
  });

  async function openTrackUpdateDialog(trackId, trackTitle, trackDuration, albumId, artistId) {
    const updateDialog = new TrackUpdateDialog();
    updateDialog.render();
    updateDialog.populateAlbumsDropdown();
    updateDialog.setTrack(trackId, trackTitle, trackDuration, albumId, artistId);
    openDialog(updateDialog);
    const albumSelect = updateDialog.dialog.querySelector("#update-album-id");
    albumSelect.addEventListener("change", async () => {
      await updateDialog.populateArtistsByAlbumDropdown();
    });
  }

  // EVENTS FOR CREATE BUTTONS
  function setUpCreateArtistDialog() {
    const createArtistButton = document.querySelector("#create-artist-button");
    const artistCreateDialog = new ArtistCreateDialog("artist-create-dialog");
    artistCreateDialog.render();
    createArtistButton.addEventListener("click", () => {
      openDialog(artistCreateDialog);
    });
  }

  function setUpCreateAlbumDialog() {
    const createAlbumButton = document.querySelector("#create-album-button");
    const albumCreateDialog = new AlbumCreateDialog("album-create-dialog");
    albumCreateDialog.render();
    albumCreateDialog.populateArtistsDropdown();
    createAlbumButton.addEventListener("click", () => {
      openDialog(albumCreateDialog);
    });
  }

  function setUpCreateTrackDialog() {
    const createTrackButton = document.querySelector("#create-track-button");
    const trackCreateDialog = new TrackCreateDialog("track-create-dialog");
    trackCreateDialog.render();
    trackCreateDialog.populateAlbumsDropdown();
    createTrackButton.addEventListener("click", () => {
      openDialog(trackCreateDialog);
    });

    const albumSelect = trackCreateDialog.dialog.querySelector("#create-album-id");
    albumSelect.addEventListener("change", async () => {
      await trackCreateDialog.populateArtistsByAlbumDropdown();
    });
  }

  // ARTIST DELETE EVENT
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("artist-delete-button")) {
      const artistId = event.target.getAttribute("data-artist-id");
      const artistName = event.target.parentElement.querySelector("h2").getAttribute("data-artist-name");
      const careerStart = event.target.parentElement.querySelector("p").getAttribute("data-career-start");
      openArtistDeleteDialog(artistId, artistName, careerStart);
    }
  });

  function openArtistDeleteDialog(artistId, artistName, careerStart) {
    const deleteDialog = new ArtistDeleteDialog();
    deleteDialog.render();
    deleteDialog.setArtist(artistId, artistName, careerStart);
    deleteDialog.show();
  }

  // ALBUM DELETE EVENT
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("album-delete-button")) {
      const albumId = event.target.getAttribute("data-album-id");
      const albumTitle = event.target.parentElement.querySelector("h2").getAttribute("data-album-title");
      const releaseDate = event.target.parentElement.querySelector("p").getAttribute("data-release-date");
      openAlbumDeleteDialog(albumId, albumTitle, releaseDate);
    }
  });

  function openAlbumDeleteDialog(albumId, albumTitle, releaseDate) {
    const deleteDialog = new AlbumDeleteDialog();
    deleteDialog.render();
    deleteDialog.setAlbum(albumId, albumTitle, releaseDate);
    deleteDialog.show();
  }

  // TRACK DELETE EVENT
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("track-delete-button")) {
      const trackId = event.target.getAttribute("data-track-id");
      const trackTitle = event.target.parentElement.querySelector("h2").getAttribute("data-track-title");
      const trackDuration = event.target.parentElement.querySelector("p").getAttribute("data-track-duration");
      openTrackDeleteDialog(trackId, trackTitle, trackDuration);
    }
  });

  function openTrackDeleteDialog(trackId, trackTitle, trackDuration) {
    const deleteDialog = new TrackDeleteDialog();
    deleteDialog.render();
    deleteDialog.setTrack(trackId, trackTitle, trackDuration);
    deleteDialog.show();
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
  artists.sort((a, b) => a.name.localeCompare(b.name));
  const container = document.querySelector("#artists");
  container.innerHTML = "";
  for (const artist of artists) {
    const html = artistRenderer.render(artist);
    container.insertAdjacentHTML("beforeend", html);
  }
}

async function renderAlbums(albums) {
  albums.sort((a, b) => a.title.localeCompare(b.title));
  const container = document.querySelector("#albums");
  container.innerHTML = "";
  for (const album of albums) {
    const html = albumRenderer.render(album);
    container.insertAdjacentHTML("beforeend", html);
  }
}

function renderTracks(tracks) {
  tracks.sort((a, b) => a.title.localeCompare(b.title));
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
    artistList.setList(artists);
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

async function deleteAlbum(album) {
  try {
    await REST.deleteAlbum(album);
    albums = await REST.readAlbums();
    albumList.setList(albums);
    albumList.render();
  } catch (error) {
    console.log(error);
  }
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

async function updateTrack(track) {
  try {
    await REST.updateTrack(track);
    tracks = await REST.readTracks();
    trackList.setList(tracks);
    trackList.render();
  } catch (error) {
    console.log(error);
  }
}

async function deleteTrack(track) {
  try {
    await REST.deleteTrack(track);
    tracks = await REST.readTracks();
    trackList.setList(tracks);
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
  updateTrack,
  deleteTrack,
};
