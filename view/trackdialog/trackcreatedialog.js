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

    // Fetch albums from backend
    const albums = await REST.readAlbums();

    // Clear existing options
    albumSelect.innerHTML = "";

    // Populate the select with albums
    albums.forEach(album => {
      const option = document.createElement("option");
      option.value = album.id;
      option.textContent = album.title;
      albumSelect.appendChild(option);
    });
  }

  renderHTML() {
    const html =
      /*html*/
      ` <h1>Create track</h1>
    <form action="" method="dialog" id="create-track-form">
      <label for="create-title">Title:</label>
      <input type="text" id="create-title" name="title" placeholder="Type the title of the track here ...">
      <label for="create-duration">Duration:</label>
      <input type="text" id="create-duration" name="duration" placeholder="Type the duration of the track here ...">
      <label for="create-album-id">Albums:</label>
      <select id="create-album-id" name="album_id">
      </select>
      <button data-action="create">Create</button>
    </form>
        `;
    return html;
  }

  create() {
    const form = this.dialog.querySelector("form");
    this.track = new Track({
      title: form.title.value,
      duartion: form.duration.value,
    });

    form.reset();
    controller.createTrack(this.track);
  }
}
