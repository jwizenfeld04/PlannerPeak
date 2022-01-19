import {
  getSchoologyCourses,
  getSchoologyGrades,
} from "../redux/features/schoology/schoologySlice";
import { getUserCourses } from "../redux/features/course/courseSlice";
import { unwrapResult } from "@reduxjs/toolkit";

export const getCourses = (dispatch) => (token, isSchoologyAuth) => {
  if (isSchoologyAuth === true) {
    // Checks whether Schoology is Authenticated
    dispatch(getSchoologyCourses(token)) // Adds Schoology Courses to DB
      .then(unwrapResult) // Waits until this dispatch method finishes before continuing
      .then((obj) => {
        dispatch(getSchoologyGrades(token));
        dispatch(getUserCourses(token)); // Retreives all courses in DB
      })
      .catch((obj) => {
        console.log(obj);
      });
  } else {
    dispatch(getUserCourses(token)); // If Schoology not authenticated, skip striaght to retreive from DB
  }
};
