import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handlerSubmitForm) {
    super(popupSelector);
    this._handlerSubmitForm = handlerSubmitForm;
    this.formElement = this.popupElement.querySelector('.popup__form');
    this._setDefaultEventListeners();
  }

  open() {
    super.open();
    this.formElement.dispatchEvent(new Event('opened')); // превращаем функцию open в событие
  }

  _getInputValues() {
    // достаём все элементы полей
    this._inputList = this.popupElement.querySelectorAll('.popup__item');
    // создаём пустой объект
    this._formValues = {};
    // добавляем в этот объект значения всех полей
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value; // создание ключа input.name внутри объекта со значением input.value
    });
    //  this._formValues['likes'] = [];
    // возвращаем объект значений
    return this._formValues;
  }

  setInputValue(inputName, inputValue) {
    this._inputList = this.popupElement.querySelectorAll('.popup__item');
    this._inputList.forEach(input => {
      if (input.name === inputName) {
        input.value = inputValue;
      }
    })
  }

  close(currentPopup) {
    super.close(currentPopup);
    this.formElement.reset();
  }

  _setDefaultEventListeners() {
    // const buttonSaveCard = this._popupElement.querySelector('.popup__save-button');
    this.formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handlerSubmitForm(this);
      this.close(this.popupElement);
    });
    this.formElement.addEventListener('mousedown', (evt) => {
      evt.stopPropagation();
    })
  }

}
