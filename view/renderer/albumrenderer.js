import ItemRenderer from "./itemrenderer.js";

export default class AlbumRenderer extends ItemRenderer {
  render(album) {
    const releaseDate = new Date(album.release_date);
    const formattedDate = releaseDate.toLocaleDateString("da-DK", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });

    const html = /*html*/ `
  
      <div class="grid-item">
        <h2>${album.title}</h2>
        <p>Release date: ${formattedDate}</p>
<button class="album-update-button" data-action="update">Update</button>
<button class="album-delete-button" data-album-id="${album.id}">🛒</button>
      </div>
    `;
    return html;
  }
}
