// apiService.js

import axios from "axios";
import API from "../services/requestMethods";
const api = axios.create({
  baseURL: API.LOGIN,
});

// Hàm này sẽ thêm token vào header nếu token tồn tại
const setAuthToken = (token: any) => {
  console.log(`Bearer ${token}`);
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export { api, setAuthToken };
