import Dialog from "../dialog.js";
import Album from "../../model/album.js";
import * as controller from "../../app.js";

export default class AlbumDeleteDialog extends Dialog {
  renderHTML() {
    const html =
      /*html*/
      `
        <h1>Delete album?</h1>
        <form action="" method="dialog" id="delete-album-form">
        <p>Are you sure you want to delete?</p>
        <button type="button" data-action="cancel">Cancel</button>
        <button type="button" data-action="delete">Delete</button>
        </form>
        `;
    return html;
  }

  setAlbum(albumId, albumTitle, releaseDate, artistId) {
    this.albumId = albumId;
    this.albumTitle = albumTitle;
    this.releaseDate = releaseDate;
    this.artistId = artistId;
  }

  delete() {
    const album = new Album({
      id: this.albumId,
      title: this.albumTitle,
      release_date: this.releaseDate,
      artist_id: this.artistId,
    });

    this.dialog.close();
    controller.deleteAlbum(album);
  }
}
