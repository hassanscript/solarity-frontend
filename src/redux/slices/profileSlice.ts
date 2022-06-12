import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import ACTIONS from "config/actions";
import { showErrorToast, showSuccessToast } from "utils";
import { apiCaller, getErrorMessage } from "utils/fetcher";
import socket from "utils/socket-client";
import { sendAndConfirmTransaction, PublicKey } from "@solana/web3.js";
import { connectWallet } from "utils/walletHelpers";
import { connect } from "socket.io-client";
import { extractError } from "../../utils";

const initialState = {
  data: {},
  nfts: [],
  nftsLoaded: false,
  activeRoomId: "",
  activeRoomNo: -1,
};

export const undoSetupStep = createAsyncThunk(
  "profile/setup",
  async ({
    stepName,
    onFinally,
  }: {
    stepName: String;
    onFinally: () => void;
  }) => {
    let returnValue = null;
    try {
      const {
        data: { profile },
      } = await apiCaller.post("/profile/setup/undo", { stepName });
      returnValue = profile;
    } catch (err) {
      showErrorToast("Unable to undo the setup step");
      returnValue = false;
    }
    onFinally();
    return returnValue;
  }
);

export const setup = createAsyncThunk(
  "profile/setup",
  async ({
    data,
    successFunction,
    errorFunction,
    finalFunction,
  }: {
    data: Object;
    successFunction: () => void;
    errorFunction: (error: string) => void;
    finalFunction: () => void;
  }) => {
    let returnValue = null;
    try {
      const {
        data: { profile },
      } = await apiCaller.post("/profile/setup", data);
      successFunction();
      returnValue = profile;
    } catch (err) {
      errorFunction(getErrorMessage(err));
      returnValue = false;
    }
    finalFunction();
    return returnValue;
  }
);

export const addInfo = createAsyncThunk(
  "profile/addInfo",
  async ({
    data,
    successFunction,
    errorFunction,
    finalFunction,
  }: {
    data: Object;
    successFunction: () => void;
    errorFunction: (error: string) => void;
    finalFunction: () => void;
  }) => {
    let returnValue = null;
    try {
      const {
        data: { profile },
      } = await apiCaller.post("/profile/setup/info", {
        action: "info",
        ...data,
      });
      successFunction();
      returnValue = profile;
    } catch (err) {
      errorFunction(getErrorMessage(err));
      returnValue = false;
    }
    finalFunction();
    return returnValue;
  }
);

export const getRewardAction = createAsyncThunk(
  "profile/placeBid",
  async ({
    data,
    successFunction,
    errorFunction,
    finalFunction,
  }: {
    data: any;
    successFunction: () => void;
    errorFunction: (error: string) => void;
    finalFunction: () => void;
  }) => {
    let returnValue = null;
    const { signed, connection, setShowWallets } = data;
    try {
      try {
        await connection.sendRawTransaction(signed.serialize());
      } catch (error: any) {
        alert();
        errorFunction(error.message);
        return;
      }
      successFunction();
    } catch (err) {
      errorFunction(getErrorMessage(err));
      returnValue = false;
    }
    setShowWallets(false);
    finalFunction();
    return returnValue;
  }
);

export const placeBid = createAsyncThunk(
  "profile/placeBid",
  async ({
    data,
    successFunction,
    errorFunction,
    finalFunction,
  }: {
    data: any;
    successFunction: () => void;
    errorFunction: (error: string) => void;
    finalFunction: () => void;
  }) => {
    let returnValue = null;
    try {
      const { selectedAsset, selectedIndex, signed, connection } = data;

      const {
        data: { state },
      } = await apiCaller.post("/profile/checkRoom", {
        roomNo: selectedIndex,
      });

      if (state == true) {
        // uncomment below
        errorFunction("This room is already available.");
        return;
      }
      try {
        await connection.sendRawTransaction(signed.serialize());
      } catch (error: any) {
        errorFunction(error.message);
        return;
      }

      const {
        data: { profile },
      } = await apiCaller.post("/profile/buyRoom", {
        title: selectedAsset.title,
        subTitle: selectedAsset.subTitle,
        imageUrl: selectedAsset.imageUrl,
        currentBid: selectedAsset.currentBid,
        roomNo: selectedIndex,
      });
      successFunction();
      returnValue = profile;
    } catch (err) {
      errorFunction(getErrorMessage(err));
      returnValue = false;
    }
    finalFunction();
    return returnValue;
  }
);

export const claimDaos = createAsyncThunk(
  "profile/claimDaos",
  async ({
    data,
    successFunction,
    errorFunction,
    finalFunction,
  }: {
    data: Object;
    successFunction: () => void;
    errorFunction: (error: string) => void;
    finalFunction: () => void;
  }) => {
    let returnValue = null;
    try {
      const {
        data: { profile },
      } = await apiCaller.post("/profile/setup/claimDaos", data);
      successFunction();
      returnValue = profile;
    } catch (err) {
      errorFunction(getErrorMessage(err));
      returnValue = false;
    }
    finalFunction();
    return returnValue;
  }
);

