import { axiosCreate } from "./axios";

export const getUser = async () => {
    const response = await axiosCreate.get('users');
    return response.data;
}

export const getUserById = async (id) => {
    const response = await axiosCreate.get(`users/${id}`);
    return response.data;
}
