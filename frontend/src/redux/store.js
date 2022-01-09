import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import userReducer from "./features/user/userSlice";
import schoologyReducer from "./features/schoology/schoologySlice";
import courseReducer from "./features/course/courseSlice";

//ADD REDUCERS HERE
const appReducer = combineReducers({
  user: userReducer,
  schoology: schoologyReducer,
  course: courseReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "user/logoutUser") {
    state = undefined;
    AsyncStorage.removeItem("persist:root");
  }

  return appReducer(state, action);
};

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export default store;
