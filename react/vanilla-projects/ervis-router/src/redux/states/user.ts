import { createSlice } from "@reduxjs/toolkit";
import type { UserInfo } from "../../models";

export const EmpyUserState: UserInfo = {
    id: 0,
    name: "",
    email: ""
};

export const persistLocalStorage = <T> (key: string , value: T) => {
    localStorage.setItem(key, JSON.stringify({... value}));
};

export const clearLocalStorage = (key: string) => {
    localStorage.removeItem(key);
};

const UserKey = "user";

export const userSlice = createSlice({
  name: "user",
  initialState: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) :  EmpyUserState,
  
  reducers:{
    createUser: (_state, action) => { 
      persistLocalStorage(UserKey, action.payload); 
      return action.payload; 
    },
    updateUser: (state, action) => { 
      const result = {...state, ...action.payload};
      persistLocalStorage<UserInfo>(UserKey, result); 
      return result; 
    },
    resetUser: () => {
      clearLocalStorage(UserKey);
      return EmpyUserState;
    }
  }
});

export const { createUser, updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;

