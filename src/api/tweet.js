import { API_HOST } from "../utils/constants";
import { getTokenApi } from "./auth";
import axios from "axios";

export const createTweetApi = async (message) => {
  try {
    const config = {
      method: "POST",
      url: `${API_HOST}/tweet`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getTokenApi()}`,
      },
      data: JSON.stringify({ message }),
    };
    var response = await axios(config);
    return response.status === 201;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getTweetsApi = async (userId, page) => {
  try {
    const config = {
      method: "GET",
      url: `${API_HOST}/tweet?id=${userId}&page=${page}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getTokenApi()}`,
      },
    };
    var response = await axios(config);
    return response.data;
  } catch (e) {
    console.log(e);
    return Error("Failed to fetch tweets");
  }
};

export const getTweetsFollowersApi = async (page = 1) => {
  try {
    const config = {
      method: "GET",
      url: `${API_HOST}/tweets?page=${page}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getTokenApi()}`,
      },
    };
    var response = await axios(config);
    return response.data;
  } catch (e) {
    console.log(e);
    throw Error("Failed to fetch follower's tweets");
  }
};
