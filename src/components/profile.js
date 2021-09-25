import {saveProfile} from "./api.js";
import {openPopup, closePopup} from "./modal.js";
import {hideInputErrorInPopup, toggleButtonInPopup} from "./validate.js";

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
// выбор имени пользователя и статуса на странице
const username = document.querySelector('.profile__username');
const userInfoElement = document.querySelector('.profile__user-info');
// выбор текстовых полей формы редактирования профиля, где д/отображ-ся имя и статус со страницы
const inputUsername = popupEditProfile.querySelector('.popup__item_type_username');
const inputUserInfo = popupEditProfile.querySelector('.popup__item_type_user-info');
// Находим форму редактирования профиля в DOM
const formProfileElement = popupEditProfile.querySelector('[name="profile edit form"]');
// выбор кнопок редактирования профиля и добавления карточки
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonSaveProfile = popupEditProfile.querySelector('.popup__save-button');
const buttonCloseEditProfile = popupEditProfile.querySelector('.popup__close-icon');

export function init(user) {
// 1.2 Поля формы. Отображение значений по умолчанию в полях формы редактирования профиля
  username.textContent = user.name;
  userInfoElement.textContent = user.about;
  // Прикрепление обработчика к форме, который будет следить за событием “submit” - «отправка» + закрытие попапа (см. ф-цию выше)
  formProfileElement.addEventListener('submit', submitFormEditProfile);
// // Отменим стандартное поведение по сабмиту для всех форм попапа
//   formProfileElement.addEventListener('submit', function (evt) {
//     evt.preventDefault();
//   });
  // обработчик событий для кнопки открытия попапа редактирования профиля
// + извлечение контента со страницы и заполнение им полей формы данного попапа
  buttonEditProfile.addEventListener('click', openPopupEditProfile);
}

// 1.2 Поля формы. Отображение значений по умолчанию в полях формы редактирования профиля
function openPopupEditProfile() {
  inputUsername.value = username.textContent;
  inputUserInfo.value = userInfoElement.textContent;
  openPopup(popupEditProfile);
  // проверка кнопки и валидности форм при открытии конкретного попапа, в котором точно есть форма.
  // перенесено из общей ф-ции открытия попапа, т.к. не у всех попапов есть формы
  toggleButtonInPopup(popupEditProfile, buttonSaveProfile, '.popup__form', '.popup__item','popup__save-button_disabled');
  hideInputErrorInPopup(popupEditProfile, '.popup__form', '.popup__item', 'popup__item_type_error', 'popup__input-error_active');
}

// 1.3 Редактирование имени и информации о себе
// вставка новых значений с помощью textContent на страницу из полей формы, значения которых извлекаются с помощью value
// Функция обработчика «отправки» формы, хотя пока она никуда отправляться не будет
function submitFormEditProfile(evt) {
  //отмена стандартной отправки формы
  evt.preventDefault();

  buttonSaveProfile.textContent = 'Сохранение...';
  // вставка новых значений с помощью textContent на страницу из полей формы, значения которых извлекаются с помощью value
  saveProfile(inputUsername.value, inputUserInfo.value)
    .then(result => {
      username.textContent = result.name;
      userInfoElement.textContent = result.about;
      // здесь же - вызов функции закрытия попапа, т.к. после нажатия на submit он в любом случае д.закрываться
      closePopup(popupEditProfile);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonSaveProfile.textContent = 'Сохранить';
    })
}

// обработчик событий для кнопки закрытия попапа редактирования профиля
buttonCloseEditProfile.addEventListener('click', () => {
  closePopup(popupEditProfile);
});
