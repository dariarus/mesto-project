/* 1. Работа модальных окон

1.1 Открытие и закрытие модального окна */
// выбор кнопок редактирования профиля и добавления карточки
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');

// выбор попапов и кнопок закрытия внутри них
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const buttonCloseEditProfile = popupEditProfile.querySelector('.popup__close-icon');
const buttonCloseAddCard = popupAddCard.querySelector('.popup__close-icon');
// выбор попапа фото и кнопки закрытия внутри него
const popupOpenPhoto = document.querySelector('.popup_type_open-photo');
const buttonClosePhoto = popupOpenPhoto.querySelector('.popup__close-icon_close-photo');

// Находим форму редактирования профиля в DOM
const formProfileElement = popupEditProfile.querySelector('[name="profile edit form"]');
// выбор текстовых полей формы редактирования профиля, где д/отображ-ся имя и статус со страницы
const inputUsername = popupEditProfile.querySelector('.popup__item_type_username');
const inputUserInfo = popupEditProfile.querySelector('.popup__item_type_user-info');

// (6.) поиск контейнера для карточек в DOM
const cardContainer = document.querySelector('.gallery');

// (6.) поиск формы создания новой карточки в DOM
const formAddCardElement = document.querySelector('[name="add card form"]');

// добавление дефолтных карточек при загрузке страницы
window.onload = function () {
  initialCards.forEach(item => {
    addCard(item, cardContainer);
  });
  addListenerToCLosePopup();
  document.querySelector('.popup__opened-photo-container').addEventListener('click', (evt) => {
    evt.stopPropagation();
  });
  // обработчик событий для кнопки закрытия попапа с фотографией
  buttonClosePhoto.addEventListener('click', () => {
    closePopup(popupOpenPhoto);
  });
};


/*- 2. Функции показа ошибки и снятия ошибки -*/
const showInputError = (formElement, inputElement, errorMessage) => {
  // Находим элемент ошибки внутри самой функции, т.е. находим span, в котором будет отображаться сообщение об ошибке
  // исп-ся уникальный id инпута, чтобы находить любой спан в любой форме, где у инпута будет другой соотве-щий id
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__item_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__item_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

// функция очистки ошибок полей в попапе
const hideInputErrorInPopup = (popup) => {
  const formList = Array.from(popup.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__item'));
    inputList.forEach((inputElement) => {
      // очищать ошибки только в том случае, если польз-ль это поле так и оставил незаполненным
      if (inputElement.value === '') {
        hideInputError(formElement, inputElement)
      }
    });
  });
}

/*- 3. Функция, которая проверяет валидность поля -*/
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement);
  }
};

/*- 6. Блокировка кнопки отправки формы, если хоть одно поле невалидно -*/
// ф-ция проверки валидности ВСЕХ полей - принимает массив полей, собранных в форме
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true. Обход массива прекратится, и вся фунцкция hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  })
};

// функция изменения состояния кнопки с неактивного на активное
const toggleButtonInPopup = (popup, button) => {
  const formPopup = Array.from(popup.querySelectorAll('.popup__form'));
  formPopup.forEach((elemForm) => {
    const inputList = Array.from(elemForm.querySelectorAll('.popup__item'));
    inputList.forEach((elemInput) => {
      // проверять ошибки только в кейсах, произошедших после первичной загрузки страницы. 'load' - событие:
      // страница полностью загружена со всем окружением
      document.addEventListener('load', () => {
        isValid(elemForm, elemInput);
      });
    });
    if (!hasInvalidInput(inputList)) {
      button.classList.remove('popup__save-button_disabled');
      button.removeAttribute('disabled');
    } else {
      button.classList.add('popup__save-button_disabled');
      button.setAttribute('disabled', 'disabled');
    }
  });
}

// функция откртытия попапа общая
function openPopup(popup) {
  popup.classList.add('popup_opened');
  const button = popup.querySelector('.popup__save-button');
  toggleButtonInPopup(popup, button)
}

// функция закрытия попапа общая
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  hideInputErrorInPopup(popup);
}

