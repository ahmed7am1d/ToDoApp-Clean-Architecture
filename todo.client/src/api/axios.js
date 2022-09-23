import axios from 'axios';
import ApiConstants from '../constants/ApiConstants';
export default axios.create({
    baseURL: ApiConstants.API_BASE_URL,
});