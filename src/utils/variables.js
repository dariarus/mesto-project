const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__input-error_active'
}

const userSelectors = {
  'name': '.profile__username',
  'about': '.profile__user-info',
  'avatar': '.profile__avatar'
}

export {validationConfig, userSelectors};
