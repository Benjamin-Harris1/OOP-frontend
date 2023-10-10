import ItemRenderer from "./itemrenderer.js";

export default class TrackRenderer extends ItemRenderer {
  render(track) {
    const html =
      /*html*/
      `
      <h2>${track.title}</h2>
      <p>Duration: ${track.duration}</p>
    `;
    return html;
  }
}
