import axios from "axios";

export const API_URL = 'http://192.168.1.23:8000/api/';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json",
    "CORS_ALLOW_ALL_ORIGINS": true,
    "Access-Control-Allow-Origin": "*",
  },
});

export default api;

// 'https://plannerpeak.herokuapp.com/api/'
