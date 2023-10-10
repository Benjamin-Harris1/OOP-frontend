import ItemRenderer from "./itemrenderer.js";

export default class AlbumRenderer extends ItemRenderer {
  render(album) {
    const releaseDate = new Date(album.release_date);
    const formattedDate = `${releaseDate.getDate().toString().padStart(2, "0")}-${(releaseDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${releaseDate.getFullYear()}`;
    const html =
      /*html*/
      `
      <div class="grid-item">
      <h2>${album.title}</h2>
      <p>Release date: ${formattedDate}</p>
      </div>
    `;
    return html;
  }
}
