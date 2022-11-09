import axios from "axios";
import ApiConstants from "../constants/ApiConstants";

export default axios.create({
  baseURL: ApiConstants.TODO_API_BASE_URL,
  //allowing to send the cookie with every request made with axios
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: ApiConstants.TODO_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  //allowing to send the cookie with every request made with axios
  withCredentials: true,
});
