import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useState } from "react";
import storage from "redux-persist/lib/storage";

// Redcuers & Actions: Signup, Login, Logout, getUserInfo
// 192.168.86.53
// 192.168.81.59
// 192.168.1.23

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (authData, thunkAPI) => {
    const response = await axios.post(
      `http://192.168.1.23:8000/api/dj-rest-auth/login/`,
      {
        email: authData.email,
        password: authData.password,
      }
    );
    return response;
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (authData, thunkAPI) => {
    const response = await axios.post(
      `http://192.168.1.23:8000/api/dj-rest-auth/registration/`,
      {
        email: authData.email,
        first_name: authData.firstName,
        last_name: authData.lastName,
        password1: authData.password1,
        password2: authData.password2,
      }
    );
    return response;
  }
);

export const getUserInfo = createAsyncThunk(
  "user/getUserInfo",
  async (token, thunkAPI) => {
    const response = await axios.get(
      `http://192.168.1.23:8000/api/dj-rest-auth/user/`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return response;
  }
);

const initialState = {
  isLoggedIn: false,
  accesstoken: null,
  user: {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    isSchoologyAuthenticated: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  extraReducers: {
    [loginUser.fulfilled]: (state, action) => {
      state.accesstoken = action.payload.data.key;
      state.isLoggedIn = true;
      state.status = "success";
    },
    [loginUser.rejected]: (state, action) => {
      state.status = "failed";
    },
    [getUserInfo.fulfilled]: (state, action) => {
      state.user.id = action.payload.data.id;
      state.user.firstName = action.payload.data.first_name;
      state.user.lastName = action.payload.data.last_name;
      state.user.email = action.payload.data.email;
      state.user.isSchoologyAuthenticated =
        action.payload.data.is_schoology_authenticated;
      state.status = "success";
    },
    [registerUser.fulfilled]: (state, action) => {
      state.accesstoken = action.payload.data.key;
      state.isLoggedIn = true;
      state.status = "success";
    },
  },
});

export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectToken = (state) => state.user.accesstoken;

export default userSlice.reducer;
