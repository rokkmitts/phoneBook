"use strict";
import axios from "axios";

const serverUrl = "http://localhost:3001/phoneBook";

const getServerData = () => {
  const request = axios.get(serverUrl);
  return request.then((response) => {
    return response.data;
  });
};

const addItemToServer = (newObj) => {
  const request = axios.post(serverUrl, newObj);
  return request.then((response) => {
    return response.data;
  });
};

const construct = (id, newObj) => {
  const request = axios.put(`${serverUrl}/${id}`, newObj);
  return request.then((response) => {
    return response.data;
  });
};

const deletion = (item) => {
  const request = axios.delete(`${serverUrl}/${item.id}`);
  return request.then((response) => {
    return response.data;
  });
};

export default {
  getServerData,
  addItemToServer,
  construct,
  deletion,
};
