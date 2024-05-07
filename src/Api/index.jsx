import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

const Api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

Api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (401 === error.response.status) {
      Cookies.remove("token");
      Cookies.remove("user");
      Cookies.remove("permissions");
      window.location = "/";
    } else if (403 === error.response.status) {
      // Menampilkan pesan dengan React Hot Toast
      toast.error("Anda tidak memiliki izin untuk mengakses halaman ini", {
        position: "top-center",
        duration: 4000,
      });
      // Atau, arahkan ke halaman tertentu
      window.location = "/Forbidden";
    } else {
      return Promise.reject(error);
    }
  }
);

export default Api;
