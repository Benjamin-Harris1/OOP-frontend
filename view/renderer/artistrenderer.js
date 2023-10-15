import ItemRenderer from "./itemrenderer.js";
import * as controller from "../../app.js";

export default class ArtistRenderer extends ItemRenderer {
  render(artist) {
    const html = /*HTML*/ ` 
      <div class="grid-item">
        <h2>${artist.name}</h2>
        <p>Career start: ${artist.career_start}</p>
        <button class="artist-update-button" data-action="update">Update</button>
        <button class="artist-delete-button" data-artist-id="${artist.id}">🛒</button>
      </div>
    `;

    const tempContainer = document.createElement("div");
    tempContainer.innerHTML = html;

    const deleteButton = tempContainer.querySelector(".artist-delete-button");

    deleteButton.addEventListener("click", () => {
      console.log("click");
      if (confirm("Are you sure you want to delete this artist?")) {
        // Delete the artist when the user confirms
        controller.deleteArtist(artist);
      }
    });

    return tempContainer.innerHTML;
  }
}
