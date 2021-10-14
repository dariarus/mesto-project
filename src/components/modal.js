export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      document.querySelectorAll('.popup_opened').forEach(() => {
        this._popupSelector.classList.remove('popup_opened');
      });
    }
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
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

  setEventListeners() { // слушатель на кнопке закрытия каждого их попапов и закрытие по клику на оверлэй
    this._popupSelector.querySelector('.popup__close-icon').addEventListener('click', () => {
      this.close(this._popupSelector);
    });
    this._popupSelector.addEventListener('mousedown', (evt) => {
      this.close(evt.target);
      evt.stopPropagation();
    });
  };
}


class PopupWithImage extends Popup {
  constructor(data, popupSelector) {
    super(popupSelector);
    this._link = data.link;
    this._name = data.name;
  }

  open() {
    super.open();
    this._popupSelector.querySelector('.popup__opened-image').src = this._link;
    this._popupSelector.querySelector('.popup__image-signature').textContent = this._name;
  }
}


export function init() {
  document.querySelectorAll('.popup').forEach(popupItem => {
    const popup = new Popup(popupItem);
    popup.setEventListeners();
  });


  //addListenerToOverlay();
}

// обработчик событий клавиши Esc для закрытия попапа редактирования профиля
/*function handleESC(evt) {
  if (evt.key === 'Escape') {
    document.querySelectorAll('.popup_opened').forEach(popupItem => {
      const popup = new Popup(popupItem);
      popup.close();
      // closePopup(popupItem);
    });
  }
}*/

// обработчик события клика мыши на оверлей для закрытия попапов
function addListenerToOverlay() {
  const popupList = document.querySelectorAll('.popup');
  popupList.forEach(popupListItem => {
    popupListItem.addEventListener('mousedown', (evt) => {
      // const popup = new Popup(evt.target);
      // popup.close();
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


