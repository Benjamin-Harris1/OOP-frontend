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
        <h2 data-album-title="${album.title}">${album.title}</h2>
        <p data-release-date="${album.release_date}">Release date: ${formattedDate}</p>
        <button class="update-album-button" data-action="update" data-album-id="${album.id}" data-artist-id="${album.artist_id}">Update</button>
        <button class="album-delete-button" data-album-id="${album.id}">🗑</button>
      </div>
    `;
    return html;
  }
}
