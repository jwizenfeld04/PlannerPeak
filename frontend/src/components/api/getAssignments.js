import { getSchoologyAssignments } from "../../redux/features/schoology/schoologySlice";
import { getUserAssignments } from "../../redux/features/assignment/assignmentSlice";
import { unwrapResult } from "@reduxjs/toolkit";


export const getAssignments = (dispatch) => async (isSchoologyAuth) => {
  if (isSchoologyAuth === true) {
    try {
      await dispatch(getSchoologyAssignments()).then(unwrapResult);
      dispatch(getUserAssignments()); 
    } catch (error) {
      console.log(error);
    }
  } else {
    dispatch(getUserAssignments()); 
  }
};