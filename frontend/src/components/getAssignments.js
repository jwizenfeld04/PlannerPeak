import { getSchoologyAssignments } from "../redux/features/schoology/schoologySlice";
import { getUserAssignments } from "../redux/features/assignment/assignmentSlice";
import { unwrapResult } from "@reduxjs/toolkit";


export const getAssignments = (dispatch) => async (token, isSchoologyAuth) => {
  if (isSchoologyAuth === true) {
    try {
      await dispatch(getSchoologyAssignments(token)).then(unwrapResult);
      dispatch(getUserAssignments(token)); 
    } catch (error) {
      console.log(error);
    }
  } else {
    dispatch(getUserAssignments(token)); 
  }
};