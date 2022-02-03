import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API Request that returns array of all user assignments
// Array is further broken down to sub-arrays per class that contain all assignments
export const getUserAssignments = createAsyncThunk(
  "user/getUserAssignments",
  async (token, thunkAPI) => {
    const response = await axios
      .get(`https://plannerpeak.herokuapp.com/api/user-assignments/`, {
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

export const getCourseSpecificAssignments = createAsyncThunk(
  "user/getCourseSpecificAssignments",
  async (modalData, thunkAPI) => {
    const response = await axios
      .get(`https://plannerpeak.herokuapp.com/api/user-assignments/${modalData.id}`, {
        headers: {
          Authorization: `Token ${modalData.token}`,
        },
      })
      .catch((error) => {
        throw thunkAPI.rejectWithValue(error.response.data);
      });
    return response;
  }
);

export const scheduleAssignments = createAsyncThunk(
  "user/scheduleAssignments",
  async (token, thunkAPI) => {
    const response = await axios
      .get(`https://plannerpeak.herokuapp.com/api/schedule-assignments/`, {
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

export const getCurrentAssignment = createAsyncThunk(
  "user/getCurrentAssignment",
  async (token, thunkAPI) => {
    const response = await axios
      .get(`https://plannerpeak.herokuapp.com/api/current-assignment/`, {
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
  assignments: [],
  courseSpecficAssignments: [],
  currentAssignment: {},
};

export const assignmentsSlice = createSlice({
  name: "assignment",
  initialState: initialState,
  extraReducers: {
    [getUserAssignments.fulfilled]: (state, action) => {
      const assingmentArray = Object.values(action.payload.data).map(
        (key) => key
      );
      state.assignments = assingmentArray;
      state.status = "success";
    },
    [getUserAssignments.pending]: (state, action) => {
      state.status = "loading";
    },
    [getUserAssignments.rejected]: (state, action) => {
      state.status = "failed";
    },
    [getCourseSpecificAssignments.fulfilled]: (state, action) => {
      const assingmentArray = Object.values(action.payload.data).map(
        (key) => key
      );
      state.courseSpecficAssignments = assingmentArray;
      state.status = "success";
    },
    [getCourseSpecificAssignments.pending]: (state, action) => {
      state.status = "loading";
    },
    [getCourseSpecificAssignments.rejected]: (state, action) => {
      state.status = "failed";
    },
    [scheduleAssignments.fulfilled]: (state, action) => {
      state.status = "success";
    },
    [scheduleAssignments.pending]: (state, action) => {
      state.status = "loading";
    },
    [scheduleAssignments.rejected]: (state, action) => {
      state.status = "failed";
    },
    [getCurrentAssignment.fulfilled]: (state, action) => {
      state.currentAssignment = action.payload.data
      state.status = "success";
    },
    [getCurrentAssignment.pending]: (state, action) => {
      state.status = "loading";
    },
    [getCurrentAssignment.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

// Access assignments with useSelector(selectAssignments)
export const selectAssignments = (state) => state.assignment.assignments;
export const selectCourseSpecficAssignments = (state) => state.assignment.courseSpecficAssignments;
export const selectCurrentAssignment = (state) => state.assignment.currentAssignment;

export default assignmentsSlice.reducer;
