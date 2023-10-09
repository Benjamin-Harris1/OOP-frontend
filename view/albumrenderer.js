import ItemRenderer from "./itemrenderer";

export default class AlbumRenderer extends ItemRenderer {
  render(album) {
    const html =
      /*html*/
      `
      <h2>${album.title}</h2>
      <p>Release date: ${album.release_date.toLocaleString("da", { month: "short", day: "numeric", year: "numeric" })}</p>
    `;
    return html;
  }
}
