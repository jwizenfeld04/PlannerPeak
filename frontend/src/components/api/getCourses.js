import {
  getSchoologyCourses,
  getSchoologyGrades,
} from "../../redux/features/schoology/schoologySlice";
import { getUserCourses } from "../../redux/features/course/courseSlice";
import { unwrapResult } from "@reduxjs/toolkit";

export const getCourses = (dispatch) => async (token, isSchoologyAuth) => {
  if (isSchoologyAuth === true) {
    try {
      await dispatch(getSchoologyCourses(token)).then(unwrapResult);;
      dispatch(getSchoologyGrades(token));
      dispatch(getUserCourses(token)); 
    } catch (error) {
      console.log(error);
    }
  } else {
    dispatch(getUserCourses(token)); 
  }
};
