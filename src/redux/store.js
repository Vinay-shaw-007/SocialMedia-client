import { configureStore } from "@reduxjs/toolkit";
import appConfigReducer from "./slices/appConfigSlice";
import postsReducer from "./slices/postsSlice";
import feedDataReducer from "./slices/feedSlice";
import storiesReducer from "./slices/storiesSlice";

export default configureStore({
  reducer: {
    appConfigReducer,
    postsReducer,
    feedDataReducer,
    storiesReducer
  },
});
