export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._formElement = this._popupElement.querySelector('.popup__form');
    this._handleEscCloseBound = this._handleEscClose.bind(this)

    this._setDefaultPopupEventListeners();
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
        this.close();
    }
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscCloseBound);
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscCloseBound);
  }

  _setDefaultPopupEventListeners() { // слушатель на кнопке закрытия каждого из попапов и закрытие по клику на оверлэй
    this._popupElement.querySelector('.popup__close-icon').addEventListener('click', () => {
      this.close();
    });
    this._popupElement.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
    });
  }
}


// обработчик события клика мыши на оверлей для закрытия попапов
function addListenerToOverlay() {
  const popupList = document.querySelectorAll('.popup');
  popupList.forEach(popupListItem => {
    popupListItem.addEventListener('mousedown', (evt) => {
      closePopup(evt.target);
      // отмена всплытия события до .popup, чтобы можно было воспользоваться формой в .popup__container
      evt.stopPropagation();
    });
  });
}

// функция откртытия попапа общая
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  // добавление обработчика на документ при нажатии кнопки ESC
  document.addEventListener('keydown', handleESC);
}

// функция закрытия попапа общая
export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  // удаление обрабтчика с документа, когда не нужно отслеживать кнопку ESC, т.к. попап закрыт
  document.removeEventListener('keydown', handleESC);
}


