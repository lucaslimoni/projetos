import axios from "axios";
// const api = "http://192.168.15.17:3333/";
const api = axios.create({
  // baseURL: "http://192.168.15.17:3333/",
  baseURL: "http://api.baggins.ml/",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin": "*",
  },
});

export const apiRecSys = axios.create({
  // baseURL: "http://192.168.15.17:3333/",
  baseURL: "http://recsys.baggins.ml",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin": "*",
  },
});

export default api;
