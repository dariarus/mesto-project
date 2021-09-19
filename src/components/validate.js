import {toggleButtonState} from "./utils.js";

/** Валидация полей **/
/*- 1. Найти элементы -*/

/*- 2. Функции показа ошибки и снятия ошибки -*/
const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass, errorClass}) => {
  // Находим элемент ошибки внутри самой функции, т.е. находим span, в котором будет отображаться сообщение об ошибке
  // исп-ся уникальный id инпута, чтобы находить любой спан в любой форме, где у инпута будет другой соотве-щий id
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, {inputErrorClass, errorClass}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

// функция очистки ошибок полей в попапе
export const hideInputErrorInPopup = (popup, formInPopup, inputPopup, inputErrorClass, errorClass) => {
  const formList = Array.from(popup.querySelectorAll(formInPopup));
  formList.forEach((formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(inputPopup));
    inputList.forEach((inputElement) => {
      // очищать ошибки только в том случае, если польз-ль это поле так и оставил незаполненным
      if (inputElement.value === '' || (inputElement.value !== '' && inputElement.validity.valid)) {
        hideInputError(formElement, inputElement, {inputErrorClass, errorClass})
      }
    });
  });
}

/*- 3. Функция, которая проверяет валидность поля и выдает или скрывает ошибки -*/
const validateInput = (formElement, inputElement, {...rest}) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage, rest);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement, rest);
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

// функция изменения состояния кнопки с неактивного на активное общая
export const toggleButtonInPopup = (popup, button, formInPopup, inputPopup, inactiveButtonClass) => {
  const formPopup = Array.from(popup.querySelectorAll(formInPopup));
  formPopup.forEach((elemForm) => {
    const inputList = Array.from(elemForm.querySelectorAll(inputPopup));
    inputList.forEach((elemInput) => {
      // проверять ошибки только в кейсах, произошедших после первичной загрузки страницы. 'load' - событие:
      // страница полностью загружена со всем окружением
      document.addEventListener('load', () => {
        validateInput(elemForm, elemInput);
      });
    });
    validateAndToggleButtonState(inputList, button, inactiveButtonClass);
  });
  // то же, что validateAndToggleButtonState(inputList, button)
  //  // if (!hasInvalidInput(inputList)) {
  //     button.classList.remove('popup__save-button_disabled');
  //     button.removeAttribute('disabled');
  //   } else {
  //     button.classList.add('popup__save-button_disabled');
  //     button.setAttribute('disabled', 'disabled');
  //   }
  // });
}

// функция изменения состояния кнопки
const validateAndToggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  const buttonIsActive = !hasInvalidInput(inputList)
  toggleButtonState(buttonElement, inactiveButtonClass, buttonIsActive)
};

/*- 4. обработчики событий на все input в форме -*/
// вместо одного обработчика на первый поп порядку инпут в DOM -
// inputUsername.addEventListener('input', validateInput); -
// нужно сделать ф-цию setEventListener, которая примет параметром элемент формы и добавит её полям нужные обработчики:
const setEventListeners = (formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, ...rest}) => {
  // Находим все поля внутри формы, сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  // (6.) Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector(submitButtonSelector);
  // (6.) Вызовем validateAndToggleButtonState, чтобы кнопка была неактивна при первой загрузке формы, до начала к-либо ввода данных
  validateAndToggleButtonState(inputList, buttonElement, inactiveButtonClass);

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем validateInput, передав ей форму и проверяемый элемент
      validateInput(formElement, inputElement, rest)
      // (6.)
      validateAndToggleButtonState(inputList, buttonElement, inactiveButtonClass)
    });
  });
};

/*- 5. обработчики событий на все формы на странице -*/
// найти и перебрать все формы на странице
export const enableValidation = ({formSelector, ...rest}) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(formSelector));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });
    // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
    setEventListeners(formElement, rest);
  });
};

// Вызовем функцию enableValidation() в window.onload в index.js
