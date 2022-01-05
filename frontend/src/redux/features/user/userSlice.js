import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Redcuers & Actions: Signup, Login, Logout, getUserInfo
// 192.168.86.53
// 192.168.81.59
// 192.168.1.23

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (authData, thunkAPI) => {
    const response = await axios
      .post(`https://plannerpeak.herokuapp.com/api/dj-rest-auth/login/`, {
        email: authData.email,
        password: authData.password,
      })
      .catch((error) => {
        throw thunkAPI.rejectWithValue(error.response.data);
      });
    return response;
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (authData, thunkAPI) => {
    const response = await axios
      .post(
        `https://plannerpeak.herokuapp.com/api/dj-rest-auth/registration/`,
        {
          email: authData.email,
          first_name: authData.firstName,
          last_name: authData.lastName,
          password1: authData.password1,
          password2: authData.password2,
        }
      )
      .catch((error) => {
        throw thunkAPI.rejectWithValue(error.response.data);
      });
    return response;
  }
);

export const getUserInfo = createAsyncThunk(
  "user/getUserInfo",
  async (token, thunkAPI) => {
    const response = await axios.get(
      `https://plannerpeak.herokuapp.com/api/dj-rest-auth/user/`,
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
  error: {
    errorType: null,
    errorField: null,
    errorMessage: null,
  },
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
      state.error = null;
      state.status = "success";
    },
    [loginUser.rejected]: (state, action) => {
      state.error.errorType = "Login Error";
      state.error.errorField = Object.keys(action.payload)[0];
      state.error.errorMessage = Object.values(action.payload)[0][0];
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
      state.error = null;
      state.status = "success";
    },
    [registerUser.rejected]: (state, action) => {
      state.error.errorType = "Register Error";
      state.error.errorField = Object.keys(action.payload);
      state.error.errorMessage = Object.values(action.payload);
      state.status = "failed";
    },
  },
});

export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectUserName = (state) => state.user.user.firstName;
export const selectToken = (state) => state.user.accesstoken;
export const selectError = (state) => state.user.error;

export default userSlice.reducer;
