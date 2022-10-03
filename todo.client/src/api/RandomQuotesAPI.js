import axios from "./ToDoAPI";
import ApiConstants from "../constants/ApiConstants";
export default axios.create({
    baseURL: ApiConstants.QUOTES_API_BASE_URL
});