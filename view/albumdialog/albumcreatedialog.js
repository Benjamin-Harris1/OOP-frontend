import Dialog from "../dialog.js";
import Album from "../../model/album.js";
import * as controller from "../../app.js";
import * as REST from "../../rest.js";

export default class AlbumCreateDialog extends Dialog {
  async renderHTML() {
    const artists = await REST.readArtists();
    const artistOptions = artists.map((artist) => {
      return `<option value="${artist.id}">${artist.name}</option>`;
    });
    const html = /*html*/ `
      <h1>Create album</h1>
      <form action="" method="dialog" id="create-album-form">
        <label for="create-title">Title:</label>
        <input type="text" id="create-title" name="title" placeholder="Type the title of the album here ...">
        <label for="create-release_date">Release date:</label>
        <input type="text" id="create-release_date" name="release_date" placeholder="Type the date of the album's release date ...">
        <label for="create-artist-id">Select Artist:</label>
        <select id="create-artist-id" name="artist_id">
          ${artistOptions.join("")}
        </select>
        <button data-action="create">Create</button>
      </form>
    `;
    return html; // Return the HTML string
  }

  async render() {
    const html = await this.renderHTML(); // Wait for HTML generation
    this.dialog.innerHTML = html; // Set the HTML content of the dialog
    this.postRender(); // Attach event listeners
  }

  create() {
    const form = this.dialog.querySelector("form");
    const artistId = form.artist_id.value || null; // Set artist_id to null if not specified
    this.album = new Album({
      title: form.title.value,
      release_date: form.release_date.value,
      artist_id: artistId,
    });

    form.reset();

    controller.createAlbum(this.album);
  }
}
