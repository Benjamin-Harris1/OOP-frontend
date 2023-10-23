import Album from "../../model/album.js";
import * as controller from "../../app.js";
import Dialog from "../dialog.js";
import * as REST from "../../rest.js";

export default class AlbumUpdateDialog extends Dialog {

  async populateArtistsDropdown() {
    const form = this.dialog.querySelector("form");
    const artistSelect = form.querySelector("#create-artist-id");

    // FETCH ARTISTS FROM BACKEND
    const artists = await REST.readAlbumsArtists();

    // CLEAR HTML
    artistSelect.innerHTML = "";

    // POPULATE THE SELECT WITH RETRIEVED ARRAY
    artists.forEach((artist) => {
      const option = document.createElement("option");
      option.value = artist.artist_id;
      option.textContent = artist.artist_name;
      artistSelect.appendChild(option);
    });

    // FLAW IN THE LOGIC HERE - I WANT TO LINK THE ARTIST NOT BASED ON IF THE ID IS EQUAL, BUT SOMETHING ELSE
    const selectedArtistId = artists.find((artist) => artist.artist_id == this.albumId);
    artistSelect.value = selectedArtistId.artist_id;
  }

  renderHTML() {
    const html =
      /*html*/
      `
        <button class="close-button" id="closeDialog">X</button>
      <h1>Update album</h1>
      <form action="" method="dialog" id="update-album-form">
      <label for="update-title">Title</label>
      <input type="text" id="update-title" name="title" placeholder="Type the title of the album...">
      <label for="update-release_date">Release date:</label>
      <input type="text" id="update-release_date" name="release_date" placeholder="Type the date of release">
      <label for="create-artist-id">Artist:</label>
      <select id="create-artist-id" name="artist_id">
        <select>
      <button data-action="update">Update</button>
      </form>
    `;

    return html;
  }

  setAlbum(albumId, albumTitle, releaseDate, artistId) {
    this.albumId = albumId;
    this.albumTitle = albumTitle;
    this.releaseDate = releaseDate;
    this.artistId = artistId;
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
