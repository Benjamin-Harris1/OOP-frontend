"use strict";

import { artistRenderer, albumRenderer, trackRenderer, renderAlbums, renderArtists, renderTracks } from "./app.js";
import Artist from "./model/artist.js";
import Album from "./model/album.js";
import Track from "./model/track.js";

const endpoint = "http://localhost:3000";

let allArtists = [];
let allAlbums = [];
let lastFetch = 0;

// FETCH ARTISTS
async function readArtists() {
  const response = await fetch(`${endpoint}/artists`);
  const artistData = await response.json();
  return artistData.map(artist => {
    return {
      id: artist.id,
      name: artist.name,
      career_start: artist.career_start,
    };
  });
}

// FETCH ALBUMS
async function readAlbums() {
  const response = await fetch(`${endpoint}/albums`);
  const albumData = await response.json();
  return albumData.map(album => {
    return {
      id: album.id,
      title: album.title,
      release_date: album.release_date,
    };
  });
}

// FETCH TRACKS
async function readTracks() {
  const response = await fetch(`${endpoint}/tracks`);
  const trackData = await response.json();
  return trackData.map(track => {
    return {
      id: track.id,
      title: track.title,
      duration: track.duration,
    };
  });
}

async function updateArtistsGrid() {
  const artistsData = await readArtists();
  const albumsData = await readAlbums();
  const tracksData = await readTracks();

  const artists = artistsData.map(artistData => new Artist(artistData));
  const albums = albumsData.map(albumData => new Album(albumData));
  const tracks = tracksData.map(trackData => new Track(trackData));

  renderArtists(artists, artistRenderer);
  renderAlbums(albums, albumRenderer);
  renderTracks(tracks, trackRenderer);
}

async function searchBackend(query, artistListRenderer, albumListRenderer, trackListRenderer) {
  const response = await fetch(`${endpoint}/fullAlbums/search?q=${query}`);
  const searchData = await response.json();

  // Filter and update search results in the corresponding list renderer
  if (searchData && Array.isArray(searchData)) {
    const filteredArtists = [];
    const filteredAlbums = [];
    const filteredTracks = [];

    for (const result of searchData) {
      if (result.name !== null && result.career_start !== null) {
        filteredArtists.push(result);
      }
      if (result.title !== null && result.release_date !== null) {
        filteredAlbums.push(result);
      }
      if (result.title !== null && result.duration !== null) {
        filteredTracks.push(result);
      }
    }

    // Update the respective list renderers with the filtered data
    artistListRenderer.setList(filteredArtists);
    albumListRenderer.setList(filteredAlbums);
    trackListRenderer.setList(filteredTracks);
    console.log(filteredArtists);
    console.log(filteredAlbums);
    console.log(filteredTracks);

    // Render the updated lists
    artistListRenderer.render();
    albumListRenderer.render();
    trackListRenderer.render();
  } else {
    console.log("Invalid search results data");
  }
}

// ARTISTS CREATE, UPDATE, DELETE

async function createArtist(artist) {
  const json = JSON.stringify(artist);
  const response = await fetch(`${endpoint}/artists`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: json,
  });
  console.log(response);
  await readArtists();
  if (response.ok) {
    updateArtistsGrid();
  }
}

async function updateArtist(artist) {
  const json = JSON.stringify(artist);
  const response = await fetch(`${endpoint}/artists/${artist.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: json,
  });

  await readArtists();
  if (response.ok) {
    updateArtistsGrid();
  }
}

async function deleteArtist(artist) {
  const response = await fetch(`${endpoint}/artists/${artist.id}`, {
    method: "DELETE",
  });

  await readArtists();
  if (response.ok) {
    updateArtistsGrid();
  }
}

// ALBUM CREATE, UPDATE, DELETE

async function createAlbum(album) {
  const json = JSON.stringify(album);
  const response = await fetch(`${endpoint}/albums`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: json,
  });
  console.log(response);
  await readAlbums();
  if (response.ok) {
    updateArtistsGrid();
  }
}

async function updateAlbum(album) {
  const json = JSON.stringify(album);
  const response = await fetch(`${endpoint}/albums/${album.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: json,
  });

  await readAlbums();
  if (response.ok) {
    updateArtistsGrid();
  }
}

async function deleteAlbum(album) {
  const response = await fetch(`${endpoint}/albums/${album.id}`, {
    method: "DELETE",
  });

  await readAlbums();
  if (response.ok) {
    updateArtistsGrid();
  }
}

// TRACK
async function createTrack(track) {
  const json = JSON.stringify(track);
  const response = await fetch(`${endpoint}/tracks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: json,
  });
  console.log(response);
  await readTracks();
  if (response.ok) {
    updateArtistsGrid();
  }
}

export {
  updateArtistsGrid,
  searchBackend,
  readAlbums,
  readArtists,
  readTracks,
  createArtist,
  updateArtist,
  deleteArtist,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  createTrack,
};
