import ItemRenderer from "./itemrenderer.js";

export default class ArtistRenderer extends ItemRenderer {
  render(artist) {
    const html =
      /*html*/
      `
      <div class="grid-item">
      <h2>${artist.name}</h2>
      <p>Career start: ${artist.career_start}</p>
      </div>
    `;
    return html;
  }
}
