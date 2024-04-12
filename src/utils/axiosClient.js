import axios from "axios";
import store from "../redux/store";
import {
  getItem,
  KEY_ACCESS_TOKEN,
  removeItem,
  setItem,
} from "./localStorageManager";
import { setLoading, showToast } from "../redux/slices/appConfigSlice";
import { TOAST_FAILURE } from "../App";

let baseURL = "http://localhost:4000/";
if (process.env.NODE_ENV === "production") {
  baseURL = process.env.REACT_APP_SERVER_BASE_URL;
}

export const axiosClient = axios.create({
  baseURL,
  withCredentials: true,
});

axiosClient.interceptors.request.use((request) => {
  const accessToken = getItem(KEY_ACCESS_TOKEN);
  request.headers["Authorization"] = `Bearer ${accessToken}`;
  store.dispatch(setLoading(true));
  return request;
});

axiosClient.interceptors.response.use(
  async (response) => {
    store.dispatch(setLoading(false));
    const data = response.data;
    if (data.status === "OK") return data;

    const originalRequest = response.config;
    const statusCode = data.statusCode;
    const error = data.message;

    store.dispatch(
      showToast({
        type: TOAST_FAILURE,
        message: error,
      })
    );
    //!originalRequest._retry -> This is usually done to avoid an infinite loop in case the request fails again after refreshing the token.
    if (statusCode === 401 && !originalRequest._retry) {
      // means the access token has expired
      originalRequest._retry = true;

      const response = await axios
        .create({
          withCredentials: true,
        })
        .get(`${process.env.REACT_APP_SERVER_BASE_URL}auth/refresh`);

      if (response.data.status === "OK") {
        setItem(KEY_ACCESS_TOKEN, response.data.result.accessToken);
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${response.data.result.accessToken}`;
        return axios(originalRequest);
      } else {
        // when refresh token expires. send user to login page
        removeItem(KEY_ACCESS_TOKEN);
        window.location.replace("/login", "_self");
        return Promise.reject(error);
      }
    }
    console.log(error);
    return Promise.reject(error);
  },
  async (error) => {
    store.dispatch(setLoading(false));
    store.dispatch(
      showToast({
        type: TOAST_FAILURE,
        message: error.message,
      })
    );
    return Promise.reject(error);
  }
);
