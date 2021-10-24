export default class UserInfo {
  constructor(userSelectors) {
    this._userName = document.querySelector(userSelectors.name);
    this._aboutUser = document.querySelector(userSelectors.about);
    this._avatarUser = document.querySelector(userSelectors.avatar);
  }

  getUserInfo(user) {
    this._userName.textContent = user.name;
    this._aboutUser.textContent = user.about; 
    this._avatarUser.src = user.avatar;

    return {
      'name': user.name,
      'about': user.about,
      'avatar': user.avatar,
      'id': user._id
    }
  }

  setUserAvatar(newAvatar) {
    this._avatarUserSelector.src = newAvatar; 
  }

  getUserId() {
    return this._user._id;
  }

  setUserInfo() {
    return {
      'name': this._userName.textContent,
      'about': this._aboutUser.textContent
    };
  }
}
