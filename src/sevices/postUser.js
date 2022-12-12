import { axiosCreate } from "./axios";

export const createUser = async (newUser) => {
    const response = await axiosCreate.post('users', newUser);
    return response;
}