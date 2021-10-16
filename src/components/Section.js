export default class Section {
  constructor({data, renderer}, sectionSelector) {
    this._data = data;
    this._renderer = renderer;
    this._container = document.querySelector(sectionSelector);
  }

  //вставляем элементы в контейнер
  setItem(element) {
    this._container.prepend(element);
  }

  clear() {
    this._container.innerHTML = '';
  }

  //рендерит элементы
  renderItems() {
    this.clear();
    for (let itemIndex = this._data.length - 1; itemIndex >= 0; itemIndex--) {
      this._renderer(this._data[itemIndex]);
    }
  }

  renderItem(dataItem) {
    this._renderer(dataItem);
  }
}
