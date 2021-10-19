export default class Card {
  constructor(data, cardSelector, handlers) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._handlers = handlers;
  }

  _getElement() {
    return document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.gallery-item')
      .cloneNode(true);
  }

  _addCardInfo() {
    // найти поля, куда надо добавить содержимое из массива
    this._cardElement.querySelector('.gallery-item__signature').textContent = this._data.name;
    this._cardElement.querySelector('.gallery-item__photo').src = this._data.link;
    this._cardElement.querySelector('.gallery-item__photo').alt = this._data.name;
    this.refreshLikesCount();
  }

  _setLikeListener() {
    this._cardElement.querySelector('.gallery-item__like').addEventListener("click", (evt) => {
      this._handlers.setLike(evt, this);
    });
  };

  setLikeColor() {
    const cardLike = this._cardElement.querySelector('.gallery-item__like');
    cardLike.classList.add('gallery-item__like_active');
  }

  removeLikeColor() {
    const cardLike = this._cardElement.querySelector('.gallery-item__like');
    cardLike.classList.remove('gallery-item__like_active');
  }

  refreshLikesCount() {
    const countLikeElement = this._cardElement.querySelector('.gallery-item__like-count');
    countLikeElement.textContent = this._data.likes.length;
  }

  setDeleteElement() {
    const basket = document.createElement('button')
    basket.classList.add('gallery-item__delete-card');
    basket.setAttribute('aria-label', 'удалить карточку');
    basket.setAttribute('type', 'button');

    const referenceElement = this._cardElement.querySelector('.gallery-item__content-text');
    referenceElement.before(basket);

    if (this._handlers && this._handlers.deleteCard) {
      basket.addEventListener('click', this._handlers.deleteCard);
    }
  }

  _setOpenCardImageListener() {
    if (this._handlers && this._handlers.handleCardClick) {
      this._cardElement.querySelector('.gallery-item__photo').addEventListener('click', this._handlers.handleCardClick);
    }
  }

  generateElement() {
    this._cardElement = this._getElement();
    this._addCardInfo();
    this._setLikeListener();
    this._setOpenCardImageListener()

    return this._cardElement;
  }
}
