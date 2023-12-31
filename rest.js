"use strict";

import { artistRenderer, albumRenderer, trackRenderer, renderAlbums, renderArtists, renderTracks } from "./app.js";
import Artist from "./model/artist.js";
import Album from "./model/album.js";
import Track from "./model/track.js";

const endpoint = "https://musicdb-database-kea-benjamin.azurewebsites.net";



// FETCH ARTISTS
async function readArtists() {
  const response = await fetch(`${endpoint}/artists`);
  const artistData = await response.json();
  return artistData.map((artist) => {
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
  return albumData.map((album) => {
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
  return trackData.map((track) => {
    return {
      id: track.id,
      title: track.title,
      duration: track.duration,
    };
  });
}

// FETACH ALBUMS_ARTISTS
async function readAlbumsArtists(artistAlbumId) {
  const response = await fetch(`${endpoint}/albumsArtists`);
  const albumArtistData = await response.json();
  return albumArtistData.map((albumArtist) => {
    return {
      artist_id: albumArtist.artist_id,
      artist_name: albumArtist.artist_name,
      album_id: albumArtist.album_id,
    };
  });
}

// FETCH ALBUMS_TRACKS
async function readAlbumsTracks(albumTrackId) {
  const response = await fetch(`${endpoint}/albumsTracks`);
  const albumTrackData = await response.json();
  return albumTrackData.map((albumTrack) => {
    return {
      album_id: albumTrack.album_id,
      album_title: albumTrack.album_title,
      track_id: albumTrack.track_id,
    };
  });
}
// UPDATE GRID
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
// SEARCH
async function searchBackend(query, artistListRenderer, albumListRenderer, trackListRenderer) {
  const response = await fetch(`${endpoint}/fullAlbums/search?q=${query}`);
  const searchData = await response.json();

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

    renderArtists(filteredArtists);
    renderAlbums(filteredAlbums);
    renderTracks(filteredTracks);
  } else {
    console.log("Invalid search results data");
  }
}

// ARTISTS BACKEND CRUD
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

// ALBUM BACKEND CRUD
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
    method: "PUT",
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

// TRACKS BACKEND CRUD
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

async function updateTrack(track) {
  const json = JSON.stringify(track);
  const response = await fetch(`${endpoint}/tracks/${track.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: json,
  });

  await readTracks();
  if (response.ok) {
    updateArtistsGrid();
  }
}

async function deleteTrack(track) {
  const response = await fetch(`${endpoint}/tracks/${track.id}`, {
    method: "DELETE",
  });

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
  readAlbumsArtists,
  createArtist,
  updateArtist,
  deleteArtist,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  createTrack,
  updateTrack,
  deleteTrack,
  readAlbumsTracks,
};
