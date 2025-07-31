import { createSlice } from "@reduxjs/toolkit";
import type { UserInfo } from "../../models";

export const EmpyUserState: UserInfo = {
    id: 0,
    name: "",
    email: ""
};

export const userSlice = createSlice({
  name: "user",
  initialState: EmpyUserState,
  reducers:{
    createUser: (_state, action) => action.payload,
    updateUser: (state, action) => ( { ...state, ...action.payload } ),
    deleteUser: () => ( EmpyUserState )
  }  
});
export const { createUser, updateUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;