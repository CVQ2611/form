import { axiosCreate } from "./axios";

export const upDateDataUser = async (newUser, id) => {
    const response = await axiosCreate.put(`users/${id}`, newUser);
    return response;
}