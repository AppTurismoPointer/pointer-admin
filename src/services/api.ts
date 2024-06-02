import axios from "axios";

const api = axios.create({
  baseURL: "https://pointer-api-wew4.onrender.com/admin",
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
    if (error?.response?.status === 401) {
      return (window.location.href = "/logout");
    }

    return Promise.reject(error?.response?.data?.message ?? undefined);
  }
);

export { api };
