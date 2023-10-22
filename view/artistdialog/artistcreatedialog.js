import Dialog from "../dialog.js";
import Artist from "../../model/artist.js";
import * as controller from "../../app.js";

export default class ArtistCreateDialog extends Dialog {
  renderHTML() {
    const html = /*html*/ `
   <button class="close-button" id="closeDialog">X</button>
    <h1>Create artist</h1>
    <form action="" method="dialog" id="create-artist-form">
      <label for="create-name">Name:</label>
      <input type="text" id="create-name" name="name" placeholder="Type the name of the artist here ...">
      <label for="create-career_start">Career Start:</label>
      <input type="text" id="create-career_start" name="career_start" placeholder="Type the date of the artist's career start ...">
      <button data-action="create">Create</button>
    </form>
  `;
    return html;
  }

  create() {
    const form = this.dialog.querySelector("form");
    this.artist = new Artist({
      name: form.name.value,
      career_start: form.career_start.value,
    });

    form.reset();

    controller.createArtist(this.artist);
  }
}
