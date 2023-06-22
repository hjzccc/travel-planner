import { useAppDispath, useAppSelector } from "../redux/hooks";
import {
  setDestination,
  setFeatures,
  setDays,
  setTripLevel,
  setTravelPlanData,
  travelPlanDataType,
} from "@/store/travelPlanDataSlice";
export const useTravelPlanDataRedux = () => {
  const dispatch = useAppDispath();
  const { travelPlanData } = useAppSelector((state) => ({
    travelPlanData: state.travelPlanData,
  }));
  const doSetDay = (days: number) => {
    dispatch(setDays(days));
  };
  const doSetDestination = (destination: string) => {
    dispatch(setDestination(destination));
  };
  const doSetFeatures = (features: string[]) => {
    dispatch(setFeatures(features));
  };
  const doSetTripLevel = (tripLevel: "luxury" | "normal" | "budget") => {
    dispatch(setTripLevel(tripLevel));
  };
  const doSetTravelPlanData = (travelPlanData: travelPlanDataType) => {
    dispatch(setTravelPlanData(travelPlanData));
  };
  return {
    travelPlanData,
    doSetDay,
    doSetDestination,
    doSetFeatures,
    doSetTripLevel,
    doSetTravelPlanData,
  };
};
