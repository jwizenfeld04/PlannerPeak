import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../api/config";

// API Request that allows user to log into the app
export const loginUser = createAsyncThunk(
  "user/loginUser",
  // authData is object that must constain email and password
  async (authData, thunkAPI) => {
    const response = await API.post(`login/`, {
      email: authData.email,
      password: authData.password,
    }).catch((error) => {
      throw thunkAPI.rejectWithValue(error.response.data);
    });
    return response;
  }
);

// API Request that allows user to register with the app
export const registerUser = createAsyncThunk(
  "user/registerUser",
  // authData is object that must constain first name, last name, email, password1, password2 (confirmation password)
  async (authData, thunkAPI) => {
    const response = await API.post(`dj-rest-auth/registration/`, {
      email: authData.email,
      phone: authData.phone,
      password1: authData.password1,
      password2: authData.password2,
    }).catch((error) => {
      throw thunkAPI.rejectWithValue(error.response.data);
    });
    return response;
  }
);

export const verifyPhone = createAsyncThunk(
  "user/verifyPhone",
  async (authData, thunkAPI) => {
    const response = await API.post(`verify-phone/`, {
      code: authData.code,
    }).catch((error) => {
      throw thunkAPI.rejectWithValue(error.response.data);
    });
    return response;
  }
);

export const verifyResend = createAsyncThunk(
  "user/verifyResend",
  async (token, thunkAPI) => {
    const response = await API.get(`verify-resend/`);
    return response;
  }
);

export const requestForgotPassword = createAsyncThunk(
  "user/requestForgotPassword",
  async (authData, thunkAPI) => {
    const response = await API.post(`password-reset/`, {
      email: authData.email,
    }).catch((error) => {
      throw thunkAPI.rejectWithValue(error.response.data);
    });
    return response;
  }
);

export const confirmForgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (authData, thunkAPI) => {
    const response = await API.post(`password-reset/`, {
      uid: authData.uid,
      token: authData.token,
      new_password1: authData.password1,
      new_password2: authData.password2,
    }).catch((error) => {
      throw thunkAPI.rejectWithValue(error.response.data);
    });
    return response;
  }
);

// API Request that retreives user info as an object
export const getUserInfo = createAsyncThunk(
  "user/getUserInfo",
  async (token, thunkAPI) => {
    const response = await API.get(`dj-rest-auth/user/`);
    return response;
  }
);

const initialState = {
  isLoggedIn: false,
  loginError: null,
  accesstoken: null,
  user: {
    id: "",
    email: "",
    isSchoologyAuthenticated: false,
    isAppleCalendarAuthenticated: false,
    isVerified: false,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    clearLoginError: (state, action) => {
      state.loginError = null;
    },
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, action) => {
      state.accesstoken = action.payload.data.key;
      state.user.isVerified = action.payload.data.verified;
      state.isLoggedIn = true;
      state.loginError = null;
      state.status = "success";
    },
    [loginUser.rejected]: (state, action) => {
      state.loginError = Object.values(action.payload)[0][0];
      state.status = "failed";
    },
    [getUserInfo.fulfilled]: (state, action) => {
      state.user.id = action.payload.data.id;
      state.user.email = action.payload.data.email;
      state.user.isSchoologyAuthenticated =
        action.payload.data.is_schoology_authenticated;
      state.user.isAppleCalendarAuthenticated =
        action.payload.data.is_apple_calendar_authenticated;
      state.user.isVerified = action.payload.data.verified;
      state.status = "success";
    },
    [registerUser.fulfilled]: (state, action) => {
      state.accesstoken = action.payload.data.key;
      state.isLoggedIn = true;
      state.loginError = null;
      state.status = "success";
    },
    [registerUser.rejected]: (state, action) => {
      state.status = "failed";
    },
    [requestForgotPassword.fulfilled]: (state, action) => {
      state.status = "success";
    },
    [requestForgotPassword.rejected]: (state, action) => {
      state.status = "failed";
    },
    [confirmForgotPassword.fulfilled]: (state, action) => {
      state.status = "success";
    },
    [confirmForgotPassword.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectIsVerified = (state) => state.user.user.isVerified;
export const selectIsSchoologyAuthenticated = (state) =>
  state.user.user.isSchoologyAuthenticated;
export const selectIsAppleCalendarAuthetnicated = (state) =>
  state.user.user.isAppleCalendarAuthenticated;
export const selectToken = (state) => state.user.accesstoken;
export const selectError = (state) => state.user.loginError;

export const { clearLoginError } = userSlice.actions;

export default userSlice.reducer;
