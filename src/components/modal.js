import {toggleButtonInPopup, hideInputErrorInPopup} from "./validate.js";
import {submitFormAddCard, formAddCardElement} from "./card.js";


export const popupEditProfile = document.querySelector('.popup_type_edit-profile');
// выбор попапа фото и кнопки закрытия внутри него
const popupOpenPhoto = document.querySelector('.popup_type_open-photo');
const buttonClosePhoto = popupOpenPhoto.querySelector('.popup__close-icon_close-photo');
// выбор попапов и кнопок закрытия внутри них
export const popupAddCard = document.querySelector('.popup_type_add-card');
const buttonCloseAddCard = popupAddCard.querySelector('.popup__close-icon');
// выбор имени пользователя и статуса на странице
const username = document.querySelector('.profile__username');
const userInfo = document.querySelector('.profile__user-info');
// Находим форму редактирования профиля в DOM
export const formProfileElement = popupEditProfile.querySelector('[name="profile edit form"]');

// выбор текстовых полей формы редактирования профиля, где д/отображ-ся имя и статус со страницы
const inputUsername = popupEditProfile.querySelector('.popup__item_type_username');
const inputUserInfo = popupEditProfile.querySelector('.popup__item_type_user-info');

const buttonAddCard = document.querySelector('.profile__add-button');

const buttonCloseEditProfile = popupEditProfile.querySelector('.popup__close-icon');
/*1.1 Открытие и закрытие модального окна */
// выбор кнопок редактирования профиля и добавления карточки
const buttonEditProfile = document.querySelector('.profile__edit-button');

export function init() {
  addListenerToOverlay();
  // обработчик событий для кнопки закрытия попапа с фотографией
  buttonClosePhoto.addEventListener('click', () => {
    closePopup(popupOpenPhoto);
  });
  document.querySelector('.popup__opened-photo-container').addEventListener('click', (evt) => {
    evt.stopPropagation();
  });
  // Прикрепление обработчика к форме, который будет следить за событием “submit” - «отправка» + закрытие попапа (см. ф-цию выше)
  formProfileElement.addEventListener('submit', submitFormEditProfile);
  // 1.2 Поля формы. Отображение значений по умолчанию в полях формы редактирования профиля
// обработчик событий для кнопки открытия попапа редактирования профиля
// + извлечение контента со страницы и заполнение им полей формы данного попапа
  buttonEditProfile.addEventListener('click', openPopupEditProfile);
}


// обработчик событий клавиши Esc для закрытия попапа редактирования профиля
function handleESC(evt) {
  if (evt.key === 'Escape') {
    document.querySelectorAll('.popup_opened').forEach(popupItem => {
      closePopup(popupItem);
    });
  }
}

// document.addEventListener('keydown', handleESC);
//
// // снятие обработчика с кнопки ESC
// export function removeEventListenerFromButton() {
//   document.removeEventListener('keydown', handleESC);
// }

// обработчик события клика мыши на оверлей для закрытия попапов
function addListenerToOverlay() {
  const popupList = document.querySelectorAll('.popup');
  popupList.forEach(popupListItem => {
    popupListItem.addEventListener('click', (evt) => {
      closePopup(evt.target);
      // отмена всплытия события до .popup, чтобы можно было воспользоваться формой в .popup__container
      evt.stopPropagation();
    });
  });
}

// функция откртытия попапа общая
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  // добавление обработчика на документ при нажатии кнопки ESC
  document.addEventListener('keydown', handleESC);
}

// функция закрытия попапа общая
export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  // удаление обрабтчика с документа, когда не нужно отслеживать кнопку ESC, т.к. попап закрыт
  document.removeEventListener('keydown', handleESC);
}

// функция открытия попапа с изображением из карточки
export function openPopupImage(card) {
  // выбор попапа
  const popupOpenPhoto = document.querySelector('.popup_type_open-photo');
  // открытие попапа
  openPopup(popupOpenPhoto);
  // выбор контейнера попапа
  const image = popupOpenPhoto.querySelector('.popup__opened-image');
  // заполнение контейнера нужным содержимым (изображение + подпись) в зависимости от кликнутой картинки
  image.src = card.link;
  image.alt = card.name;
  const signature = popupOpenPhoto.querySelector('.popup__image-signature');
  signature.textContent = card.name;
}

// 1.2 Поля формы. Отображение значений по умолчанию в полях формы редактирования профиля
export function openPopupEditProfile() {
  inputUsername.value = username.textContent;
  inputUserInfo.value = userInfo.textContent;
  openPopup(popupEditProfile);
  // проверка кнопки и валидности форм при открытии конкретного попапа, в котором точно есть форма.
  // перенесено из общей ф-ции открытия попапа, т.к. не у всех попапов есть формы
  const button = popupEditProfile.querySelector('.popup__save-button');
  toggleButtonInPopup(popupEditProfile, button, 'popup__save-button_disabled')
  hideInputErrorInPopup(popupEditProfile, '.popup__form', '.popup__item', 'popup__item_type_error', 'popup__input-error_active');
}

// 1.3 Редактирование имени и информации о себе

// Функция обработчика «отправки» формы, хотя пока она никуда отправляться не будет
export function submitFormEditProfile(evt) {
  //отмена стандартной отправки формы
  evt.preventDefault();

  // вставка новых значений с помощью textContent на страницу из полей формы, значения которых извлекаются с помощью value
  username.textContent = inputUsername.value;
  userInfo.textContent = inputUserInfo.value;

  // здесь же - вызов функции закрытия попапа, т.к. после нажатия на submit он в любом случае д.закрываться
  closePopup(popupEditProfile);
}


// обработчик событий для кнопки открытия попапа добавления карточки
buttonAddCard.addEventListener('click', () => {
  openPopup(popupAddCard);
  const button = popupAddCard.querySelector('.popup__save-button');
  toggleButtonInPopup(popupAddCard, button, '.popup__form', '.popup__item','popup__save-button_disabled')
  hideInputErrorInPopup(popupAddCard, '.popup__form', '.popup__item', 'popup__item_type_error', 'popup__input-error_active');
});

// обработчик событий для кнопки закрытия попапа редактирования профиля
buttonCloseEditProfile.addEventListener('click', () => {
  closePopup(popupEditProfile);
});

// обработчик событий для кнопки закрытия попапа добавления карточки
buttonCloseAddCard.addEventListener('click', () => {
  closePopup(popupAddCard);
});

// Прикрепление обработчика к форме, который будет следить за событием “submit” - «отправка» для добавления карточки
formAddCardElement.addEventListener('submit', submitFormAddCard);

// Отменим стандартное поведение по сабмиту для всех форм попапа
formProfileElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
});
