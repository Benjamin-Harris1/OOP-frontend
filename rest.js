"use strict";

import { artistRenderer, albumRenderer, trackRenderer, renderAlbums, renderArtists, renderTracks } from "./app.js";
import Artist from "./model/artist.js";
import Album from "./model/album.js";
import Track from "./model/track.js";

const endpoint = "http://localhost:3000";

let allArtists = [];
let lastFetch = 0;

// FETCH ARTISTS
async function readArtists() {
  const now = Date.now();
  const timePassed = now - lastFetch;

  if (timePassed > 10_000) {
    await refetchArtists();
  }
  return allArtists;
}

async function refetchArtists() {
  const response = await fetch(`${endpoint}/artists`);
  const originalArtist = await response.json();
  allArtists = originalArtist.map((jsonObj) => new Artist(jsonObj));

  lastFetch = Date.now();
}

// FETCH ALBUMS
async function readAlbums() {
  const response = await fetch(`${endpoint}/albums`);
  const data = await response.json();
  return data.map((albumData) => new Album(albumData));
}

async function readTracks() {
  const response = await fetch(`${endpoint}/tracks`);
  const data = await response.json();
  return data.map((trackData) => new Track(trackData));
}

async function updateArtistsGrid() {
  const artistsData = await readArtists();
  const albumsData = await readAlbums();
  const tracksData = await readTracks();

  const artists = artistsData.map((artistData) => new Artist(artistData));
  const albums = albumsData.map((albumData) => new Album(albumData));
  const tracks = tracksData.map((trackData) => new Track(trackData));

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

  await refetchArtists();
  return response.ok;
}

async function updateArtist(artist) {
  const json = JSON.stringify(artist);
  const response = await fetch(`${endpoint}/artists`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: json,
  });

  await refetchArtists();
  return response.ok;
}

async function deleteArtist(artist) {
  const response = await fetch(`${endpoint}/artists/${artist.id}`, {
    method: "DELETE",
  });

  await refetchArtists();
  response.ok;
}

export { updateArtistsGrid, searchBackend, readAlbums, readArtists, readTracks, createArtist, updateArtist, deleteArtist };
