//export const BASE_URL = 'https://auth.nomoreparties.co';
//
//const getJSON = (res) => {
//  if (res.ok) {
//    return res.json();
//  }
//  console.log(`Ошибка: ${res.status}`);
//};
//
//export const register = ( {password, email} ) => {
//  return fetch(`${BASE_URL}/signup`, {
//    method: 'POST',
//    headers: {
//      'Content-Type': 'application/json'
//    },
//    body: JSON.stringify({password, email})
//  })
//  .then(res => getJSON(res));
//};
//
//export const authorize = ( {password, email} ) => {
//  return fetch(`${BASE_URL}/signin`, {
//    method: 'POST',
//    headers: {
//      'Content-Type': 'application/json'
//    },
//    body: JSON.stringify( {password, email} )
//  })
//  .then(res => getJSON(res));
//};
//
//export const getContent = (token) => {
//  return fetch(`${BASE_URL}/users/me`, {
//    method: 'GET',
//    headers: {
//      'Content-Type': 'application/json',
//      'Authorization': `Bearer ${token}`,
//    }
//  })
//  .then(res => getJSON(res));
//}



class Auth {
  constructor(options) {
    this._baseUrl = options.baseUrl;

    this._getJSON = function(res) {
      if (res.ok) {
        return res.json();
      }
      console.log(`Ошибка: ${res.status}`);
    }
  }

  registration({password, email}) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({password, email})
    })
    .then(res => this._getJSON(res));
  };

  authorization({password, email}) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( {password, email} )
    })
    .then(res => this._getJSON(res));
  };
  
  GetContent(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(res => this._getJSON(res));
  }
};

export const auth = new Auth({
  baseUrl: 'https://auth.nomoreparties.co'
});