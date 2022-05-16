import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import base58 from "bs58";
import ACTIONS from "config/actions";
import { apiCaller } from "utils/fetcher";
import { setProfile } from "./profileSlice";
import socket from "utils/socket-client";
import Web3 from "web3";
import { signMessage } from "utils/walletHelpers";

export interface CounterState {
  roomName: string;
  userName: string;
}

const initialState = {
  logged: false,
  loading: false,
  checkingSession: true,
};

type loginProps = {
  publicKey: any;
  walletType: "solana" | "ethereum";
  provider: any;
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ publicKey, walletType, provider }: loginProps, { dispatch }) => {
    try {
      const {
        data: { nonce },
      } = await apiCaller.post("/auth/login", {
        requestNonce: true,
        walletType,
        publicKey,
      });
      const signature = await signMessage(
        walletType,
        nonce,
        provider,
        publicKey
      );
      const {
        data: { profile },
      } = await apiCaller.post("/auth/login", {
        publicKey,
        walletType,
        requestNonce: false,
        signature,
      });
      dispatch(setProfile(profile));
      return true;
    } catch (err) {
      return false;
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_) => {
  try {
    await apiCaller.post("/auth/logout");
    return true;
  } catch {
    return false;
  }
});

export const checkSession = createAsyncThunk(
  "auth/checkSession",
  async (_, { dispatch }) => {
    try {
      if (!window.socket) {
        window.socket = socket();
      }
      const { data } = await apiCaller.get("/auth/check");
      dispatch(setProfile(data.profile));
      return true;
    } catch {
      return false;
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.logged = action.payload;
    });
    builder.addCase(checkSession.fulfilled, (state, action) => {
      state.logged = action.payload;
      state.checkingSession = false;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      if (action.payload) {
        state.logged = false;
        window.location.reload();
      }
    });
  },
});

export default authSlice.reducer;
