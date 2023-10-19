import ItemRenderer from "./itemrenderer.js";
import * as controller from "../../app.js";
import ArtistDeleteDialog from "../artistdialog/artistdeletedialog.js";

export default class ArtistRenderer extends ItemRenderer {
  render(artist) {
    const html = /*HTML*/ ` 
      <div class="grid-item">
        <h2>${artist.name}</h2>
        <p>Career start: ${artist.career_start}</p>
       <button class="update-artist-button artist-update-button" data-action="update" data-artist-id="${artist.id}">Update</button>
        <button class="artist-delete-button" data-action="delete">🛒</button>
      </div>
    `;
    return html;
  }
}
