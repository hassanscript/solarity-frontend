import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appLoading: true,
  iframe: false,
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    startLoadingApp(state) {
      state.appLoading = true;
    },
    setOnIframe(state) {
      state.iframe = true;
    },
    stopLoadingApp(state) {
      state.appLoading = false;
    },
  },
});

export const {
  actions: { startLoadingApp, stopLoadingApp, setOnIframe },
} = commonSlice;

export default commonSlice.reducer;
