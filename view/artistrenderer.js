import ItemRenderer from "./itemrenderer";

export default class ArtistRenderer extends ItemRenderer {
  render(artist) {
    const html =
      /*html*/
      `
      <h2>${artist.name}</h2>
      <p>Career start: ${artist.career_start.toLocaleString("da", {})}</p>
    `;
    return html;
  }
}
