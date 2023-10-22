import Dialog from "../dialog.js";
import Track from "../../model/track.js";
import * as controller from "../../app.js";

export default class TrackDeleteDialog extends Dialog {
  renderHTML() {
    const html =
      /*html*/
      `
        <h1>Delete track?</h1>
        <form action="" method="dialog" id="delete-track-form">
        <p>Are you sure you want to delete?</p>
        <button type="button" data-action="cancel">Cancel</button>
        <button type="button" data-action="delete">Delete</button>
        </form>
        `;
    return html;
  }
  setTrack(trackId, trackTitle, trackDuration, albumId, artistId) {
    this.trackId = trackId;
    this.trackTitle = trackTitle;
    this.trackDuration = trackDuration;
    this.albumId = albumId;
    this.artistId = artistId;
  }

  delete() {
    const track = new Track({
      id: this.trackId,
      title: this.trackTitle,
      duration: this.trackDuration,
      album_id: this.albumId,
      artist_id: this.artistId,
    });

    this.dialog.close();
    controller.deleteTrack(track);
  }
}
