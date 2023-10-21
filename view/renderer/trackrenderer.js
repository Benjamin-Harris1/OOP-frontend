import ItemRenderer from "./itemrenderer.js";

export default class TrackRenderer extends ItemRenderer {
  render(track) {
    const html =
      /*html*/
      `
      <div class="grid-item">
      <h2 data-track-title="${track.title}">${track.title}</h2>
      <p data-track-duration="${track.duration}">Duration: ${track.duration}</p>
      <button class="track-update-button" data-action="update" data-track-id="${track.id}" data-album-id="${track.album_id}" data-artist-id="${track.artist_id}">Update</button>
      <button class="track-delete-button" data-action="delete" data-track-id="${track.id}" data-album-id="${track.album_id}" data-artist-id="${track.artist_id}">🛒</button>
      </div>
    `;
    return html;
  }
}
