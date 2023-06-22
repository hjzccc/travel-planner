import { useDispatch } from "react-redux";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type travelPlanDataType = {
  destination: string;
  features: string[];
  tripLevel: "luxury" | "normal" | "budget";
  days: number;
};
const initialState: travelPlanDataType = {
  destination: "",
  features: [],
  tripLevel: "normal",
  days: 1,
};
export const travelPlanDataSlice = createSlice({
  name: "travelPlanData",
  initialState: initialState,
  reducers: {
    setDestination: (state, action: PayloadAction<string>) => {
      state.destination = action.payload;
      return state;
    },
    setFeatures: (state, action: PayloadAction<string[]>) => {
      state.features = action.payload;
      return state;
    },
    setTripLevel: (
      state,
      action: PayloadAction<"luxury" | "normal" | "budget">
    ) => {
      state.tripLevel = action.payload;
      return state;
    },
    setDays: (state, action: PayloadAction<number>) => {
      state.days = action.payload;
      return state;
    },
    setTravelPlanData: (state, action: PayloadAction<travelPlanDataType>) => {
      state = action.payload;
      return state;
    },
  },
});

export const {
  setDestination,
  setFeatures,
  setTripLevel,
  setDays,
  setTravelPlanData,
} = travelPlanDataSlice.actions;
