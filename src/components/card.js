import {closePopup, openPopup} from "./modal.js";
import {getCards, createNewCard, deleteCard, putLike, deleteLike} from "./api.js";
import {userInfo} from "../pages/index.js";
import {hideInputErrorInPopup, toggleButtonInPopup} from "./validate";
import Section from "./Section.js";
import {Popup} from "./modal.js";

/*** Созвон 1, 07.10.2021. Создание класса Card, перенос функций ***/
class Card {
  constructor(data, cardSelector) {
    // this._data = data;
    this._link = data.link;
    this._name = data.name;
    this._likes = data.likes;
    //this._handleCardClick = handleCardClick;
    this._cardSelector = cardSelector;

  }

  _getElement() {
    return document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.gallery-item')
      .cloneNode(true);
  }

  _addCardInfo() {
    // найти поля, куда надо добавить содержимое из массива
    this._cardElement.querySelector('.gallery-item__signature').textContent = this._name;
    this._cardElement.querySelector('.gallery-item__photo').src = this._link;
    this._cardElement.querySelector('.gallery-item__photo').alt = this._name;
    const likesCount = this._cardElement.querySelector('.gallery-item__like-count');
    likesCount.textContent = this._likes.length;
  }

  //Костя 12.10

  _setLikeListener() {
    this._cardElement.querySelector('.gallery-item__like').addEventListener("click", () => {
    this._setLikeColor();
    });
  };

  _toggleLike() {
    this._cardElement.querySelector('.gallery-item__like').classList.toggle('gallery-item__like_active');
  };



  _setLikeColor() {
    const cardLike = this._cardElement.querySelector('.gallery-item__like');
    cardLike.classList.add('gallery-item__like_active');
  }

  setDeleteElement() {
    const basket = document.createElement('button')
    basket.classList.add('gallery-item__delete-card');
    basket.setAttribute('aria-label', 'удалить карточку');
    basket.setAttribute('type', 'button');

    const referenceElement = this._cardElement.querySelector('.gallery-item__content-text');
    referenceElement.before(basket);

  }




  createCard() {
    this._cardElement = this._getElement();
    this._addCardInfo();
    this._setLikeListener();


    return this._cardElement;
  }
}


// выбор попапа фото и кнопки закрытия внутри него
const popupOpenPhoto = document.querySelector('.popup_type_open-photo');
const buttonClosePhoto = popupOpenPhoto.querySelector('.popup__close-icon_close-photo');
// выбор попапов и кнопок закрытия внутри них
const popupAddCard = document.querySelector('.popup_type_add-card');
const buttonCloseAddCard = popupAddCard.querySelector('.popup__close-icon');

const buttonAddCard = document.querySelector('.profile__add-button');
/*1.1 Открытие и закрытие модального окна */
const buttonSaveCard = popupAddCard.querySelector('.popup__save-button');
// (6.) поиск контейнера для карточек в DOM
const cardContainer = document.querySelector('.gallery');
// (6.) поиск формы создания новой карточки в DOM
const formAddCardElement = document.querySelector('[name="add card form"]');

export function init(user) {
  getCards()
    .then((cardList) => {
      cardList.reverse();
      const defaultCardList = new Section({
        data: cardList,
        renderer: (item) => {
          const card = new Card(item, '#card-template' );
          const cardItem = card.createCard();
          if (item.likes && item.likes.some(like => like._id === user._id)) {
            card._setLikeColor();
          }
          if (user._id === item.owner._id) {
            card.setDeleteElement();
          }
          defaultCardList.setItem(cardItem);
        }
      }, cardContainer);
      defaultCardList.renderItems();
    })
    .catch((err) => {
      console.log(err);
    })
// initialCards.forEach(item => {
//   addCard(item, cardContainer);
// });
  // обработчик событий для кнопки закрытия попапа с фотографией
/*  buttonClosePhoto.addEventListener('click', () => {
    closePopup(popupOpenPhoto);
  });*/
  // обработчик событий для кнопки открытия попапа добавления карточки
  buttonAddCard.addEventListener('click', () => {
    const popup = new Popup(popupAddCard);
    popup.open();
    //openPopup(popupAddCard);
    toggleButtonInPopup(popupAddCard, buttonSaveCard, '.popup__form', '.popup__item', 'popup__save-button_disabled')
    hideInputErrorInPopup(popupAddCard, '.popup__form', '.popup__item', 'popup__item_type_error', 'popup__input-error_active');
  });

// Прикрепление обработчика к форме, который будет следить за событием “submit” - «отправка» для добавления карточки
  //formAddCardElement.addEventListener('submit', submitFormAddCard);
  // обработчик событий для кнопки закрытия попапа добавления карточки
 /* buttonCloseAddCard.addEventListener('click', () => {
    closePopup(popupAddCard);
  });*/
}

// функция открытия попапа с изображением из карточки
/*function openPopupImage(card) {
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
}*/

//const addLikeElementToCard = (cardElement, card, user) => {
// 5. Лайк карточки
// выбор кнопок лайка на странице
// const likesCount = cardElement.querySelector('.gallery-item__like-count');
// const cardLike = cardElement.querySelector('.gallery-item__like');
// likesCount.textContent = card.likes.length;
// if (card.likes && card.likes.some(like => like._id === user._id)) {
//   // cardLike.classList.add('gallery-item__like_active');
//   card. setLikeColor();

