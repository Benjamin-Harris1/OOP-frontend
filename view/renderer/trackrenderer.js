import ItemRenderer from "./itemrenderer.js";

export default class TrackRenderer extends ItemRenderer {
  render(track) {
    const html =
      /*html*/
      `
      <div class="grid-item">
      <h2>${track.title}</h2>
      <p>Duration: ${track.duration}</p>
      <button class="track-update-button" data-action="update">Update</button>
      <button class="track-delete-button" data-action="delete">🛒</button>
      </div>
    `;
    return html;
  }
}
