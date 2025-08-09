import { configureStore } from "@reduxjs/toolkit";
import type { UserInfo } from "../models";
import type { ToastState } from "./states/toast";
import  userSliceReducer  from "./states/user";
import  toastSliceReducer  from "./states/toast";


export interface AppStore {
    user: UserInfo ;
    toast: ToastState;
}

export default configureStore<AppStore>({
    reducer: {
        user: userSliceReducer,
        toast: toastSliceReducer
    }
});