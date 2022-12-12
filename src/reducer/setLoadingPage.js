import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    autoLoad: true,
}

export const setAutoLoadingSlice = createSlice({
    name: 'setAutoLoading',
    initialState,
    reducers: {
        SET_AUTOLOAD: (state) => {
            state.autoLoad = !state.autoLoad
        }
    }
})


export default setAutoLoadingSlice.reducer;
