import axios from "axios";
console.log(process.env.REACT_APP_API_URL)
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // loads from .env
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
