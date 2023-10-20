import Dialog from "../dialog.js";
import Artist from "../../model/artist.js";
import * as controller from "../../app.js";

export default class ArtistDeleteDialog extends Dialog {
  renderHTML() {
    const html =
      /*html*/
      `
            <h1>Delete artist?</h1>
            <p>Are you sure you want to delete?</p>
            <form action="" method="dialog" id="delete-artist-form">
            <button type="button" data-action="cancel">Cancel</button>
            <button type="button" data-action="delete">Delete</button>
            </form>
    `;
    return html;
  }
  setArtist(artist, artistName, careerStart) {
    this.artist = artist;
  }

  delete() {
    controller.deleteArtist(this.artist);
  }
}
