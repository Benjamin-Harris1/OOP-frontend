import Track from "../../model/track.js";
import * as controller from "../../../app.js";
import Dialog from "../dialog.js";
import * as REST from "../../rest.js";

export default class TrackUpdateDialog extends Dialog {
  async populateAlbumsDropdown() {
    const form = this.dialog.querySelector("form");
    const albumSelect = form.querySelector("#update-album-id");
    const artistSelect = form.querySelector("#update-artist-id");

    // Fetch albums from backend
    const albums = await REST.readAlbumsTracks();

    // Clear existing options
    albumSelect.innerHTML = "";

    // Populate the select with albums
    albums.forEach((album) => {
      const option = document.createElement("option");
      option.value = album.album_id;
      option.textContent = album.album_title;
      albumSelect.appendChild(option);
    });

    const selectedAlbumId = albums.find((album) => album.album_id == this.trackId);
    albumSelect.value = selectedAlbumId.album_id;

    const artists = await REST.readAlbumsArtists();

    const filteredArtists = artists.filter((artist) => artist.artist_id == selectedAlbumId.album_id);

    artistSelect.innerHTML = "";

    // Populate the select with artists based on album id
    filteredArtists.forEach((artist) => {
      const option = document.createElement("option");
      option.value = artist.artist_id;
      option.textContent = artist.artist_name;
      artistSelect.appendChild(option);
    });
  }

  async populateArtistsByAlbumDropdown() {
    const form = this.dialog.querySelector("form");
    const albumSelect = form.querySelector("#update-album-id");
    const artistSelect = form.querySelector("#update-artist-id");

    // Get the selected album id
    const selectedAlbumId = albumSelect.value;
    console.log(selectedAlbumId);

    // Fetch artists from backend
    const artists = await REST.readAlbumsArtists(selectedAlbumId);
    console.log(artists);

    // Filter artists based on the selected album ID
    const filteredArtists = artists.filter((artist) => artist.album_id == selectedAlbumId);

    artistSelect.innerHTML = "";

    // Populate the select with artists based on album id
    filteredArtists.forEach((artist) => {
      const option = document.createElement("option");
      option.value = artist.artist_id;
      option.textContent = artist.artist_name;
      artistSelect.appendChild(option);
    });
  }

  renderHTML() {
    const html =
      /*html*/
      `
           <button class="close-button" id="closeDialog">X</button>
        <h1>Update track</h1>
        <form action="" method="dialog" id="update-track-form">
        <label for="update-title">Title</label>
        <input type="text" id="update-title" name="title" placeholder="Type the title of the track...">
        <label for="update-duration">Duration</label>
        <input type="text" id="update-duration" name="duration" placeholder="Type the duration e.g 4:11...">
        <label for="update-album-id">Album:</label>
        <select id="update-album-id" name="album_id">
        <select>
        <label for="update-artist-id">Artist:</label>
        <select id="update-artist-id" name="artist_id">
        <select>
        <button data-action="update">Update</button>
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
    const form = this.dialog.querySelector("form");
    form.title.value = this.trackTitle;
    form.duration.value = this.trackDuration;
    form.album_id.value = this.albumId;
    form.artist_id.value = this.artistId;
  }

  update() {
    const form = this.dialog.querySelector("form");
    const track = new Track({
      id: this.trackId,
      artist_id: this.artistId,
      album_id: this.albumId,
      title: form.title.value,
      duration: form.duration.value,
    });

    console.log("Update", track);
    controller.updateTrack(track);
  }
}
