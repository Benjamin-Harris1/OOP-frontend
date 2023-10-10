"use strict";

import { updateArtistsGrid, searchBackend, readArtists, readAlbums, readTracks } from "./rest.js";
import ItemRenderer from "./view/itemrenderer.js";
import AlbumRenderer from "./view/albumrenderer.js";
import ArtistRenderer from "./view/artistrenderer.js";
import TrackRenderer from "./view/trackrenderer.js";

window.addEventListener("load", initApp);

let artists = [];
let albums = [];
let tracks = [];

async function initApp() {
  console.log("JS kører");
  const searchInput = document.querySelector("#searchbar");
  searchInput.addEventListener("input", () => {
    const query = searchInput.value;
    searchBackend(query);
  });

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

const artistRenderer = new ItemRenderer((artist) => {
  return `
  <h2>${artist.title}</h2>
  <p>Career start: ${artist.career_start.toLocaleString("da", {})}</p>
  `;
});

const artistHtml = artistRenderer.render(artist);

// function showArtists(artists) {
//   document.querySelector("#artists").innerHTML = "";
//   for (const artist of artists) {
//     const html =
//       /*html*/
//       `
//       <article class="grid-item-artist">
//       <h2>${artist.name}</h2>
//       <p>Career start: ${artist.career_start}</p>
//       </article>
//     `;
//     document.querySelector("#artists").insertAdjacentHTML("beforeend", html);
//   }
// }

// function showAlbums(albums) {
//   document.querySelector("#albums").innerHTML = "";
//   for (const album of albums) {
//     const html =
//       /*html*/
//       `
//       <article class="grid-item-artist">
//       <h2>${album.title}</h2>
//       <p>Release date: ${album.release_date}</p>
//       </article>
//     `;
//     document.querySelector("#albums").insertAdjacentHTML("beforeend", html);
//   }
// }

const albumRenderer = new ItemRenderer((album) => {
  return `
    <h2>${album.title}</h2>
    <p>Release date: ${album.release_date.toLocaleString("da", { month: "short", day: "numeric", year: "numeric" })}</p>
  `;
});

const albumHtml = albumRenderer.render(album);

// function showTracks(tracks) {
//   document.querySelector("#tracks").innerHTML = "";
//   for (const track of tracks) {
//     const html =
//       /*html*/
//       `
//       <article class="grid-item-artist">
//       <h2>${track.title}</h2>
//       <p>Duration: ${track.duration}</p>
//       </article>
//     `;
//     document.querySelector("#tracks").insertAdjacentHTML("beforeend", html);
//   }
// }

const trackRenderer = new ItemRenderer((track) => {
  return `
  <h2>${track.title}</h2>
  <p>Duration: ${track.duration}</p>
  `;
});

const trackHtml = trackRenderer.render(track);

export { artistRenderer, albumRenderer, trackRenderer, renderAlbums, renderArtists, renderTracks };
