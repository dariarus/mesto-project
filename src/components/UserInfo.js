export default class UserInfo {
  constructor(userSelectors) {
    this._userName = document.querySelector(userSelectors.name);
    this._aboutUser = document.querySelector(userSelectors.about);
    this._avatarUser = document.querySelector(userSelectors.avatar);
    this._id = null;
  }

  setUserAvatar(newAvatar) {
    this._avatarUser.src = newAvatar;
  }

  setUserInfo(user) {
    this._userName.textContent = user.name;
    this._aboutUser.textContent = user.about;
    this._avatarUser.src = user.avatar;
    this._id = user._id;
  }

  //для инпутов попапа редактирования профиля
  getUserInfo() {
    return {
      'name': this._userName.textContent,
      'about': this._aboutUser.textContent
    };
  }
}
