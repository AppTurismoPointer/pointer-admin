import axios from "axios";

const api = axios.create({
  baseURL: "https://pointer-api.onrender.com/admin",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return error;
  }
);

export { api };
