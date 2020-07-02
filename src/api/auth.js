import { API_HOST, TOKEN } from "../utils/constants";
import jwtDecode from "jwt-decode";

export function signUpApi(user) {
  const url = `${API_HOST}/register`;
  const userDto = {
    ...user,
    email: user.email.toLowerCase(),
    birthDate: new Date(),
  };
  delete userDto.repeatPassword;

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userDto),
  };

  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json;
      }

      return { code: 404, message: "Invalid email" };
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
}

export function signInApi(user) {
  const url = `${API_HOST}/login`;

  const data = {
    ...user,
    email: user.email.toLowerCase(),
  };

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
      return { message: "Invalid credentials" };
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
}

export function setTokenApi(token) {
  localStorage.setItem(TOKEN, token);
}

export function getTokenApi() {
  return localStorage.getItem(TOKEN);
}

export function logOutApi() {
  localStorage.removeItem(TOKEN);
}

export function isUserLoggedIn() {
  const token = getTokenApi();

  if (!token) {
    logOutApi();
    return null;
  }

  if (isExpired(token)) {
    logOutApi();
  }

  return jwtDecode(token);
}

function isExpired(token) {
  const { exp } = jwtDecode(token);
  const expired = exp * 1000;
  const result = expired - Date.now();
  return result <= 0;
}
