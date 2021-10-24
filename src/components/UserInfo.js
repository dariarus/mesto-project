export default class UserInfo {
  constructor(user) {
    this._user = user;

    const userSelectors = {
      'name': '.profile__username',
      'about': '.profile__user-info',
      'avatar': '.profile__avatar'
    }

    this._userNameSelector = document.querySelector(userSelectors.name);
    this._aboutUserSelector = document.querySelector(userSelectors.about);
    this._avatarUserSelector = document.querySelector(userSelectors.avatar);
  }

  getUserInfo() {
    this._userNameSelector.textContent = this._user.name;
    this._aboutUserSelector.textContent = this._user.about; 
  }

  getUserAvatar() {
    this._avatarUserSelector.src = this._user.avatar;
  }

  getUserId() {
    return this._user._id;
  }

  setUserInfo() {
    this._user = {};
    this._user.name = this._userNameSelector.textContent;
    this._user.about = this._aboutUserSelector.textContent;

    return this._user;
  }
}
