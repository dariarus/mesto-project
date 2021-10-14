import Section from "./Section";
import {Card} from './card.js';
import {hideInputErrorInPopup, toggleButtonInPopup} from "./validate";

export class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
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
    console.log(this._popupSelector);
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

class PopupWithForm extends Popup {
  constructor(popupSelector, handlerSubmitForm) {
    super(popupSelector);
    this._handlerSubmitForm = handlerSubmitForm;
  }

  _getInputValues() {


    // достаём все элементы полей
    this._inputList = this._popupSelector.querySelectorAll('.popup__item');
    // создаём пустой объект
    this._formValues = {};
    // добавляем в этот объект значения всех полей
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value; // создание ключа input.name внутри объекта со значением input.value
    });
    this._formValues['likes'] = [];
    console.log(this._formValues);
    // возвращаем объект значений
    return this._formValues;
  }

  // close() {
  //   super.close();
  //
  // }

  setEventListeners() {
    super.setEventListeners();
    const buttonSaveCard = this._popupSelector.querySelector('.popup__save-button');
    const formAddCardElement = document.querySelector('[name="add card form"]');
    formAddCardElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handlerSubmitForm(evt);
      toggleButtonInPopup(this._popupSelector, buttonSaveCard, '.popup__form', '.popup__item', 'popup__save-button_disabled')
      hideInputErrorInPopup(this._popupSelector, '.popup__form', '.popup__item', 'popup__item_type_error', 'popup__input-error_active');
      super.close(this._popupSelector);
    });
  }

}

function handlerSubmitFormAddCard(evt) {
  //отмена стандартной отправки формы
  evt.preventDefault();

  const buttonSaveCard = this._popupSelector.querySelector('.popup__save-button');
  const cardContainer = document.querySelector('.gallery');
  buttonSaveCard.textContent = "Сохранение...";
  const newCard = new Card(this._getInputValues(), '#card-template');

  document.querySelector('.gallery').prepend(newCard.createCard());
}

export function init() {
  const buttonAddCard = document.querySelector('.profile__add-button');
  buttonAddCard.addEventListener('click', () => {
    const popupAddCard = new PopupWithForm('.popup_type_add-card', handlerSubmitFormAddCard);
    popupAddCard.open();
    popupAddCard.setEventListeners();
  });

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


