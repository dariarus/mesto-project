import Section from "./Section";
import {Card} from './card.js';
import {hideInputErrorInPopup, toggleButtonInPopup} from "./validate";
import {api} from "./api";
import {userInfo} from "../pages";

export class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    this._formSelector = this._popupSelector.querySelector('.popup__form');
    this._setDefaultEventListeners();
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

  _setDefaultEventListeners() { // слушатель на кнопке закрытия каждого их попапов и закрытие по клику на оверлэй
    console.log(this._popupSelector);
    this._popupSelector.querySelector('.popup__close-icon').addEventListener('click', () => {
      this.close(this._popupSelector);
    });
    this._popupSelector.addEventListener('mousedown', (evt) => {
      evt.stopPropagation();
      this.close(evt.target);
    });
  };
}


export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  static generateElement(popupSelector) {
    const result = new PopupWithImage(popupSelector);
    result.setDefaultEventListeners();
  }

  open(data) {
    super.open();
    this._popupSelector.querySelector('.popup__opened-image').src = data.link;
    this._popupSelector.querySelector('.popup__image-signature').textContent = data.name;
  }
}


export class PopupWithForm extends Popup {
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

  close(currentPopup) {
    super.close(currentPopup);
    this._formSelector.reset();
  }

  _setDefaultEventListeners() {
    super._setDefaultEventListeners();
    const buttonSaveCard = this._popupSelector.querySelector('.popup__save-button');
    const formAddCardElement = document.querySelector('[name="add card form"]');
    formAddCardElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handlerSubmitForm(evt);
      toggleButtonInPopup(this._popupSelector, buttonSaveCard, '.popup__form', '.popup__item', 'popup__save-button_disabled')
      hideInputErrorInPopup(this._popupSelector, '.popup__form', '.popup__item', 'popup__item_type_error', 'popup__input-error_active');
      this.close(this._popupSelector);

      this._formSelector.addEventListener('mousedown', (evt) => {
        evt.stopPropagation();
      })
    });
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


