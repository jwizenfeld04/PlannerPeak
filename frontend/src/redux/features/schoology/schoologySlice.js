import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API Request that creates a Schoology Oauth URL with callback of deep link to app
export const authorizeSchoology = createAsyncThunk(
  "user/authorizeSchoology",
  // schoologyConfig is an object includes callbackUrl and token
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
    return response;
  }
);

// API Request that finishes Schoology Oauth process by retreiving access tokens
// Dispatched after deep link is hit
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

// API Request that adds all Schoology Courses into the DB, returns no data
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

// API Request that adds all Schoology Assignments into the DB, returns no data
export const getSchoologyAssignments = createAsyncThunk(
  "user/getSchoologyAssignments",
  async (token, thunkAPI) => {
    const response = await axios
      .get(`https://plannerpeak.herokuapp.com/api/schoology-assignments/`, {
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

// API Request that adds connets Schoology Grades to respective courses into the DB, returns no data
export const getSchoologyGrades = createAsyncThunk(
  "user/getSchoologyGrades",
  async (token, thunkAPI) => {
    const response = await axios
      .get(`https://plannerpeak.herokuapp.com/api/schoology-grades/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .catch((error) => {
        throw thunkAPI.rejectWithValue(error.response.data);
      });
    console.log(response.data);
    return response;
  }
);

const initialState = {
  isSchoologyAuthorized: false, // Boolean whether authorizeSchoology is dispatched succesfully
  isSchoologyVerified: false, // Boolean whether verifySchoology is dispatched succesfully
  schoologyUrl: "", // String of Schoology Oauth URL
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
    [getSchoologyAssignments.fulfilled]: (state, action) => {
      state.status = "success";
    },
    [getSchoologyAssignments.pending]: (state, action) => {
      state.status = "loading";
    },
    [getSchoologyAssignments.rejected]: (state, action) => {
      state.status = "failed";
    },
    [getSchoologyGrades.fulfilled]: (state, action) => {
      state.status = "success";
    },
    [getSchoologyGrades.pending]: (state, action) => {
      state.status = "loading";
    },
    [getSchoologyGrades.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const { resetLink } = schoologySlice.actions; // Dispatch method to reset link to avoid errors if Schoology Oauth failes the first time
export const selectUrl = (state) => state.schoology.schoologyUrl;
export const selectIsVerified = (state) => state.schoology.isSchoologyVerified;
export const selectIsAuthorized = (state) =>
  state.schoology.isSchoologyAuthorized;

export default schoologySlice.reducer;
