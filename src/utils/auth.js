export const BASE_URL = 'https://auth.nomoreparties.co';

const getJSON = (res) => {
  if (res.ok) {
    return res.json();
  }
  console.log(`Ошибка: ${res.status}`);
};

export const register = ( {password, email} ) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then(res => getJSON(res));
};

export const authorize = ( {password, email} ) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( {password, email} )
  })
  .then(res => getJSON(res));
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => getJSON(res));
}