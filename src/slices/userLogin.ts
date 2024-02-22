import {  PayloadAction, Slice, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API_Endpoints from "../utils/API_Endpoints";
import { IfetchPOST } from "./CounterSlice";
import axios from "axios";
import { RootState } from "../../store";

export const userLoginAPI = createAsyncThunk(
    "userLogin/userLogin",
    async (_,thunkAPI) => {
        console.log("user login API called");
        
        const res = await axios.get(API_Endpoints.GET_POST);

        if (res != null) {
            console.log("List ", res);
            if (res.data) {
              return res.data as IfetchPOST[];
            }
            return thunkAPI.rejectWithValue({ message: "data not found..." });
          }
    }
)

interface userLogin { 
    userDetails:object | undefined | void;
    userlogin: boolean;
}

const initialState: userLogin ={
    userDetails:{},
    userlogin:false,
}

export const UserLoginSlice:Slice = createSlice({
    name : "UserLogin",
    initialState,
    reducers:{
        setUserData:(state,action:PayloadAction) =>{
            state.userDetails = action.payload;
        },
        resetCount: () => initialState
    },
    extraReducers:(builder) => {
        builder.addCase(userLoginAPI.fulfilled, (state, { payload }) => {
            state.userDetails = payload;
          });
          builder.addCase(userLoginAPI.pending, (state, { payload }) => {
            state.userDetails = payload;
          });
          builder.addCase(userLoginAPI.rejected, (state, { payload }) => {
            // state.userDetails = payload;
            console.log("error Occured.");
            
          });
    }
    
});

export const {setUserData,resetCount} = UserLoginSlice.actions;

export const userDetailsSelector = (state:RootState) => state.UserLogin.userDetails;
export const userloginSelector = (state:RootState) => state.UserLogin.userlogin;

export default UserLoginSlice.reducer;
