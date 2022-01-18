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

const initialState = {
  assignments: [],
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
  },
});

// Access assignments with useSelector(selectAssignments)
export const selectAssignments = (state) => state.assignment.assignments;

export default assignmentsSlice.reducer;
