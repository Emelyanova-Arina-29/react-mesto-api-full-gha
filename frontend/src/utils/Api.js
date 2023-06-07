import { personalData } from './constants.js';

class Api {
  constructor(data) {
    this._url = data.url;
    this._headers = data.headers;
  }

  /* Обработка ответа сервера */

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Произошла ошибка: ${res.status}`);
    }
  }

  /* Загрузка карточек с сервера */

  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
      .then(this._handleResponse)
  }

  /* Добавление новой карточки */

  createCard(data) {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({ name: data.name, link: data.link })
    })
      .then(this._handleResponse)
  }

  /* Удаление карточки */

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      headers: this._headers,
      method: 'DELETE',
    })
      .then(this._handleResponse)
  }

  /* Добавление лайка карточке */

  addLikeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      headers: this._headers,
      method: 'PUT',
    })
      .then(this._handleResponse)
  }

  /* Убрать лайк с карточки */

  deleteLikeCard(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      headers: this._headers,
      method: 'DELETE',
    })
      .then(this._handleResponse)
  }

  /* Загрузка информации о пользователе */

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
      .then(this._handleResponse)
  }

  /* Редактирование профиля */

  editUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
				name: data.name,
				about: data.about
			})
    })
      .then(this._handleResponse)
  }
  
  /* Изменение аватара пользователя */

  editUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({ avatar: data.avatar })
    })
      .then(this._handleResponse)
  }
}

/* Подключение Api */

const api = new Api(personalData);

export default api;