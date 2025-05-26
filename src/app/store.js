import { configureStore } from "@reduxjs/toolkit";
import eyeReducer from "../features/eye/eyeSlice";

export const store = configureStore({
  reducer: {
    eye: eyeReducer,
  },
});
