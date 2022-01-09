import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const authorizeSchoology = createAsyncThunk(
  "user/authorizeSchoology",
  async (schoologyConfig, thunkAPI) => {
    const response = await axios
      .post(
        `https://plannerpeak.herokuapp.com/api/schoology-authorize/`,
        {
          callbackUrl: schoologyConfig.callbackUrl, //PUT DEEP LINK CALLBACK URL HERE
        },
        {
          headers: {
            Authorization: `Token ${schoologyConfig.token}`,
          },
        }
      )
      .catch((error) => {
        throw thunkAPI.rejectWithValue(error.response.data);
      });
    console.log(response);
    return response;
  }
);

export const verifySchoology = createAsyncThunk(
  "user/verifySchoology",
  async (token, thunkAPI) => {
    const response = await axios
      .get(`https://plannerpeak.herokuapp.com/api/schoology-authorize/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .catch((error) => {
        throw thunkAPI.rejectWithValue(error.response.data);
      });
    return response;
  }
);

export const getSchoologyCourses = createAsyncThunk(
  "user/getSchoologyCourses",
  async (token, thunkAPI) => {
    const response = await axios
      .get(`https://plannerpeak.herokuapp.com/api/schoology-courses/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .catch((error) => {
        throw thunkAPI.rejectWithValue(error.response.data);
      });
    return response;
  }
);

const initialState = {
  isSchoologyAuthorized: false,
  isSchoologyVerified: false,
  schoologyUrl: "",
};

export const schoologySlice = createSlice({
  name: "schoology",
  initialState: initialState,
  reducers: {
    resetLink: (state) => {
      state.schoologyUrl = "";
    },
  },
  extraReducers: {
    [authorizeSchoology.fulfilled]: (state, action) => {
      state.schoologyUrl = action.payload.data.authUrl;
      state.isSchoologyAuthorized = true;
      state.status = "success";
    },
    [authorizeSchoology.rejected]: (state, action) => {
      state.schoologyUrl = "";
      state.isSchoologyAuthorized = false;
      state.status = "failed";
    },
    [verifySchoology.fulfilled]: (state, action) => {
      state.isSchoologyVerified = true;
      state.isSchoologyAuthorized = false;
      state.schoologyUrl = "";
      state.status = "success";
    },
    [verifySchoology.rejected]: (state, action) => {
      state.schoologyUrl = "";
      state.isSchoologyAuthorized = false;
      state.isSchoologyVerified = false;
      state.status = "failed";
    },
    [getSchoologyCourses.fulfilled]: (state, action) => {
      state.status = "success";
    },
    [getSchoologyCourses.pending]: (state, action) => {
      state.status = "loading";
    },
    [getSchoologyCourses.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const { resetLink } = schoologySlice.actions;
export const selectUrl = (state) => state.schoology.schoologyUrl;
export const selectIsVerified = (state) => state.schoology.isSchoologyVerified;
export const selectIsAuthorized = (state) =>
  state.schoology.isSchoologyAuthorized;

export default schoologySlice.reducer;
