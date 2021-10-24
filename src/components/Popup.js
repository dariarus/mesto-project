export default class Popup {
  constructor(popupSelector) {
    this.popupElement = document.querySelector(popupSelector);
    this._handleEscCloseBound = this._handleEscClose.bind(this)

    this._setDefaultPopupEventListeners();
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
        this.close();
    }
  }

  open() {
    this.popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscCloseBound);
  }

  close() {
    this.popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscCloseBound);
  }

  _setDefaultPopupEventListeners() { // слушатель на кнопке закрытия каждого из попапов и закрытие по клику на оверлэй
    this.popupElement.querySelector('.popup__close-icon').addEventListener('click', () => {
      this.close(this.popupElement);
    });
    this.popupElement.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
    });
  }
}
