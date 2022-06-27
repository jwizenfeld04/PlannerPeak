import axios from "axios";

export const API_URL = 'https://plannerpeak.herokuapp.com/api/';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json",
    CORS_ALLOW_ALL_ORIGINS: true,
    "Access-Control-Allow-Origin": "*",
  },
});



// Gets accesstoken before request is sent to REST API
// Attempted to get token from async storage but that took to slow during auth proccess
// Switched to injecting redux store to component in App.js and then accessing state from here

let store;

export const injectStore = (_store) => {
  store = _store;
};

api.interceptors.request.use(async (config) => {
  const token = store.getState().user.accesstoken;
  config.headers.Authorization = token ? `Token ${token}` : "";

  return config;
});


export default api;

// 'https://plannerpeak.herokuapp.com/api/'
// 'http://192.168.86.44:8000/api/'
// 'http://192.168.1.27:8000/api/'
