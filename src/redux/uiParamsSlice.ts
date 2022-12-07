import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface StateModel {
    username: string;
}

const initialState: StateModel = {
    username: ""
};

export const uiParamsSlice = createSlice({
    name: "uiParams",
    initialState,
    reducers: {
        setUsername: (state, action: { payload: string }) => {
            state.username = action.payload;
        },
    },
});

export const {
    setUsername,
} = uiParamsSlice.actions;

export const uiParamsSelector = (state: RootState) => state.uiParams;

export default uiParamsSlice.reducer;
