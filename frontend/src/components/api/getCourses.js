import {
  getSchoologyCourses,
  getSchoologyGrades,
} from "../../redux/features/schoology/schoologySlice";
import { getUserCourses } from "../../redux/features/course/courseSlice";
import { unwrapResult } from "@reduxjs/toolkit";

export const getCourses = (dispatch) => async (isSchoologyAuth) => {
  if (isSchoologyAuth === true) {
    try {
      await dispatch(getSchoologyCourses()).then(unwrapResult);
      await dispatch(getSchoologyGrades()).then(unwrapResult);
      dispatch(getUserCourses()); 
    } catch (error) {
      console.log(error);
    }
  } else {
    dispatch(getUserCourses()); 
  }
};
