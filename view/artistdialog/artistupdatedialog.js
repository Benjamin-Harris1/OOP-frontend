import Dialog from "../../dialog.js";
import Artist from "../../model/artist.js";
import * as controller from "../../../app.js";

export default class ArtistUpdateDialog extends Dialog {
  renderHTML() {
    const html =
      /*html*/
      `
            <h1>Update artist</h1>
         <form action="" method="dialog" id="update-artist-form">
      <label for="update-name">Name:</label>
      <input type="text" id="update-name" name="name" placeholder="Type the name of the artist here ...">
      <label for="update-career_start">Career Start:</label>
      <input type="text" id="update-career_start" name="career_start" placeholder="Type the date of the artist's career start ...">
      <button data-action="update">Update</button>
      </form>
        `;

    return html;
  }

  setArtist(artist) {
    this.artist = artist;
    const form = this.dialog.querySelector("form");
    form.name.value = artist.name;
    form.career_start.value = artist.career_start;
  }

  update() {
    const form = this.dialog.querySelector("form");

    this.artist.name = form.name.value;
    this.artist.career_start = form.career_start.value;

    console.log("Update", this.artist);
    controller.updateArtist(this.artist);
  }
}
