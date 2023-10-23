import Dialog from "../dialog.js";
import Track from "../../model/track.js";
import * as controller from "../../app.js";
import * as REST from "../../rest.js";

export default class TrackCreateDialog extends Dialog {
  constructor(id) {
    super(id);
  }

  async populateAlbumsDropdown() {
    const form = this.dialog.querySelector("form");
    const albumSelect = form.querySelector("#create-album-id");

    // FETCH ALBUMS FROM BACKEND
    const albums = await REST.readAlbums();

    // CLEAR HTML
    albumSelect.innerHTML = "";

    // POPULATE WITH RETRIEVED ARRAY
    albums.forEach((album) => {
      const option = document.createElement("option");
      option.value = album.id;
      option.textContent = album.title;
      albumSelect.appendChild(option);
    });
  }

  async populateArtistsByAlbumDropdown() {
    const form = this.dialog.querySelector("form");
    const albumSelect = form.querySelector("#create-album-id");
    const artistSelect = form.querySelector("#create-artist-id");

    // GET THE SELECTED ALBUM ID
    const selectedAlbumId = albumSelect.value;

    // FETCH ARTISTS FROM BACKEND
    const artists = await REST.readAlbumsArtists(selectedAlbumId);
    console.log(artists);

    // FILTER ARTISTS BASED ON THE SELECTED ALBUM ID
    const filteredArtists = artists.filter((artist) => artist.album_id == selectedAlbumId);

    artistSelect.innerHTML = "";

    // POPULATE THE SELECT BASED ON ALBUM ID
    filteredArtists.forEach((artist) => {
      const option = document.createElement("option");
      option.value = artist.artist_id;
      option.textContent = artist.artist_name;
      artistSelect.appendChild(option);
    });
  }

  renderHTML() {
    const html =
      /*html*/
      `
      <button class="close-button" id="closeDialog">X</button>
      <h1>Create track</h1>
    <form action="" method="dialog" id="create-track-form">
      <label for="create-title">Title:</label>
      <input type="text" id="create-title" name="title" placeholder="Type the title of the track here ...">
      <label for="create-duration">Duration:</label>
      <input type="text" id="create-duration" name="duration" placeholder="Type the duration e.g. 4:19...">
      <label for="create-album-id">Albums:</label>
      <select id="create-album-id" name="album_id">
      </select>
      <label for="create-artist-id">Artists</label>
      <select id="create-artist-id" name="artist_id"></select>
      <button data-action="create">Create</button>
    </form>
        `;
    return html;
  }

  create() {
    const form = this.dialog.querySelector("form");
    this.track = new Track({
      title: form.title.value,
      duration: form.duration.value,
      album_id: form.album_id.value,
      artist_id: form.artist_id.value,
    });

    form.reset();
    controller.createTrack(this.track);
  }
}
