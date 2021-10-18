class UserInfo {
  constructor(userSelectors) {
    this._userNameSelector = document.querySelector(userSelectors.name);
    this._aboutUserSelector = document.querySelector(userSelectors.about);
  }

  getUserInfo(getUserByApi) {
    this._user = getUserByApi;
    return this._user;
  }

  setUserInfo(getUserByApi) {
    this._user = this.getUserInfo(getUserByApi);
    this._userNameSelector.textContent = this._user.name;
    this._aboutUserSelector.textContent = this._user.about;
  }
}
