import {
    configureStore,
    ThunkAction,
    Action,
} from "@reduxjs/toolkit";
import uiParamsReducer from "./uiParamsSlice";

export const store = configureStore({
    reducer: {
        uiParams: uiParamsReducer
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
