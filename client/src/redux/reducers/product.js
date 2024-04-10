import { createReducer } from "@reduxjs/toolkit";

const initialstate = {
  isLoading: true,
};

export const productReducer = createReducer(initialstate, (builder) => {
  builder
    .addCase("productCreateRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("productCreateSuccess", (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
      state.success = true;
    })
    .addCase("productCreateFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
