import { configureStore } from "@reduxjs/toolkit";
import { travelPlanDataSlice } from "./travelPlanDataSlice";
const store = configureStore({
  reducer: {
    travelPlanData: travelPlanDataSlice.reducer,
  },
});

export default store;
