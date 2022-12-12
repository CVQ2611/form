import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUser } from "../sevices/getUser";

const initialState = {
    isLoading: 'idle',
    listDataUsers: [],
}

export const getDataReducerSlice = createSlice({
    name: 'getDataReducer',
    initialState,
    extraReducers: builder => {
        builder.addCase(getDataToReduce.pending, (state) => {
            state.isLoading = 'pendding';
        }).addCase(getDataToReduce.fulfilled, (state, action) => {
            state.listDataUsers = action.payload;
            state.isLoading = 'idle';
        })
    }
})

// api with redux get users list
export const getDataToReduce = createAsyncThunk('FEATCH_USERS', async () => {
    const res = await getUser();
    return res.items;
})


export default getDataReducerSlice.reducer