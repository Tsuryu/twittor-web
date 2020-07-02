import { API_HOST } from "../utils/constants";
import { getTokenApi } from "./auth";

export function getUserApi(id) {
  const url = `${API_HOST}/profile?id=${id}`;
  const params = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer${getTokenApi()}`,
    },
  };

  return fetch(url, params)
    .then((response) => {
      // eslint-disable-next-line no-throw-literal
      if (response.status >= 400) throw null;
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
}

export function uploadBannerApi(file) {
  try {
    const url = `${API_HOST}/banner`;

    const formData = new FormData();
    formData.append("banner", file[0]);

    const params = {
      method: "POST",
      headers: {
        Authorization: `Bearer${getTokenApi()}`,
      },
      body: formData,
    };

    return fetch(url, params)
      .then((response) => {
        // eslint-disable-next-line no-throw-literal
        if (response.status >= 400) throw null;
        return response.text();
      })
      .then((data) => {
        return data ? JSON.parse(data) : {};
      })
      .catch((error) => {
        return error;
      });
  } catch (e) {
    console.log(e);
  }
}

export function uploadAvatarApi(file) {
  const url = `${API_HOST}/avatar`;

  const formData = new FormData();
  formData.append("avatar", file[0]);

  const params = {
    method: "POST",
    headers: {
      Authorization: `Bearer${getTokenApi()}`,
    },
    body: formData,
  };

  return fetch(url, params)
    .then((response) => {
      // eslint-disable-next-line no-throw-literal
      if (response.status >= 400) throw null;
      return response.text();
    })
    .then((data) => {
      return data ? JSON.parse(data) : {};
    })
    .catch((error) => {
      return error;
    });
}

export function updateUserApi(data) {
  const url = `${API_HOST}/profile`;

  const params = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getTokenApi()}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(url, params)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}

export function getUsersApi(paramsUrl) {
  const { page, type, search = "" } = paramsUrl;
  const url = `${API_HOST}/profiles?page=${page}&type=${type}&search=${search}`;

  const params = {
    headers: {
      Authorization: `Bearer ${getTokenApi()}`,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      return data ? JSON.parse(data) : {};
    })
    .catch((error) => {
      return error;
    });
}