export const setProfilePic = createAsyncThunk(
  "profile/setProfilePic",
  async ({
    data,
    successFunction,
    errorFunction,
    finalFunction,
  }: {
    data: Object;
    successFunction: () => void;
    errorFunction: (error: string) => void;
    finalFunction: () => void;
  }) => {
    let returnValue = null;
    try {
      const {
        data: { profile },
      } = await apiCaller.post("/profile/profilePic", data);
      successFunction();
      returnValue = profile;
    } catch (err) {
      errorFunction(getErrorMessage(err));
      returnValue = false;
    }
    finalFunction();
    return returnValue;
  }
);

export const updateProfileInfo = createAsyncThunk(
  "profile/updateProfileInfo",
  async ({
    data,
    successFunction,
    errorFunction,
    finalFunction,
  }: {
    data: Object;
    successFunction: () => void;
    errorFunction: (error: string) => void;
    finalFunction: () => void;
  }) => {
    let returnValue = null;
    try {
      const {
        data: { profile },
      } = await apiCaller.patch("/profile", data);
      successFunction();
      returnValue = profile;
    } catch (err) {
      errorFunction(getErrorMessage(err));
      returnValue = false;
    }
    finalFunction();
    return returnValue;
  }
);

export const updateNftCard = createAsyncThunk(
  "profile/updateNftCard",
  async ({
    data,
    successFunction,
    errorFunction,
    finalFunction,
  }: {
    data: Object;
    successFunction: () => void;
    errorFunction: (error: string) => void;
    finalFunction: () => void;
  }) => {
    let returnValue = null;
    try {
      const {
        data: { profile },
      } = await apiCaller.post("/profile/selectNftsForRoom", data);
      successFunction();
      returnValue = profile;
    } catch (err) {
      errorFunction(getErrorMessage(err));
      returnValue = false;
    }
    finalFunction();
    return returnValue;
  }
);

export const linkAccounts = createAsyncThunk(
  "profile/linkAccounts",
  async ({
    data,
    finalFunction,
  }: {
    data: Object;
    finalFunction: () => void;
  }) => {
    let returnValue = null;
    try {
      const {
        data: { profile },
      } = await apiCaller.post("/profile/linkAccounts", data);
      returnValue = profile;
      showSuccessToast("Account successfully linked");
    } catch (err) {
      showErrorToast(extractError(err));
      returnValue = false;
    }
    finalFunction();
    return returnValue;
  }
);

export const unlinkAccounts = createAsyncThunk(
  "profile/unlinkAccounts",
  async ({
    data,
    finalFunction,
  }: {
    data: Object;
    finalFunction: () => void;
  }) => {
    let returnValue = null;
    try {
      const {
        data: { profile },
      } = await apiCaller.post("/profile/unlinkAccounts", data);
      returnValue = profile;
      showSuccessToast("Account successfully unlinked");
    } catch (err) {
      showErrorToast(extractError(err));
      returnValue = false;
    }
    finalFunction();
    return returnValue;
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<any>) {
      const {
        payload,
        payload: { solanaAddress, ethereumAddress },
      } = action;
      const address = solanaAddress || ethereumAddress;
      payload.shortPublicAddress =
        address.substring(0, 4) +
        "..." +
        address.substring(address.length - 4, address.length);
      state.data = action.payload;
      localStorage.setItem("name", action.payload.username);
      if (!(window as any).socket) {
        (window as any).socket = socket();
      }
      (window as any).socket.emit(ACTIONS.SET_USER_NAME, {
        username: action.payload.username,
      });
    },
    loadNFTs() {},
    setActiveRoomNo(state: any, action: PayloadAction<any>) {
      state.activeRoomId = action.payload.activeRoomId;
      state.activeRoomNo = action.payload.activeRoomNo;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setup.fulfilled, (state, action) => {
      if (action.payload) {
        profileSlice.caseReducers.setProfile(state, action);
      }
    });
    builder.addCase(addInfo.fulfilled, (state, action) => {
      if (action.payload) {
        profileSlice.caseReducers.setProfile(state, action);
      }
    });
    builder.addCase(claimDaos.fulfilled, (state, action) => {
      if (action.payload) {
        profileSlice.caseReducers.setProfile(state, action);
      }
    });
    builder.addCase(setProfilePic.fulfilled, (state, action) => {
      if (action.payload) {
        profileSlice.caseReducers.setProfile(state, action);
      }
    });
    builder.addCase(updateProfileInfo.fulfilled, (state, action) => {
      if (action.payload) {
        profileSlice.caseReducers.setProfile(state, action);
      }
    });
    builder.addCase(updateNftCard.fulfilled, (state, action) => {
      if (action.payload) {
        profileSlice.caseReducers.setProfile(state, action);
      }
    });
    builder.addCase(placeBid.fulfilled, (state, action) => {
      if (action.payload) {
        profileSlice.caseReducers.setProfile(state, action);
      }
    });
    builder.addCase(linkAccounts.fulfilled, (state, action) => {
      if (action.payload) {
        profileSlice.caseReducers.setProfile(state, action);
      }
    });
    builder.addCase(unlinkAccounts.fulfilled, (state, action) => {
      if (action.payload) {
        profileSlice.caseReducers.setProfile(state, action);
      }
    });
  },
});

export const { setProfile, loadNFTs, setActiveRoomNo } = profileSlice.actions;

export default profileSlice.reducer;
