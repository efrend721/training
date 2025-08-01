import { configureStore } from "@reduxjs/toolkit";
import type { UserInfo } from "../models";
import  userSliceReducer  from "./states/user";


export interface AppStore {
    user: UserInfo ;
}

export default configureStore<AppStore>({
    reducer: {
        user: userSliceReducer
    }
});