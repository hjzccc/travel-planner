import { configureStore } from "@reduxjs/toolkit";
import { travelPlanDataSlice, travelPlanDataType } from "./travelPlanDataSlice";

type RootState = {
  travelPlanData: travelPlanDataType;
};
const store = configureStore({
  reducer: {
    travelPlanData: travelPlanDataSlice.reducer,
  },
});

export default store;
export type { RootState };