// функция открытия попапа с изображением из карточки
function openPopupImage(card) {
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


// обработчик событий для кнопки открытия попапа добавления карточки
buttonAddCard.addEventListener('click', () => {
  openPopup(popupAddCard);
});

// обработчик событий для кнопки закрытия попапа редактирования профиля
buttonCloseEditProfile.addEventListener('click', () => {
  closePopup(popupEditProfile);
});

// обработчик событий для кнопки закрытия попапа добавления карточки
buttonCloseAddCard.addEventListener('click', () => {
  closePopup(popupAddCard);
});

// обработчик событий клавиши Esc для закрытия попапа редактирования профиля
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    document.querySelectorAll('.popup_opened').forEach(popupItem => {
      closePopup(popupItem);
    });
  }
});

// обработчик события клика мыши на оверлей для закрытия попапов
function addListenerToCLosePopup() {
  const popupList = document.querySelectorAll('.popup');
  popupList.forEach(popupListItem => {
    popupListItem.addEventListener('click', (evt) => {
      closePopup(evt.target);
      // отмена всплытия события до .popup, чтобы можно было воспользоваться формой в .popup__container
      evt.stopPropagation();
    });
  });
}

// 1.2 Поля формы. Отображение значений по умолчанию в полях формы редактирования профиля

// выбор имени пользователя и статуса на странице
const username = document.querySelector('.profile__username');
const userInfo = document.querySelector('.profile__user-info');

// обработчик событий для кнопки открытия попапа редактирования профиля
// + извлечение контента со страницы и заполнение им полей формы данного попапа
function openPopupEditProfile() {
  inputUsername.value = username.textContent;
  inputUserInfo.value = userInfo.textContent;
  openPopup(popupEditProfile);
}

buttonEditProfile.addEventListener('click', openPopupEditProfile);


// 1.3 Редактирование имени и информации о себе

// Функция обработчика «отправки» формы, хотя пока она никуда отправляться не будет
function submitFormEditProfile(evt) {
  //отмена стандартной отправки формы
  evt.preventDefault();

  // вставка новых значений с помощью textContent на страницу из полей формы, значения которых извлекаются с помощью value
  username.textContent = inputUsername.value;
  userInfo.textContent = inputUserInfo.value;

  // здесь же - вызов функции закрытия попапа, т.к. после нажатия на submit он в любом случае д.закрываться
  closePopup(popupEditProfile);
}

// Прикрепление обработчика к форме, который будет следить за событием “submit” - «отправка» + закрытие попапа (см. ф-цию выше)
formProfileElement.addEventListener('submit', submitFormEditProfile);

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
function addCard(card, cardContainer) {
  const cardElement = createCard(card);
  cardContainer.prepend(cardElement);
}

// обработчик события submit для формы добавления новой карточки
function submitFormAddCard(evt) {
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

// Прикрепление обработчика к форме, который будет следить за событием “submit” - «отправка» для добавления карточки
formAddCardElement.addEventListener('submit', submitFormAddCard);

/** Валидация полей **/
/*- 1. Найти элементы -*/
// форма найдена выше: formProfileElement
// input формы наайден: inputUsername


formProfileElement.addEventListener('submit', function (evt) {
  // Отменим стандартное поведение по сабмиту
  evt.preventDefault();
});

const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add('popup__save-button_disabled');
    buttonElement.setAttribute('disabled', 'disabled');
    //buttonElement.setAttribute('disabled', true);
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove('popup__save-button_disabled');
    buttonElement.removeAttribute('disabled');
  }
  // далее вызывем ф-цию внутри обработчика события input (внутри ф-ции setEventListeners), т.к.
  // нужно сверять состояние кнопки при каждом изменении полей формы
};

/*- 4. обработчики событий на все input в форме -*/
// вместо одного обработчика на первый поп порядку инпут в DOM -
// inputUsername.addEventListener('input', isValid); -
// нужно сделать ф-цию setEventListener, которая примет параметром элемент формы и добавит её полям нужные обработчики:
const setEventListeners = (formElement) => {
  // Находим все поля внутри формы, сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll('.popup__item'));
  // (6.) Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector('.popup__save-button');
  // (6.) Вызовем toggleButtonState, чтобы кнопка была неактивна при первой загрузке формы, до начала к-либо ввода данных
  toggleButtonState(inputList, buttonElement);

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid, передав ей форму и проверяемый элемент
      isValid(formElement, inputElement)
      // (6.)
      toggleButtonState(inputList, buttonElement)
    });
  });
};

/*- 5. обработчики событий на все формы на странице -*/
// найти и перебрать все формы на странице
const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });
    // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
    setEventListeners(formElement);
  });
};

// Вызовем функцию
enableValidation();
