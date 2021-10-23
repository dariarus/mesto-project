import {toggleButtonState} from "./utils.js";

export default class FormValidator {
  constructor(options, validatingFormElement) {
    this._options = options;
    this._validatingFormElement = validatingFormElement;
    this._inputSelector = this._validatingFormElement.querySelector(this._options.inputSelector);
    this._submitButtonSelector = this._validatingFormElement.querySelector(this._options.submitButtonSelector);
    this._inputErrorClass = this._validatingFormElement.querySelector(this._options.inputErrorClass);
    this._errorClass = this._validatingFormElement.querySelector(this._options.errorClass);
    this._inactiveButtonClass = this._validatingFormElement.querySelector(this._options.inactiveButtonClass);
    this._inputList = Array.from(this._validatingFormElement.querySelectorAll(this._options.inputSelector));
    this._buttonElement = this._validatingFormElement.querySelector(this._options.submitButtonSelector);
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._validatingFormElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._validatingFormElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this.inputErrorClass);
    errorElement.classList.remove(this.errorClass);
    errorElement.textContent = '';
  }

  hideInitialInputError() {
    this._inputList.forEach((inputElement) => {
      // очищать ошибки только в том случае, если польз-ль это поле так и оставил незаполненным
      if (inputElement.value === '' || (inputElement.value !== '' && inputElement.validity.valid)) {
        this._hideInputError(inputElement)
      }
    });
  }

  _validateInput(inputElement) {
    if (!inputElement.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      // Если проходит, скроем
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    // проходим по этому массиву методом some
    return this._inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true. Обход массива прекратится, и вся фунцкция hasInvalidInput вернёт true
      return !inputElement.validity.valid;
    })
  }

  _validateAndToggleButtonState() {
    const buttonIsActive = !this._hasInvalidInput();
    toggleButtonState(this._buttonElement, this._options.inactiveButtonClass, buttonIsActive)
  };

  toggleButtonInPopup() {
    this._validateAndToggleButtonState();
  }

  _setEventListeners() {
    // (6.) Вызовем validateAndToggleButtonState, чтобы кнопка была неактивна при первой загрузке формы, до начала к-либо ввода данных
    this._validateAndToggleButtonState();
    // Обойдём все элементы полученной коллекции
    this._inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем validateInput, передав ей форму и проверяемый элемент
        this._validateInput(inputElement);
        // (6.)
        this._validateAndToggleButtonState();
      });
    });
  }

  enableValidation() {
    this._validatingFormElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
