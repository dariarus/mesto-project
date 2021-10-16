import './index.css'; //подключить в файл точки входа основной файл стилей - работает только для Webpack

import {validationConfig} from "../components/variables.js";
import {enableValidation} from "../components/validate.js";
import {init as initAvatar} from "../components/avatar.js";
import {getUser} from "../components/api.js";
import {init as initProfile} from "../components/profile.js";
import {getCards} from "../components/api";
import Section from "../components/Section";
import {Card} from "../components/card";
import Api from "../components/api.js";
import {api} from "../components/api.js";
import {closePopup, PopupWithForm, PopupWithImage} from "../components/modal";

export let userInfo;
let cardsSection;
const popupOpenPhoto = new PopupWithImage('.popup_type_open-photo');

window.onload = function () {
  api.getUser()
    .then(user => {
      userInfo = user;
    })
    .then(() => {
      initProfile(userInfo);
      initAvatar(userInfo);
      initCards(userInfo);
      initPopupWithForm();
      enableValidation(validationConfig);
    });
};

// const api = new Api({
//     baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-1',
//     headers: {
//       authorization: '020e494d-03bf-4222-970c-2fbceefd04a5',
//       'Content-Type': 'application/json'
//     }
//   });

function initCards(user) {
  api.getCards()
    .then((cardList) => {
      // cardList.reverse();
      cardsSection = new Section({
        data: cardList,
        renderer: (cardData) => {
          const card = new Card(cardData, '#card-template', {
            deleteCard: (evt) => {
              api.deleteCard(cardData._id)
                .then(() => {
                  // кнопка кликнута - выбор ближайшего родителя кликнутой кнопки
                  const targetToDelete = evt.target.closest('.gallery-item');
                  // удаление карточки (ближайшего родителя кликнутой кнопки), по иконке удаления которой кликнул пользователь
                  targetToDelete.remove();
                })
                .catch((err) => {
                  console.log(err);
                })
            },
            openCardImage: () => {
              popupOpenPhoto.open(cardData);
            }
          });
          const cardElement = card.generateElement();
          if (cardData.likes && cardData.likes.some(like => like._id === user._id)) {
            card._setLikeColor();
          }
          if (user._id === cardData.owner._id) {
            card.setDeleteElement();
          }
          cardsSection.setItem(cardElement);
        }
      }, '.gallery');
      cardsSection.renderItems();
    })
    .catch((err) => {
      console.log(err);
    })
}


function initPopupWithForm() {
  const buttonAddCard = document.querySelector('.profile__add-button');
  const popupAddCard = new PopupWithForm('.popup_type_add-card', (evt) => {
      evt.preventDefault();

      const buttonSaveCard = this._popupSelector.querySelector('.popup__save-button');
      buttonSaveCard.textContent = "Сохранение...";

      const inputValues = this._getInputValues();

      api.createNewCard(inputValues.name, inputValues.link)
        .then(cardData => {
          cardsSection.renderItem(cardData);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          buttonSaveCard.textContent = "Создать";
        })
    }
  );
  buttonAddCard.addEventListener('click', () => {
    popupAddCard.open();
  });
}


