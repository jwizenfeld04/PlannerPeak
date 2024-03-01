import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../api/config";
import moment from "moment";

export const getCourseSpecificAssignments = createAsyncThunk(
  "user/getCourseSpecificAssignments",
  async (modalData, thunkAPI) => {
    const response = await API.get(`user-assignments/${modalData.id}`).catch((error) => {
      throw thunkAPI.rejectWithValue(error.response.data);
    });
    return response;
  }
);

export const deleteAssignment = createAsyncThunk(
  "user/deleteAssignment",
  async (assignmentData, thunkAPI) => {
    const response = await API.delete(
      `user-assignments-update/${assignmentData.id}`
    ).catch((error) => {
      throw thunkAPI.rejectWithValue(error.response.data);
    });
    return response;
  }
);

export const completeAssignment = createAsyncThunk(
  "user/deleteAssignment",
  async (assignmentData, thunkAPI) => {
    const response = await API.put(`user-assignments-update/${assignmentData.id}`, {
      is_completed: true,
    }).catch((error) => {
      throw thunkAPI.rejectWithValue(error.response.data);
    });
    return response;
  }
);

export const scheduleAssignments = createAsyncThunk(
  "user/scheduleAssignments",
  async (token, thunkAPI) => {
    const response = await API.get(`schedule-assignments/`).catch((error) => {
      throw thunkAPI.rejectWithValue(error.response.data);
    });
    return response;
  }
);

// For notification purposes
export const getCurrentAssignment = createAsyncThunk(
  "user/getCurrentAssignment",
  async (token, thunkAPI) => {
    const response = await API.get(`current-assignment/`).catch((error) => {
      throw thunkAPI.rejectWithValue(error.response.data);
    });
    return response;
  }
);

export const getCurrentSchedule = createAsyncThunk(
  "user/getCurrentSchedule",
  async (token, thunkAPI) => {
    const response = await API.get(`current-schedule/`).catch((error) => {
      throw thunkAPI.rejectWithValue(error.response.data);
    });
    return response;
  }
);

export const getSpecificDateSchedule = createAsyncThunk(
  "user/getSpecificDateSchedule",
  async (scheduleData, thunkAPI) => {
    const response = await API.get(`schedule-date/${scheduleData.date}/`).catch(
      (error) => {
        throw thunkAPI.rejectWithValue(error.response.data);
      }
    );
    return response;
  }
);

export const getAssignmentTaskHistory = createAsyncThunk(
  "user/getAssignmentTaskHistory",
  async (scheduleData, thunkAPI) => {
    const response = await API.get(`user-history/`).catch((error) => {
      throw thunkAPI.rejectWithValue(error.response.data);
    });
    return response;
  }
);

const initialState = {
  courseSpecficAssignments: [],
  currentAssignment: null,
  schedule: null,
  dateSchedule: null,
  history: [],
};

export const assignmentsSlice = createSlice({
  name: "assignment",
  initialState: initialState,
  extraReducers: {
    [getCourseSpecificAssignments.fulfilled]: (state, action) => {
      const assingmentArray = Object.values(action.payload.data).map((key) => key);
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
      state.currentAssignment = action.payload.data;
      state.status = "success";
    },
    [getCurrentAssignment.pending]: (state, action) => {
      state.status = "loading";
    },
    [getCurrentAssignment.rejected]: (state, action) => {
      state.status = "failed";
    },
    [getCurrentSchedule.fulfilled]: (state, action) => {
      state.schedule = action.payload.data;
      state.currentAssignment = action.payload.data[0];
      state.status = "success";
    },
    [getCurrentSchedule.pending]: (state, action) => {
      state.status = "loading";
    },
    [getCurrentSchedule.rejected]: (state, action) => {
      state.status = "failed";
    },
    [getSpecificDateSchedule.fulfilled]: (state, action) => {
      state.dateSchedule = action.payload.data;
      state.status = "success";
    },
    [getSpecificDateSchedule.pending]: (state, action) => {
      state.status = "loading";
    },
    [getSpecificDateSchedule.rejected]: (state, action) => {
      state.status = "failed";
    },
    [deleteAssignment.fulfilled]: (state, action) => {
      state.courseSpecficAssignments = state.courseSpecficAssignments.filter(
        (element) => element.id !== action.payload.data.id
      );
      state.status = "success";
    },
    [deleteAssignment.pending]: (state, action) => {
      state.status = "loading";
    },
    [deleteAssignment.rejected]: (state, action) => {
      state.status = "failed";
    },
    [completeAssignment.fulfilled]: (state, action) => {
      state.courseSpecficAssignments = state.courseSpecficAssignments.filter(
        (element) => element.id !== action.payload.data.id
      );
      state.status = "success";
    },
    [completeAssignment.pending]: (state, action) => {
      state.status = "loading";
    },
    [completeAssignment.rejected]: (state, action) => {
      state.status = "failed";
    },
    [getAssignmentTaskHistory.fulfilled]: (state, action) => {
      state.history = action.payload.data.sort(
        (a, b) => moment(b.completed_date) - moment(a.completed_date)
      );
      state.status = "success";
    },
    [getAssignmentTaskHistory.pending]: (state, action) => {
      state.status = "loading";
    },
    [getAssignmentTaskHistory.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

// Access assignments with useSelector(selectAssignments)
export const selectCourseSpecficAssignments = (state) =>
  state.assignment.courseSpecficAssignments;
export const selectCurrentAssignment = (state) => state.assignment.currentAssignment;
export const selectCurrentSchedule = (state) => state.assignment.schedule;
export const selectDateSchedule = (state) => state.assignment.dateSchedule;
export const selectHistory = (state) => state.assignment.history;

export default assignmentsSlice.reducer;
