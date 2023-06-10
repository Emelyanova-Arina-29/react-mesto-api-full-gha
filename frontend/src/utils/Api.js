import { personalData } from './constants.js';

class Api {
  constructor(data) {
    this._url = data.url;
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
      headers: {
        'authorization': `Bearer ${localStorage.getItem("jwt")}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => this._handleResponse(res))
  }

  /* Добавление новой карточки */

  createCard(data) {
    return fetch(`${this._url}/cards`, {
      headers: {
        'authorization': `Bearer ${localStorage.getItem("jwt")}`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ name: data.name, link: data.link })
    })
      .then(res => this._handleResponse(res))
  }

  /* Удаление карточки */

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      headers: {
        'authorization': `Bearer ${localStorage.getItem("jwt")}`,
        'Content-Type': 'application/json'
      },
      method: 'DELETE',
    })
      .then(res => this._handleResponse(res))
  }

  /* Добавление лайка карточке */

  addLikeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      headers: {
        'authorization': `Bearer ${localStorage.getItem("jwt")}`,
        'Content-Type': 'application/json'
      },
      method: 'PUT',
    })
      .then(res => this._handleResponse(res))
  }

  /* Убрать лайк с карточки */

  deleteLikeCard(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      headers: {
        'authorization': `Bearer ${localStorage.getItem("jwt")}`,
        'Content-Type': 'application/json'
      },
      method: 'DELETE',
    })
      .then(res => this._handleResponse(res))
  }

  /* Загрузка информации о пользователе */

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
    })
      .then(res => this._handleResponse(res))
  }

  /* Редактирование профиля */

  editUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      headers: {
        'authorization': `Bearer ${localStorage.getItem("jwt")}`,
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({
				name: data.name,
				about: data.about
			})
    })
      .then(res => this._handleResponse(res))
  }
  
  /* Изменение аватара пользователя */

  editUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      headers: {
        'authorization': `Bearer ${localStorage.getItem("jwt")}`,
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({ avatar: data.avatar })
    })
      .then(res => this._handleResponse(res))
  }
}

/* Подключение Api */

const api = new Api(personalData);

export default api;