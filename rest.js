"use strict";

import { artistRenderer, albumRenderer, trackRenderer, renderAlbums, renderArtists, renderTracks } from "./app.js";
import Artist from "./model/artist.js";
import Album from "./model/album.js";
import Track from "./model/track.js";

const endpoint = "https://mabi-testdata-01.azurewebsites.net/";

async function readArtists() {
  const response = await fetch(`${endpoint}/artists`);
  const data = await response.json();
  return data.map((artistData) => new Artist(artistData));
}

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

async function searchBackend(query) {
  const response = await fetch(`${endpoint}/fullAlbums/search?q=${query}`);
  const searchData = await response.json();
  updateSearchResults(searchData);
}

function updateSearchResults(searchResults) {
  if (searchResults && Array.isArray(searchResults)) {
    const filteredArtists = [];
    const filteredAlbums = [];
    const filteredTracks = [];

    for (const result of searchResults) {
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

    showArtists(filteredArtists);
    showAlbums(filteredAlbums);
    showTracks(filteredTracks);
  } else {
    console.log("Invalid search results data");
  }
}

export { updateArtistsGrid, searchBackend, readAlbums, readArtists, readTracks };
