import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API Request that retreives all courses from DB and returns in array of objects
export const getUserCourses = createAsyncThunk(
  "user/getUserCourses",
  async (token, thunkAPI) => {
    const response = await axios
      .get(`https://plannerpeak.herokuapp.com/api/user-courses/`, {
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
  },
});

// Access courses with useSelector(selectCourses)
export const selectCourses = (state) => state.course.courses;

export default courseSlice.reducer;
