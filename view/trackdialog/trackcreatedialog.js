import Dialog from "../dialog.js";
import Track from "../../model/track.js";
import * as controller from "../../app.js";

export default class TrackCreateDialog extends Dialog {
  renderHTML() {
    const html =
      /*html*/
      ` <h1>Create track</h1>
    <form action="" method="dialog" id="create-track-form">
      <label for="create-title">Title:</label>
      <input type="text" id="create-title" name="title" placeholder="Type the title of the track here ...">
      <label for="create-duration">Duration:</label>
      <input type="text" id="create-duration" name="duration" placeholder="Type the duration of the track here ...">
      <button data-action="create">Create</button>
    </form>
        `;
    return html;
  }

  create() {
    const form = this.dialog.querySelector("form");
    this.track = new Track({
      title: form.title.value,
      duartion: form.duration.value,
    });

    form.reset();
    controller.createTrack(this.track);
  }
}
