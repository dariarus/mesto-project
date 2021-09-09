import {init as initModal} from './src/components/modal.js'
import {init as initCards} from "./src/components/card.js";
import {enableValidation} from "./src/components/validate.js";

/* 1. Работа модальных окон*/

// добавление дефолтных карточек при загрузке страницы
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
