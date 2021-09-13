import '../pages/index.css'; //подключить в файл точки входа основной файл стилей - работает только для Webpack

import {validationConfig} from "./variables.js";
import {init as initModal} from './modal.js'
import {init as initCards} from "./card.js";
import {enableValidation} from "./validate.js";

window.onload = function () {
  initModal();
  enableValidation(validationConfig);
  initCards();
};
