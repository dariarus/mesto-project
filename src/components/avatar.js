import {closePopup, openPopup} from "./modal.js";
import {getUser, updateAvatarUrl} from "./api.js";
import {hideInputErrorInPopup, toggleButtonInPopup} from "./validate.js";
import {api} from "./api";

// картинка с Кусто отдается в работу webpack-у для первоначальной загрузки на страницу
// const defaultAvatar = new URL('../images/Cousteau-photo.jpg', import.meta.url);

// выбор попапа редактирования аватара
const popupEditAvatar = document.querySelector('.popup_type_update-avatar');
// выбор кнопки закрытия попапа редактирования аватара
const buttonClosePopupEditAvatar = popupEditAvatar.querySelector('.popup__close-icon');
// выбор кнопки редактирования аватара
const buttonEditAvatar = document.querySelector('.profile__edit-avatar-button');
// выбор картинки с аватаром, над которой появляется кнопка
const imageAvatar = document.querySelector('.profile__avatar');
// выбор формы и инпута внутри попапа редактироования аватара
const formAvatarElement = popupEditAvatar.querySelector('[name="update avatar form"]');
const inputAvatarUrl = popupEditAvatar.querySelector('.popup__item_type_link');

const buttonSubmitEditAvatar = popupEditAvatar.querySelector('.popup__save-button');


export function init(user) {
  updateAvatarOnPage(user.avatar);
}

imageAvatar.addEventListener('mouseenter', () => {
  buttonEditAvatar.classList.add('profile__edit-avatar-button_active');
});
buttonEditAvatar.addEventListener('mouseleave', () => {
  buttonEditAvatar.classList.remove('profile__edit-avatar-button_active');
});

buttonEditAvatar.addEventListener('click', () => {
  openPopup(popupEditAvatar);
  const button = popupEditAvatar.querySelector('.popup__save-button');
  toggleButtonInPopup(popupEditAvatar, button, 'popup__save-button_disabled')
  hideInputErrorInPopup(popupEditAvatar, '.popup__form', '.popup__item', 'popup__item_type_error', 'popup__input-error_active');
});

buttonClosePopupEditAvatar.addEventListener('click', () => {
  closePopup(popupEditAvatar);
});

const updateAvatarOnPage = (url) => {
  imageAvatar.src = url;
}

const updateAvatarOnServer = (url) => {
  buttonSubmitEditAvatar.textContent = 'Сохранение...';
  api.updateAvatarUrl(url)
    .then(user => {
      updateAvatarOnPage(user.avatar);
      closePopup(popupEditAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonSubmitEditAvatar.textContent = 'Сохранить';
    })
}

const submitEditAvatar = (evt) => {
  //отмена стандартной отправки формы
  evt.preventDefault();
  updateAvatarOnServer(inputAvatarUrl.value);
  formAvatarElement.reset();
}

formAvatarElement.addEventListener('submit', submitEditAvatar);

