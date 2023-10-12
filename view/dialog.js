export default class Dialog {
  constructor(id) {
    this.dialog = document.createElement("dialog");
    this.dialog.id = id;
    document.querySelector("initApp").insertAdjacentElement("afterend", this.dialog);
  }

  close() {
    this.dialog.close();
  }

  show() {
    this.dialog.showModal();
  }

  render() {
    const html = this.renderHTML()
  }
}
