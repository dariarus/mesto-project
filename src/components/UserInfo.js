export default class UserInfo {
  constructor(userSelectors) {
    this._userNameSelector = document.querySelector(userSelectors.name);
    this._aboutUserSelector = document.querySelector(userSelectors.about);
  }

  setUserInfo(user) {
    this._userNameSelector.textContent = user.name;
    this._aboutUserSelector.textContent = user.about;
  }

  getUserInfo() {
    this._user = {};
    this._user.name = this._userNameSelector.textContent;
    this._user.about = this._aboutUserSelector.textContent;

    return this._user;
  }
}
