import Dialog from "../dialog.js";
import Artist from "../../model/artist.js";
import * as controller from "../../app.js";

export default class ArtistDeleteDialog extends Dialog {
  renderHTML() {
    const html =
      /*html*/
      `
            <h1>Delete artist?</h1>
            <form action="" method="dialog" id="delete-artist-form">
            <p>Are you sure you want to delete this artist?</p>
            <button type="button" data-action="cancel">Cancel</button>
            <button type="button" data-action="delete">Delete</button>
            </form>
    `;
    return html;
  }
  setArtist(artistId, artistName, careerStart) {
    this.artistId = artistId;
    this.artistName = artistName;
    this.careerStart = careerStart;
  }

  delete() {
    const artist = new Artist({
      id: this.artistId,
      name: this.artistName,
      career_start: this.careerStart,
    });
    this.dialog.close();
    controller.deleteArtist(artist);
  }
}
