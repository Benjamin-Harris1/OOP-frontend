import Album from "../../model/album.js";
import * as controller from "../../../app.js";
import Dialog from "../dialog.js";
import * as REST from "../../rest.js";

export default class AlbumUpdateDialog extends Dialog {
  renderHTML() {
    const html =
      /*html*/
      `
      <h1>Update album</h1>
      <form action="" method="dialog" id="update-album-form">
      <label for="update-title">Title</label>
      <input type="text" id="update-title" name="title" placeholder="Type the title of the album...">
      <label for="update-release_date">Release date:</label>
      <input type="text" id="update-release_date" name="release_date" placeholder="Type the date of release">
      <button data-action="update">Update</button>
      </form>
    `;

    return html;
  }

  async getArtistId() {
    const artists = await REST.readAlbumsArtists();
    console.log(artists);
  }

  setAlbum(albumId, albumTitle, releaseDate, artistId) {
    this.albumId = albumId;
    this.albumTitle = albumTitle;
    this.releaseDate = releaseDate;
    this.artistId = artists.artist_id;
    const form = this.dialog.querySelector("form");
    form.title.value = this.albumTitle;
    form.release_date.value = this.releaseDate;
  }

  update() {
    const form = this.dialog.querySelector("form");
    const album = new Album({
      id: this.albumId,
      artist_id: this.artistId,
      title: form.title.value,
      release_date: form.release_date.value,
    });

    console.log("Update", album);
    controller.updateAlbum(album);
  }
}
