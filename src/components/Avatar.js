export default class Avatar {
  constructor(user) {
    this._avatar = user.avatar;
  }

    setAvatar() {
      this._imageAvatar = document.querySelector('.profile__avatar');
      this._imageAvatar.src = this._avatar;
    }
}
