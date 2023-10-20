import Artist from "../../model/artist.js";
import * as controller from "../../../app.js";
import Dialog from "../dialog.js";

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

  setArtist(artistId, artistName, careerStart) {
    this.artistId = artistId;
    this.artistName = artistName;
    this.careerStart = careerStart;
    const form = this.dialog.querySelector("form");
    form.name.value = this.artistName;
    form.career_start.value = this.careerStart;
  }

  update() {
    const form = this.dialog.querySelector("form");
    const artist = new Artist({
      id: this.artistId,
      name: form.name.value,
      career_start: form.career_start.value,
    });

    console.log("Update", artist);
    controller.updateArtist(artist);
  }
}
