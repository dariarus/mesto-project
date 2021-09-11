import {openPopupImage} from "./modal.js";
import {closePopup, popupAddCard} from "./modal.js";
import {initialCards} from "./initial-cards.js";

// (6.) поиск контейнера для карточек в DOM
export const cardContainer = document.querySelector('.gallery');
// (6.) поиск формы создания новой карточки в DOM
export const formAddCardElement = document.querySelector('[name="add card form"]');

export function init () {
  initialCards.forEach(item => {
    addCard(item, cardContainer);
  });
}


// 4. Добавление полноценной карточки через форму / при загрузке страницы

// 4.1 Создание карточки
function createCard(card) {
  // найти template в DOM
  const cardTemplate = document.querySelector('#card-template').content;
  // поиск узла (ноды) "элемент 'карточка'" для клонирования всего содежиомого
  const cardElement = cardTemplate.querySelector('.gallery-item').cloneNode(true);
  // найти поля, куда надо добавить содержимое из массива
  cardElement.querySelector('.gallery-item__signature').textContent = card.name;
  cardElement.querySelector('.gallery-item__photo').src = card.link;
  cardElement.querySelector('.gallery-item__photo').alt = card.name;

  // 5. Лайк карточки
  // выбор кнопок лайка на странице
  const cardLike = cardElement.querySelector('.gallery-item__like');
  // слушатель с функцией event для выбора конкретного лайка, по которому кликнул пользователь
  cardLike.addEventListener('click', function (evt) {
    // выбор кликнутого лайка через event target
    const targetLike = evt.target;
    // изменение класса для кикнутого лайка (установленного и снятого)
    targetLike.classList.toggle('gallery-item__like_active');
  });

  // 6. Удаление карточки
  // выбор кнопок удаления карточек
  const buttonDeleteCard = cardElement.querySelector('.gallery-item__delete-card');
  // слушатель на кнопку удаления, по которой кликнул полз-ль
  buttonDeleteCard.addEventListener('click', function () {
    // кнопка кликнута - выбор ближайшего родлителя кликнутой кнопки
    const targetToDelete = buttonDeleteCard.closest('.gallery-item');
    // удаление карточки (ближайшего родителя кликнутой кнопки), по иконке удаления которой кликнул пользователь
    targetToDelete.remove();
  })

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
export function addCard(card, cardContainer) {
  const cardElement = createCard(card);
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
  const card = {
    name: placeName.value,
    link: placePic.value
  };

  // вызов функции добавления карточки на страницу, внутри которой есть функция для создания самой разметки карточки. Передаваемые агрументы:
  //      1 - массив карточек - либо статичный для отрисовки дефолтных, либо массив, создаваемый при передачи данных из фориы добавления карточки;
  //      2 - контейнер в разметке, куда надо вставлять карточки, полученные из массивов
  addCard(card, cardContainer);

  //
  // здесь же - вызов функции закрытия попапа с формой добавления карточки,
  //          т.к. после нажатия на submit он в любом случае д/закрываться
  closePopup(popupAddCard);
}
