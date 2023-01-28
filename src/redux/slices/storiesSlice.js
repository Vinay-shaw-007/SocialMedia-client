import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";

export const uploadStories = createAsyncThunk(
  "stories/uploadStories",
  async (body) => {
    try {
      const response = await axiosClient.post("/stories/uploadStories", body);
      console.log("uploaded data", response.result);
      return response.result;
    } catch (e) {
      return Promise.reject(e);
    }
  }
);

export const fetchStories = createAsyncThunk(
  "stories/fetchStories",
  async (body) => {
    try {
      console.log("fetched stories id", body);
      const response = await axiosClient.post("/stories/fetchStories", body);
      console.log("fetched stories data", response.result.allStories.stories);
      return response.result.allStories.stories;
    } catch (e) {
      return Promise.reject(e);
    }
  }
);

const storiesSlice = createSlice({
  name: "storiesSlice",
  initialState: {
    stories: {},
    showStories: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadStories.fulfilled, (state, action) => {
        state.stories = action.payload;
      })
      .addCase(fetchStories.fulfilled, (state, action) => {
        state.showStories = action.payload;
      });
  },
});

export default storiesSlice.reducer;
