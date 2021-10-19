import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(data) {
    super.open();
    this._popupElement.querySelector('.popup__opened-image').src = data.link;
    this._popupElement.querySelector('.popup__image-signature').textContent = data.name;
  }
}
