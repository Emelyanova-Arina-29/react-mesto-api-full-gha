export const BASE_URL = 'https://api.mesto.arina.nomoredomains.rocks';

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Произошла ошибка: ${res.status}`);
  }
}

const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    headers: { 
      "Content-Type": "application/json",
    },
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
    .then(handleResponse)
}

const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    headers: { "Content-Type": "application/json" },
    method: 'POST',
    body: JSON.stringify({ email, password })
  })
    .then(handleResponse)
}

const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    },
    method: 'GET',
  })
    .then(handleResponse)
}

export { register, login, checkToken };