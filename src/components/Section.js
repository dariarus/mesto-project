export default class Section {
    constructor({data, renderer}, sectionSelector) {
      this._data = data;
      this._renderer = renderer;
      this._cardContainer = sectionSelector;
    }
  
    //вставляем элементы в контейнер
    setItem(element) {
      this._cardContainer.append(element);
    }
  
    //рендерит элементы
    renderItems() {
      this._data.forEach(item => {
        this._renderer(item);
      });
    }
  }
  