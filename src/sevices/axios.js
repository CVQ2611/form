import axios from "axios";

export const axiosCreate = axios.create({
    baseURL: process.env.REACT_APP_REDUX_HOOKFORM_BASE_API_URL,
});