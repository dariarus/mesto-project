import Popup from "./Popup";


export default class PopupWithImage extends Popup {
  constructor( popupElement) {
    super( popupElement);
    this._imagePopup = this.popupElement.querySelector('.popup__opened-image');
    this._signatureImage = this.popupElement.querySelector('.popup__image-signature');

  }

  open(data) {
    super.open();

    this._imagePopup.src = data.link;
    this._signatureImage.textContent = data.name;
  }
}
