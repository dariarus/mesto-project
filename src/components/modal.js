export class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._formElement = this._popupElement.querySelector('.popup__form');
    this._setDefaultPopupEventListeners();
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      //document.querySelectorAll('.popup_opened').forEach(() => {
        this._popupElement.classList.remove('popup_opened');
      //});
    }
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    // добавление обработчика на документ при нажатии кнопки ESC
    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
    this._formElement.dispatchEvent(new Event('opened')); // превращаем функцию open в событие
  }

  close(currentPopup) {
    currentPopup.classList.remove('popup_opened');
    // удаление обрабтчика с документа, когда не нужно отслеживать кнопку ESC, т.к. попап закрыт
    document.removeEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
  }

  _setDefaultPopupEventListeners() { // слушатель на кнопке закрытия каждого из попапов и закрытие по клику на оверлэй
    console.log(this._popupElement);
    this._popupElement.querySelector('.popup__close-icon').addEventListener('click', () => {
      this.close(this._popupElement);
    });
    this._popupElement.addEventListener('mousedown', (evt) => {
      evt.stopPropagation();
      this.close(evt.target);
    });
  };
}


export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(data) {
    super.open();
    this._popupElement.querySelector('.popup__opened-image').src = data.link;
    this._popupElement.querySelector('.popup__image-signature').textContent = data.name;
  }
}


export class PopupWithForm extends Popup {
  constructor(popupSelector, handlerSubmitForm) {
    super(popupSelector);
    this._handlerSubmitForm = handlerSubmitForm;
    this._setDefaultEventListeners();
  }

  _getInputValues() {
    // достаём все элементы полей
    this._inputList = this._popupElement.querySelectorAll('.popup__item');
    // создаём пустой объект
    this._formValues = {};
    // добавляем в этот объект значения всех полей
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value; // создание ключа input.name внутри объекта со значением input.value
    });
    //  this._formValues['likes'] = [];
    console.log(this._formValues);
    // возвращаем объект значений
    return this._formValues;
  }

  setInputValue(inputName, inputValue) {
    this._inputList = this._popupElement.querySelectorAll('.popup__item');
    this._inputList.forEach(input => {
      if (input.name === inputName) {
        input.value = inputValue;
      }
    })
  }

  close(currentPopup) {
    super.close(currentPopup);
    this._formElement.reset();
  }

  _setDefaultEventListeners() {
   // const buttonSaveCard = this._popupElement.querySelector('.popup__save-button');
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handlerSubmitForm(this);
      this.close(this._popupElement);
    });
    this._formElement.addEventListener('mousedown', (evt) => {
      evt.stopPropagation();
    })
  }

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


