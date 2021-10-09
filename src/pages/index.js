import './index.css'; //подключить в файл точки входа основной файл стилей - работает только для Webpack

import {validationConfig} from "../components/variables.js";
import {init as initModal} from '../components/modal.js'
import {init as initCards} from "../components/card.js";
import {enableValidation} from "../components/validate.js";
import {init as initAvatar} from "../components/avatar.js";
import {getUser} from "../components/api.js";
import {init as initProfile} from "../components/profile.js";

export let userInfo;

window.onload = function () {
  getUser()
    .then(user => {
      userInfo = user;
    })
    .then(() => {
      initProfile(userInfo);
      initAvatar(userInfo);
      initCards(userInfo);
      initModal();
      enableValidation(validationConfig);
    });
};
