import ItemRenderer from "./itemrenderer.js";

export default class ListRenderer {
  constructor(list, container, ItemRenderer) {
    this.ItemRenderer = ItemRenderer;
    if (container instanceof Element) {
      this.container = container;
    } else if (typeof container === "string") {
      this.container = document.querySelector(container);
    } else {
      console.error("Container is not of the required type");
      console.error(container);
    }
    this.setList(list);
  }

  setList(list) {
    // Build a list of renderers with items in them
    this.list = list.map((item) => new ItemRenderer(item));
  }

  clear() {
    this.container.innerHTML = "";
  }
  render() {
    this.clear();
  }
}
