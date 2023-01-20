import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../context/store/auth";

// const baseURL = "https://my-json-server.typicode.com/saif-kh/json-server/users";
export const baseURL = "http://192.168.1.2:8080/";

const api = (email = "", password = "", contentType = "application/json") => {
  const headers = {
    "Content-Type": contentType,
  };
  if (email !== "" && password !== "")
    headers["Authorization"] = "Basic " + window.btoa(email + ":" + password);
  // const token = localStorage.getItem("token");
  // if (token) {
  //   headers["Authorization"] = `Bearer ${token}`;
  // }
  return axios.create({
    baseURL,
    headers,
  });
};

export default api;
