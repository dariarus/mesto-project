import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handlerSubmitForm) {
    super(popupSelector);
    this._handlerSubmitForm = handlerSubmitForm;
    this.formElement = this.popupElement.querySelector('.popup__form');
    this._inputList = this.popupElement.querySelectorAll('.popup__item');
    this._setDefaultEventListeners();
  }

  open() {
    super.open();
    this.formElement.dispatchEvent(new Event('opened')); // превращаем функцию open в событие
  }

  getInputValues() {
    // создаём пустой объект
    this._formValues = {};
    // добавляем в этот объект значения всех полей
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value; // создание ключа input.name внутри объекта со значением input.value
    });
    // возвращаем объект значений
    return this._formValues;
  }
  
  setInputValue(inputName, inputValue) {
    this._inputList.forEach(input => {
      if (input.name === inputName) {
        input.value = inputValue;
      }
    })
  }

  close() {
    super.close();
    this.formElement.reset();
  }

  _setDefaultEventListeners() {
    this.formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handlerSubmitForm(this);
    });
  }
}
