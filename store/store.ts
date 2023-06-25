import { configureStore } from "@reduxjs/toolkit";
import { travelPlanDataSlice, travelPlanDataType } from "./travelPlanDataSlice";

const store = configureStore({
  reducer: {
    travelPlanData: travelPlanDataSlice.reducer,
  },
});

export default store;
