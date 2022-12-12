import { axiosCreate } from "./axios";

export const deleteUserById = async (id) => {
    let response = [];
    try {
        response = await axiosCreate.delete(`users/${id}`);
        return response.data;
    } catch (error) {
        return response;
    }
}
