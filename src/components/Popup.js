export default class Popup {
  constructor(popupSelector) {
    this.popupElement = document.querySelector(popupSelector);
    this._setDefaultPopupEventListeners();
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
        this.popupElement.classList.remove('popup_opened');//});
    }
  }

  open() {
    this.popupElement.classList.add('popup_opened');
    // добавление обработчика на документ при нажатии кнопки ESC
    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
  }

  close(currentPopup) {
    currentPopup.classList.remove('popup_opened');
    // удаление обрабтчика с документа, когда не нужно отслеживать кнопку ESC, т.к. попап закрыт
    document.removeEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
  }

  _setDefaultPopupEventListeners() { // слушатель на кнопке закрытия каждого из попапов и закрытие по клику на оверлэй
    this.popupElement.querySelector('.popup__close-icon').addEventListener('click', () => {
      this.close(this.popupElement);
    });
    this.popupElement.addEventListener('mousedown', (evt) => {
      evt.stopPropagation();
      this.close(evt.target);
    });
  };
}
