import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiProxy } from "../../../api/httpCommon";

// API Request that retreives all courses from DB and returns in array of objects
export const getUserCourses = createAsyncThunk(
  "user/getUserCourses",
  async (token, thunkAPI) => {
    const response = await axios
      .get(`${apiProxy}/api/user-courses/`, {
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

export const updateUserCoursePrefrences = createAsyncThunk(
  "user/updateUserCoursePrefrences",
  async (modalData, thunkAPI) => {
    const response = await axios
    .put(`${apiProxy}/api/user-courses-update/${modalData.id}`, {
      color: modalData.color,
      notifications: modalData.notifications,
      priority: modalData.priority,
    },{
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

const initialState = {
  courses: [],
};

export const courseSlice = createSlice({
  name: "course",
  initialState: initialState,
  extraReducers: {
    [getUserCourses.fulfilled]: (state, action) => {
      const coursesArray = Object.values(action.payload.data).map((key) => key);
      state.courses = coursesArray;
      state.status = "success";
    },
    [getUserCourses.pending]: (state, action) => {
      state.status = "loading";
    },
    [getUserCourses.rejected]: (state, action) => {
      state.status = "failed";
    },
    [updateUserCoursePrefrences.fulfilled]: (state, action) => {
      state.status = "success";
    },
    [updateUserCoursePrefrences.pending]: (state, action) => {
      state.status = "loading";
    },
    [updateUserCoursePrefrences.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

// Access courses with useSelector(selectCourses)
export const selectCourses = (state) => state.course.courses;

export default courseSlice.reducer;
