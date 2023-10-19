import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Blog } from "../../models/blog.model";

const initialState: Blog[] = [];

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    addBlog: (state, action: PayloadAction<Blog>) => {
      state.push(action.payload);
    },
    updateBlog: (state, action: PayloadAction<Blog>) => {
      const index = state.findIndex((blog) => blog.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteBlog: (state, action: PayloadAction<Blog>) => {
      const index = state.findIndex((blog) => blog.id === action.payload.id);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { addBlog, updateBlog, deleteBlog } = blogSlice.actions;

export default blogSlice.reducer;
