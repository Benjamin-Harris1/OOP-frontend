import ItemRenderer from "./itemrenderer.js";
import * as controller from "../../app.js";
import ArtistDeleteDialog from "../artistdialog/artistdeletedialog.js";

export default class ArtistRenderer extends ItemRenderer {
  render(artist) {
    const html = /*HTML*/ ` 
      <div class="grid-item">
        <h2>${artist.name}</h2>
        <p>Career start: ${artist.career_start}</p>
        <button class="artist-update-button" data-action="update">Update</button>
        <button class="artist-delete-button" data-action="delete">🛒</button>
      </div>
    `;
    return html;
  }
}
