import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import ACTIONS from "config/actions";
import { Gallery } from "modal/Gallery";
import { apiCaller, getErrorMessage } from "utils/fetcher";

export interface MarketplaceState {
  roomName: string;
  selectedTagIndex: number;
  selectedIndex: number;
  assets: Gallery;
}

const initialState: MarketplaceState = {
  roomName: '',
  selectedTagIndex: 0,
  selectedIndex: 0,
  assets: {
    rows: [
      {
        title: "Raising Verses",
        items: [
          {
            roomNo: 0,
            title: "MoneyVerse #4141",
            collection: "Solana Money Boys",
            imageUrl: "/images/placeholder/marketplace/gallery/boh1.png",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi,eget quisque pharetra, nisl. Nisl a proin a commodo libero purusduis. Leo, condimentum viverra mattis feugiat egestas est at nec.Praesent vitae fames feugiat diam mauris. Fringilla posuere quamenim id urna. Arcu, ut magna cursus pharetra semper a.",
            currentBid: 50,
            endingIn: "12h  43m  27s",
          },
          {
            roomNo: 1,
            title: "DeVerse #1633",
            collection: "Solana Money Boys",
            imageUrl: "/images/placeholder/marketplace/gallery/boh2.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi,eget quisque pharetra, nisl. Nisl a proin a commodo libero purusduis. Leo, condimentum viverra mattis feugiat egestas est at nec.Praesent vitae fames feugiat diam mauris. Fringilla posuere quamenim id urna. Arcu, ut magna cursus pharetra semper a.",
            currentBid: 50,
            endingIn: "12h  43m  27s",
          },
          {
            roomNo: 2,
            title: "MonkeVerse #1094",
            collection: "Solana Money Boys",
            imageUrl: "/images/placeholder/marketplace/gallery/boh3.png",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi,eget quisque pharetra, nisl. Nisl a proin a commodo libero purusduis. Leo, condimentum viverra mattis feugiat egestas est at nec.Praesent vitae fames feugiat diam mauris. Fringilla posuere quamenim id urna. Arcu, ut magna cursus pharetra semper a.",
            currentBid: 50,
            endingIn: "12h  43m  27s",
          },
        ],
      },
    ]
  }
};

export const marketplaceSlice = createSlice({
  name: "marketplace",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setAsset: (state, action: PayloadAction<any>) => {
      state.selectedTagIndex = action.payload.tagIndex;
      state.selectedIndex = action.payload.roomNo;
    }
  },
  extraReducers: (builder) => {
  }
});

export const { setAsset } = marketplaceSlice.actions;

export default marketplaceSlice.reducer;