//}
// слушатель с функцией event для выбора конкретного лайка, по которому кликнул пользователь
// cardLike.addEventListener('click', function (evt) {
//   // есть ли среди аккаунтов лайкнувших людей мой аккаунт? Если да, то надо его удалить
//   if (card.likes && card.likes.some(like => like._id === user._id)) {
//     deleteLike(card._id)
//       .then(likedCard => {
//         card.likes = likedCard.likes;
//         // выбор кликнутого лайка через event target
//         const targetLike = evt.target;
//         // изменение класса для кикнутого лайка (установленного и снятого)
//         targetLike.classList.remove('gallery-item__like_active');
//         likesCount.textContent = likedCard.likes.length;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   } else {
//     putLike(card._id)
//       .then(likedCard => {
//         card.likes = likedCard.likes;
//         // выбор кликнутого лайка через event target
//         const targetLike = evt.target;
//         // изменение класса для кикнутого лайка (установленного и снятого)
//         targetLike.classList.add('gallery-item__like_active');
//         likesCount.textContent = likedCard.likes.length;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
// });
// }

//  const addDeleteElementToCard = (cardElement, card, user) => {
// //   // если юзер (отправляющий запрос со своим токеном) - это тот, кто создал карточку, создать на этой карточке корзину
// //   if (user._id === card.owner._id) {
// //     // const basket = document.createElement('button')
// //     // basket.classList.add('gallery-item__delete-card');
// //     // basket.setAttribute('aria-label', 'удалить карточку');
// //     // basket.setAttribute('type', 'button');
// //     //
// //     // const referenceElement = cardElement.querySelector('.gallery-item__content-text');
// //     // referenceElement.before(basket);
// //
//
//     basket.addEventListener('click', function () {
//       deleteCard(card._id)
//         // result для запроса DELETE - это либо undefind, либо 200 OK
//         .then(result => {
//           // кнопка кликнута - выбор ближайшего родителя кликнутой кнопки
//           const targetToDelete = basket.closest('.gallery-item');
//           // удаление карточки (ближайшего родителя кликнутой кнопки), по иконке удаления которой кликнул пользователь
//           targetToDelete.remove();
//         })
//         .catch((err) => {
//           console.log(err);
//         })
//     })
//  // }
// }

// 4. Добавление полноценной карточки через форму / при загрузке страницы
// 4.1 Создание карточки
function createCard(card, user) {
  // найти template в DOM
  const cardTemplate = document.querySelector('#card-template').content;
  // поиск узла (ноды) "элемент 'карточка'" для клонирования всего содежиомого
  const cardElement = cardTemplate.querySelector('.gallery-item').cloneNode(true);

  // найти поля, куда надо добавить содержимое из массива
  cardElement.querySelector('.gallery-item__signature').textContent = card.name;
  cardElement.querySelector('.gallery-item__photo').src = card.link;
  cardElement.querySelector('.gallery-item__photo').alt = card.name;

  addLikeElementToCard(cardElement, card, user);

// 6. Удаление карточки
// выбор кнопок удаления карточек

// слушатель на кнопку удаления, по которой кликнул полз-ль
  addDeleteElementToCard(cardElement, card, user);

// 7. Открытие и закрытие фото по клику
// выбор кнопки-картинки, которая откроет саму картинку в попапе
  const buttonOpenPhoto = cardElement.querySelector('.gallery-item__photo');


// обработчик событий для кнопки открытия попапа с фотографией с вызовом функции добавления в попап нужной информации из карточек
  buttonOpenPhoto.addEventListener('click', (evt) => {
    evt.stopPropagation();
    openPopupImage(card);
  });

// вернуть готовую карточку со всеми внутренними примочками (лайк, удаление, открытие фото)
  return cardElement;
}


// обработчик события submit для формы добавления новой карточки
/*function submitFormAddCard(evt) {
  //отмена стандартной отправки формы
  evt.preventDefault();

  // поиск полей добавления названия места и ссылки на фотографию
  const placeName = formAddCardElement.querySelector('.popup__item_type_place');
  const placePic = formAddCardElement.querySelector('.popup__item_type_link');

  // вставка новых значений с помощью аналогичного объявленному выше массива на страницу из полей формы, значения которых извлекаются с помощью value
  // const card = {
  //   name: placeName.value,
  //   link: placePic.value
  // };

  // вызов функции добавления карточки на страницу, внутри которой есть функция для создания самой разметки карточки. Передаваемые агрументы:
  //      1 - массив карточек - либо статичный для отрисовки дефолтных, либо массив, создаваемый при передачи данных из фориы добавления карточки;
  //      2 - контейнер в разметке, куда надо вставлять карточки, полученные из массивов
  // addCard(card, cardContainer);

 buttonSaveCard.textContent = "Сохранение...";
  createNewCard(placeName.value, placePic.value)
    .then(card => {
      addCard(card, cardContainer, userInfo);
      formAddCardElement.reset();
// здесь же - вызов функции закрытия попапа с формой добавления карточки,
// т.к. после нажатия на submit он в любом случае д/закрываться
      closePopup(popupAddCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonSaveCard.textContent = "Создать";
    })
}*/
