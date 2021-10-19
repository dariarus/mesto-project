export default class Avatar {
  constructor(user) {
    this._avatar = user.avatar;
  }

  _initImageAvatar() {
    const buttonEditAvatar = document.querySelector('.profile__edit-avatar-button');

    this._imageAvatar.addEventListener('mouseenter', () => {
      buttonEditAvatar.classList.add('profile__edit-avatar-button_active');
    });
    buttonEditAvatar.addEventListener('mouseleave', () => {
      buttonEditAvatar.classList.remove('profile__edit-avatar-button_active');
    });
  }

    setAvatar() {
      this._imageAvatar = document.querySelector('.profile__avatar');
      this._imageAvatar.src = this._avatar;
      this._initImageAvatar();
    }
}
