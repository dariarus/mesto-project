import '../pages/index.css'; //подключить в файл точки входа основной файл стилей - работает только для Webpack

import {init as initModal} from './modal.js'
import {init as initCards} from "./card.js";
import {enableValidation} from "./validate.js";

window.onload = function () {
  initModal();
  enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__item_type_error',
    errorClass: 'popup__input-error_active'
  });
  initCards();
};
