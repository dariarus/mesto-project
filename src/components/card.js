import {openPopupImage, closePopup, popupAddCard} from "./modal.js";
import {getCards, createNewCard, getUser, deleteCard, putLike, deleteLike} from "./api.js";
import {buttonSaveCard} from "./modal.js";

// (6.) поиск контейнера для карточек в DOM
export const cardContainer = document.querySelector('.gallery');
// (6.) поиск формы создания новой карточки в DOM
export const formAddCardElement = document.querySelector('[name="add card form"]');

export function init() {
  getUser()
    .then(user => {
      getCards()
        .then((cardList) => {
          cardList.forEach((card) => {
            addCard(card, cardContainer, user);
          })
        })
      .catch((err) => {
        console.log(err);
      })
    })
    .catch((err) => {
      console.log(err);
    })
  // initialCards.forEach(item => {
  //   addCard(item, cardContainer);
  // });
}

// 4. Добавление полноценной карточки через форму / при загрузке страницы

// 4.1 Создание карточки
function createCard(card, user) {
  // найти template в DOM
  const cardTemplate = document.querySelector('#card-template').content;
  // поиск узла (ноды) "элемент 'карточка'" для клонирования всего содежиомого
  const cardElement = cardTemplate.querySelector('.gallery-item').cloneNode(true);
  const likesCount = cardElement.querySelector('.gallery-item__like-count');
  // найти поля, куда надо добавить содержимое из массива
  cardElement.querySelector('.gallery-item__signature').textContent = card.name;
  cardElement.querySelector('.gallery-item__photo').src = card.link;
  cardElement.querySelector('.gallery-item__photo').alt = card.name;
  likesCount.textContent = card.likes.length;

  // 5. Лайк карточки

  // выбор кнопок лайка на странице
  const cardLike = cardElement.querySelector('.gallery-item__like');
  if (card.likes && card.likes.some(like => like._id === user._id)) {
    cardLike.classList.add('gallery-item__like_active');
  }
  // слушатель с функцией event для выбора конкретного лайка, по которому кликнул пользователь
  cardLike.addEventListener('click', function (evt) {
    // есть ли среди аккаунтов лайкнувших людей мой аккаунт? Если да, то надо его удалить
    if (card.likes && card.likes.some(like => like._id === user._id)) {
      deleteLike(card._id)
        .then(likedCard => {
          card.likes = likedCard.likes;
          // выбор кликнутого лайка через event target
          const targetLike = evt.target;
          // изменение класса для кикнутого лайка (установленного и снятого)
          targetLike.classList.remove('gallery-item__like_active');
          likesCount.textContent = likedCard.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      putLike(card._id)
        .then(likedCard => {
          card.likes = likedCard.likes;
          // выбор кликнутого лайка через event target
          const targetLike = evt.target;
          // изменение класса для кикнутого лайка (установленного и снятого)
          targetLike.classList.add('gallery-item__like_active');
          likesCount.textContent = likedCard.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

// 6. Удаление карточки
// выбор кнопок удаления карточек

// слушатель на кнопку удаления, по которой кликнул полз-ль
  // если юзер (отправляющий запрос со своим токеном) - это тот, кто создал карточку, создать на этой карточке корзину
  if (user._id === card.owner._id) {
    const basket = document.createElement('button')
    basket.classList.add('gallery-item__delete-card');
    basket.setAttribute('aria-label', 'удалить карточку');
    basket.setAttribute('type', 'button');

    const referenceElement = cardElement.querySelector('.gallery-item__content-text');
    referenceElement.before(basket);

    basket.addEventListener('click', function () {
      deleteCard(card._id)
        // result для запроса DELETE - это либо undefind, либо 200 OK
        .then(result => {
          // кнопка кликнута - выбор ближайшего родителя кликнутой кнопки
          const targetToDelete = basket.closest('.gallery-item');
          // удаление карточки (ближайшего родителя кликнутой кнопки), по иконке удаления которой кликнул пользователь
          targetToDelete.remove();
        })
        .catch((err) => {
          console.log(err);
        })
    })
  }

// 7. Открытие и закрытие фото по клику
// выбор кнопки-картинки, которая откроет саму картинку в попапе
  const buttonOpenPhoto = cardElement.querySelector('.gallery-item__photo');


// обработчик событий для кнопки открытия попапа с фотографией с вызовом функции добавления в попап нужной информации из карточек
  buttonOpenPhoto.addEventListener('click', () => {
    openPopupImage(card);
  });

// вернуть готовую карточку со всеми внутренними примочками (лайк, удаление, открытие фото)
  return cardElement;
}

// функция для добавления карточки в DOM
export function addCard(card, cardContainer, user) {
  const cardElement = createCard(card, user);
  cardContainer.prepend(cardElement);
}

// обработчик события submit для формы добавления новой карточки
export function submitFormAddCard(evt) {
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
      getUser()
        .then(user => {
          addCard(card, cardContainer, user);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          buttonSaveCard.textContent = "Сохранить";
        })
    })

  formAddCardElement.reset();
  //
  // здесь же - вызов функции закрытия попапа с формой добавления карточки,
  //          т.к. после нажатия на submit он в любом случае д/закрываться
  closePopup(popupAddCard);
}
