import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserById } from "../sevices/getUser";

const initialState = {
    isLoading: 'idle',
    dataUserDetail: [],
}

export const getDataReducerByIDSlice = createSlice({
    name: 'getDataReducerId',
    initialState,
    extraReducers: builder => {
        builder.addCase(getDataToReduceByID.pending, (state) => {
            state.isLoading = 'pendding';
        }).addCase(getDataToReduceByID.fulfilled, (state, action) => {
            state.isLoading = 'idle';
            state.dataUserDetail = action.payload;
        })
    }
})

export const getDataToReduceByID = createAsyncThunk('FEATCH_USERS_ID', async (id) => {
    const res = await getUserById(id);
    return res;
})

export default getDataReducerByIDSlice.reducer