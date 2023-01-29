import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";

export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",
  async (body) => {
    try {
      const response = await axiosClient.post("/user/getUserProfile", body);
      return response.result;
    } catch (e) {
      return Promise.reject(e);
    }
  }
);

export const likeAndUnlikePost = createAsyncThunk(
  "post/likeAndUnlikePost",
  async (body) => {
    try {
      const response = await axiosClient.post("/posts/like", body);
      return response.result.post;
    } catch (e) {
      return Promise.reject(e);
    }
  }
);

export const getSpecificPostDetails = createAsyncThunk(
  "post/getSpecificPostDetails",
  async (body) => {
    try {
      const postDetails = await axiosClient.post(
        "/posts/getSpecificPostDetails",
        body
      );
      return postDetails.result.post;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const updatePost = createAsyncThunk("", async (body) => {
  try {
    const response = await axiosClient.put("/posts/", body);
    return response.result.post;
  } catch (e) {
    return Promise.reject(e);
  }
});

export const deletePost = createAsyncThunk("post/deletePost", async (body) => {
  try {
    const response = await axiosClient.post("/posts/delete", body);
    return body.postId;
  } catch (e) {
    return Promise.reject(e);
  }
});

const postsSlice = createSlice({
  name: "postsSlice",
  initialState: {
    userProfile: {},
    specificPostDetails: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.userProfile = action.payload;
      })
      .addCase(getSpecificPostDetails.fulfilled, (state, action) => {
        state.specificPostDetails = action.payload;
      })
      .addCase(likeAndUnlikePost.fulfilled, (state, action) => {
        const post = action.payload;
        const index = state?.userProfile?.posts?.findIndex(
          (item) => item._id === post._id
        );
        if (index !== undefined && index !== -1) {
          state.userProfile.posts[index] = post;
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const index = state?.userProfile?.posts?.findIndex(
          (item) => item._id === action.payload
        );
        if (index !== undefined && index !== -1) {
          state.userProfile.posts.splice(index, 1);
        }
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const post = action.payload;
        const index = state?.userProfile?.posts?.findIndex(
          (item) => item._id === post._id
        );
        if (index !== undefined && index !== -1) {
          state.userProfile.posts[index] = post;
        }
      });
  },
});

export default postsSlice.reducer;
