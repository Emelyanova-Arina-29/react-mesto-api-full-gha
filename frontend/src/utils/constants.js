/* Объект, состоящий из свойств, значениями которых являются классы, необходимые для универсального написания кода валидации */

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

export const personalData = {
  url:'https://mesto.nomoreparties.co/v1/cohort-60',
  headers: {
    authorization: 'f1580dcf-100f-4c1e-a333-5ef7b032595f',
    'Content-Type': 'application/json'
  }
}
