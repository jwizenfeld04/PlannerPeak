import { getSchoologyAssignments } from "../redux/features/schoology/schoologySlice";
import { getUserAssignments } from "../redux/features/assignment/assignmentSlice";
import { unwrapResult } from "@reduxjs/toolkit";

export const getAssignments = (dispatch) => (token, isSchoologyAuth) => {
  if (isSchoologyAuth === true) {
    dispatch(getSchoologyAssignments(token))
      .then(unwrapResult)
      .then((obj) => {
        dispatch(getUserAssignments(token));
      })
      .catch((obj) => {
        console.log(obj);
      });
  } else {
    dispatch(getUserAssignments(token));
  }
};
