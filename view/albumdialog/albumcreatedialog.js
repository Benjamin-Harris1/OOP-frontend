import Dialog from "../dialog.js";
import Album from "../../model/album.js";
import * as controller from "../../app.js";

export default class AlbumCreateDialog extends Dialog {
  renderHTML() {
    const html = /*html*/ `
      <h1>Create album</h1>
      <form action="" method="dialog" id="create-album-form">
        <label for="create-title">Title:</label>
        <input type="text" id="create-title" name="title" placeholder="Type the title of the album here ...">
        <label for="create-release_date">Release date:</label>
        <input type="text" id="create-release_date" name="release_date" placeholder="Type the date of the album's release date ...">
        <button data-action="create">Create</button>
      </form>
    `;
    return html;
  }

  create() {
    const form = this.dialog.querySelector("form");
    this.album = new Album({
      title: form.title.value,
      release_date: form.release_date.value,
    });

    form.reset();

    controller.createAlbum(this.album);
  }
}
