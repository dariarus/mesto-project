export default class Card {
  constructor(data, cardSelector, handlers) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._handlers = handlers;

    this._cardElement = this._getElement();

    this._cardImageElement = this._cardElement.querySelector('.gallery-item__photo');
    this._likeElement = this._cardElement.querySelector('.gallery-item__like');
    this._deleteElement = this._cardElement.querySelector('.gallery-item__delete-card');
  }

  _getElement() {
    return document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.gallery-item')
      .cloneNode(true);
  }

  _addCardInfo() {
    this._cardElement.querySelector('.gallery-item__signature').textContent = this._data.name;
    this._cardImageElement.src = this._data.link;
    this._cardImageElement.alt = this._data.name;
    this.refreshLikesCount();
  }

  setLikeColor() {
    this._likeElement.classList.add('gallery-item__like_active');
  }

  removeLikeColor() {
    this._likeElement.classList.remove('gallery-item__like_active');
  }

  refreshLikesCount() {
    const countLikeElement = this._cardElement.querySelector('.gallery-item__like-count');
    countLikeElement.textContent = this._data.likes.length;
  }

  removeDeleteElement() {
    this._deleteElement.remove();
  }

  _setEventListeners() {
    if (this._handlers && this._handlers.deleteCard) {
      this._deleteElement.addEventListener('click', this._handlers.deleteCard);
    }
    if (this._handlers && this._handlers.handleCardClick) {
      this._cardImageElement.addEventListener('click', this._handlers.handleCardClick);
    }
    if (this._handlers && this._handlers.setLike) {
      this._likeElement.addEventListener('click', (evt) => {
        this._handlers.setLike(evt, this);
      });
    }
  }

  generateElement() {
    this._addCardInfo();
    this._setEventListeners();

    return this._cardElement;
  }
}
