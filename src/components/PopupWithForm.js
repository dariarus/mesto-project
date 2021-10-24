import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handlerSubmitForm) {
    super(popupSelector);
    this._handlerSubmitForm = handlerSubmitForm;
    this._setDefaultEventListeners();
  }

  open() {
    super.open();
    this._formElement.dispatchEvent(new Event('opened')); // превращаем функцию open в событие
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

  close() {
    super.close();
    this._formElement.reset();
  }

  _setDefaultEventListeners() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handlerSubmitForm(this);
    });
  }
}
