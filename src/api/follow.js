import { API_HOST } from "../utils/constants";
import { getTokenApi } from "./auth";
import axios from "axios";

export function getFollowApi(idUser) {
  const url = `${API_HOST}/follow?id=${idUser}`;

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

export function createFollowApi(idUser) {
  const url = `${API_HOST}/follow?id=${idUser}`;

  const params = {
    method: "POST",
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

export const deleteFollowApi = async (idUser) => {
  try {
    const url = `${API_HOST}/follow?id=${idUser}`;

    const params = {
      mode: "no-cors",
      method: "DEL",
      headers: {
        Authorization: `Bearer ${getTokenApi()}`,
      },
    };
    var response = await axios.delete(url, params);
    return response.status === 200;
  } catch (e) {
    console.log(e);
    return false;
  }
};
