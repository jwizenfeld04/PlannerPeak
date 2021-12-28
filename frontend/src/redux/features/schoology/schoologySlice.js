import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const authorizeSchoology = createAsyncThunk(
  "user/authorizeSchoology",
  async (schoologyConfig, thunkAPI) => {
    const response = await axios
      .post(
        `http://192.168.81.59:8000/api/schoology-authorize/`,
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
    return response;
  }
);

export const verifySchoology = createAsyncThunk(
  "user/verifySchoology",
  async (token, thunkAPI) => {
    const response = await axios
      .get(`http://192.168.81.59:8000/api/schoology-authorize/`, {
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
  extraReducers: {
    [authorizeSchoology.fulfilled]: (state, action) => {
      state.schoologyUrl = action.payload.data.authUrl;
      state.status = "success";
    },
    [authorizeSchoology.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const selectUrl = (state) => state.schoology.schoologyUrl;

export default schoologySlice.reducer;
