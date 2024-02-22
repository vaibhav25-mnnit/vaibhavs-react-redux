import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { STATUS } from "../../utils/constants";

import {
  createUserApi,
  loginUserApi,
  editUserApi,
  logOutUserApi,
} from "./userApi";
const initialState = {
  user: null,
  message: null,
  error: null,
  status: STATUS.IDEAL,
};

//Api to signup user
export const createUser = createAsyncThunk("auth/createUser", async (data) => {
  const res = await createUserApi(data);
  return res;
});

//Api to  login page
export const loginUser = createAsyncThunk("auth/loginUser", async (data) => {
  const res = await loginUserApi(data);
  return res;
});

//to update the user info
export const updateUser = createAsyncThunk("auth/updateUser", async (data) => {
  const res = await editUserApi(data);
  return res;
});

//to logout User
export const logOutUser = createAsyncThunk("auth/logOutUser", async (data) => {
  const res = await logOutUserApi(data);

  return res;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetUser: (state) => {
      state.user = null;
      state.error = null;
      state.status = STATUS.IDEAL;
      localStorage.clear();
    },
    setUser: (state, data) => {
      state.user = data;
      state.error = null;
      state.status = STATUS.IDEAL;
    },
  },

  extraReducers: (builder) => {
    builder
      //create user
      .addCase(createUser.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = STATUS.IDEAL;
        state.user = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.error = action.payload.data;
        state.status = STATUS.ERROR;
      })

      //login user
      .addCase(loginUser.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = STATUS.IDEAL;
        state.user = action.payload.data;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = STATUS.ERROR;
        console.log(action.payload);
        state.error = action.payload.data;
      })

      //edit user
      .addCase(updateUser.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.status = STATUS.IDEAL;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload;
        state.status = STATUS.ERROR;
      })
      //logout user
      .addCase(logOutUser.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(logOutUser.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.status = STATUS.IDEAL;
      })
      .addCase(logOutUser.rejected, (state, action) => {
        state.error = action.payload;
        state.status = STATUS.ERROR;
      });
  },
});

export default authSlice.reducer;

export const { resetUser, setUser } = authSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectAuthStatus = (state) => state.user.status;
export const selectAuthError = (state) => state.user.error;
