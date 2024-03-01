import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../api/config";

// API Request that retreives all courses from DB and returns in array of objects
export const getUserCourses = createAsyncThunk(
  "user/getUserCourses",
  async (token, thunkAPI) => {
    const response = await API.get(`user-courses/`).catch((error) => {
      throw thunkAPI.rejectWithValue(error.response.data);
    });
    return response;
  }
);

export const createUserCourse = createAsyncThunk(
  "user/createUserCourse",
  async (courseData, thunkAPI) => {
    const response = await API.post(`user-courses/`, {
      name: courseData.name,
      subject: courseData.subject,
      color: courseData.color,
    }).catch((error) => {
      throw thunkAPI.rejectWithValue(error.response.data);
    });
    return response;
  }
);

export const updateUserCourse = createAsyncThunk(
  "user/updateUserCoursePrefrences",
  async (modalData, thunkAPI) => {
    const response = await API.put(`user-courses-update/${modalData.id}`, {
      name: modalData.name,
      subject: modalData.subject,
      color: modalData.color,
    }).catch((error) => {
      throw thunkAPI.rejectWithValue(error.response.data);
    });
    return response;
  }
);

export const deleteUserCourse = createAsyncThunk(
  "user/deleteUserCourse",
  async (courseData, thunkAPI) => {
    const response = await API.delete(`user-courses-update/${courseData.id}`).catch(
      (error) => {
        throw thunkAPI.rejectWithValue(error.response.data);
      }
    );
    return response;
  }
);

const initialState = {
  courses: [],
  sortMethod: "grade", // Initial sort method of assignments
};

export const courseSlice = createSlice({
  name: "course",
  initialState: initialState,
  reducers: {
    updateSortMethod: (state, action) => {
      state.sortMethod = action.payload;
    },
  },
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
    [createUserCourse.fulfilled]: (state, action) => {
      state.status = "success";
      state.courses.push(action.payload.data);
    },
    [createUserCourse.pending]: (state, action) => {
      state.status = "loading";
    },
    [createUserCourse.rejected]: (state, action) => {
      state.status = "failed";
    },
    [updateUserCourse.fulfilled]: (state, action) => {
      //Update state of course after edit save
      const previousCourseId = state.courses.findIndex(
        (obj) => obj.id === action.payload.data.id
      );
      state.courses[previousCourseId] = action.payload.data;
      state.status = "success";
    },
    [updateUserCourse.pending]: (state, action) => {
      state.status = "loading";
    },
    [updateUserCourse.rejected]: (state, action) => {
      state.status = "failed";
    },
    [deleteUserCourse.fulfilled]: (state, action) => {
      state.status = "success";
      state.courses = state.courses.filter(
        (element) => element.id !== action.payload.data.id
      );
    },
    [deleteUserCourse.pending]: (state, action) => {
      state.status = "loading";
    },
    [deleteUserCourse.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

// Access courses with useSelector(selectCourses)
export const selectCourses = (state) => state.course.courses;
export const selectCourseSortMethod = (state) => state.course.sortMethod;

export const { updateSortMethod } = courseSlice.actions;

export default courseSlice.reducer;
