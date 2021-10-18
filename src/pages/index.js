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
import {hideInputErrorInPopup, toggleButtonInPopup} from "../components/validate";

export let userInfo;
let cardsSection;
const popupOpenPhoto = new PopupWithImage('.popup_type_open-photo');

window.onload = function () {
  api.getUser()
    .then(user => {
      userInfo = user;
    })
    .then(() => {
      // initProfile(userInfo);
      initAvatar(userInfo);
      initCards(userInfo);
      initPopupAddCard();
      initPopupEditProfile();
      initPopupChangeAvatar();
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
            handleCardClick: () => {
              popupOpenPhoto.open(cardData);
            },
            setLike: (evt, card) => {
              if (cardData.likes && cardData.likes.some(like => like._id === user._id)) {
                api.deleteLike(cardData._id)
                  .then(likedCard => {
                    cardData.likes = likedCard.likes;
                    // поскольку есть card, в который прокинут this, evt.target для определения кликнутого лайка больше не нужен
                    // изменение класса для кикнутого лайка (установленного и снятого)
                    card.removeLikeColor();
                    card.refreshLikesCount();
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              } else {
                api.putLike(cardData._id)
                  .then(likedCard => {
                    cardData.likes = likedCard.likes;
                    // изменение класса для кикнутого лайка (установленного и снятого)
                    card.setLikeColor();
                    card.refreshLikesCount();
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            }
          });
          const cardElement = card.generateElement();
          if (cardData.likes && cardData.likes.some(like => like._id === user._id)) {
            card.setLikeColor();
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


function initPopupAddCard() {
  const buttonAddCard = document.querySelector('.profile__add-button');
  const popupAddCard = new PopupWithForm('.popup_type_add-card', (popup) => {
    //evt.preventDefault();
    const buttonSaveCard = popup._popupSelector.querySelector('.popup__save-button');
    buttonSaveCard.textContent = "Сохранение...";

    const inputValues = popup._getInputValues();

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
  });
  buttonAddCard.addEventListener('click', () => {
    popupAddCard.open();
  });
}

function initPopupEditProfile() {
  const buttonEditProfile = document.querySelector('.profile__edit-button');
  const popupEditProfile = new PopupWithForm('.popup_type_edit-profile', (popup) => {

    const buttonSaveProfile = popup._popupSelector.querySelector('.popup__save-button');
    buttonSaveProfile.textContent = 'Сохранение...';

    const inputValues = popup._getInputValues();

    const usernameElement = popup._popupSelector.querySelector('.profile__username');
    const userInfoElement = popup._popupSelector.querySelector('.profile__user-info');

    // вставка новых значений с помощью textContent на страницу из полей формы, значения которых извлекаются с помощью value
    api.saveProfile(inputValues.name, inputValues.about)
      .then(result => {
        usernameElement.textContent = result.name;
        userInfoElement.textContent = result.about;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        buttonSaveProfile.textContent = 'Сохранить';
      })
  });

  buttonEditProfile.addEventListener('click', () => {
    popupEditProfile.open();
    const usernameElement = document.querySelector('.profile__username');
    const userInfoElement = document.querySelector('.profile__user-info');

    popupEditProfile.setInputValue('name', usernameElement.textContent);
    popupEditProfile.setInputValue('about', userInfoElement.textContent);
  })
}

function initPopupChangeAvatar() {
  const buttonChangeAvatar = document.querySelector('.profile__edit-avatar-button');
  const popupChangeAvatar = new PopupWithForm('.popup_type_update-avatar', (popup) => {

    const buttonSubmitEditAvatar = popup._popupSelector.querySelector('.popup__save-button');
    buttonSubmitEditAvatar.textContent = 'Сохранение...';

    const inputValues = popup._getInputValues();

    api.updateAvatarUrl(inputValues.avatar)
      .then(user => {
        const imageAvatar = document.querySelector('.profile__avatar');
        imageAvatar.src = user.avatar;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        buttonSubmitEditAvatar.textContent = 'Сохранить';
      })
  })
  buttonChangeAvatar.addEventListener('click', () => {
    popupChangeAvatar.open();
  });
}
