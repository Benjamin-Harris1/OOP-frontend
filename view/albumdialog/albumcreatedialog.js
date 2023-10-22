import Dialog from "../dialog.js";
import Album from "../../model/album.js";
import * as controller from "../../app.js";
import * as REST from "../../rest.js";

export default class AlbumCreateDialog extends Dialog {
  constructor(id) {
    super(id);
  }

  async populateArtistsDropdown() {
    const form = this.dialog.querySelector("form");
    const artistSelect = form.querySelector("#create-artist-id");

    // Fetch the artists from the backend
    const artists = await REST.readArtists();

    // Clear any existing options
    artistSelect.innerHTML = "";

    // Populate the select with the retrieved artists
    artists.forEach((artist) => {
      const option = document.createElement("option");
      option.value = artist.id;
      option.textContent = artist.name;
      artistSelect.appendChild(option);
    });
  }

  renderHTML() {
    const html = /*html*/ `
      <div>
         <button class="close-button" id="closeDialog">X</button>
        <h2>Create Album</h2>
        <form action="" method="dialog" id="create-album-form">
          <label for="create-title">Title:</label>
          <input type="text" id="create-title" name="title" placeholder="Type the title of the album here ...">
          <label for="create-release_date">Release date:</label>
          <input type="text" id="create-release_date" name="release_date" placeholder="Type the date of the album's release date ...">
          <label for="create-artist-id">Artist:</label>
          <select id="create-artist-id" name="artist_id">
            <!-- Artist options will be dynamically generated here -->
          </select>
          <button data-action="create">Create</button>
        </form>
      </div>
    `;
    return html;
  }

  create() {
    const form = this.dialog.querySelector("form");
    this.album = new Album({
      title: form.title.value,
      release_date: form.release_date.value,
      artist_id: form.artist_id.value,
    });

    form.reset();

    controller.createAlbum(this.album);
  }
}
