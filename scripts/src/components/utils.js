// функция изменения состояния кнопки (любой)
export const toggleButtonState = (buttonElement, inactiveButtonClass, setActive) => {
  // setActive - подставляется условие "активна ли кнопка ? true : false". Можно подставить в т.ч. "inputElement.validity.valid"
  // это buttonIsActive в validate.js
  if (setActive) {
    // сделай кнопку активной
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  } else {
    // иначе сделай кнопку неактивной
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'disabled');
  }
  // далее вызывем ф-цию внутри обработчика события input (внутри ф-ции setEventListeners), т.к.
  // нужно сверять состояние кнопки при каждом изменении полей формы
};
