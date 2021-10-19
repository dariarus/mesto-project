export default class Api {
  constructor(options) {
    this._options = options;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

// GET - запрос по умолчанию (указывать не нужно), не имеет тела
   getCards() {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: this._options.headers
    })
      .then(res => this._getResponseData(res));
  }

  createNewCard(newName, newLink) {
    return fetch(`${this._options.baseUrl}/cards`, {
      method: 'POST',
      headers: this._options.headers,
      body: JSON.stringify({
        name: newName,
        link: newLink
      })
    })
      .then(res => this._getResponseData(res));
  }

  getUser() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: this._options.headers
    })
      .then(res => this._getResponseData(res));
  }

  saveProfile(newName, newAbout) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        name: newName,
        about: newAbout
      })
    })
      .then(res => this._getResponseData(res));
  }

  deleteCard(id) {
    return fetch(`${this._options.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._options.headers
    })
  }

  putLike(id) {
    return fetch(`${this._options.baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this._options.headers
    })
      .then(res => this._getResponseData(res));
  }

  deleteLike(id) {
    return fetch(`${this._options.baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._options.headers
    })
      .then(res => this._getResponseData(res));
  }

  updateAvatarUrl(url) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        avatar: url
      })
    })
      .then(res => this._getResponseData(res));
  }
}
