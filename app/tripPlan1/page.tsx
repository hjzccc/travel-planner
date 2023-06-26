"use client";
import React, { useEffect, useState } from "react";
import DailyPlan from "@/components/dailyPlan";
import useRequest from "@/hooks/useRequest";
import { useAppSelector } from "@/hooks/redux/hooks";
import Lottie from "lottie-react";
import coolAnimation from "@/assets/2523-loading.json";
import textAnimation from "@/assets/animation_ljc27d9b.json";
import useSWR from "swr";
import fetcher from "@/common/swrFetcher";
import { travelPlanOutputType } from "@/common/planTablePrompt";
interface PlanItem {
  day: number;
  time: string;
  activityList: {
    activity: string;
    highlightWords: string[];
  };
}

const planItems = [];

const Page = () => {
  const travelPlandata = useAppSelector((state) => state.travelPlanData);
  const {
    data: planItems,
    isLoading: planItemsLoading,
    error: error1,
  } = useSWR<travelPlanOutputType>(
    "/api/chat/chatPlan",
    (url: string) =>
      fetcher(url, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(travelPlandata),
      }),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
      onErrorRetry: (err, key, config, revalidate, { retryCount }) => {
        console.log("retry.......");
        if (retryCount >= 4) return;
        revalidate({ retryCount: retryCount + 1 });
      },
    }
  );
  const {
    data: highlightWords,
    isLoading: highlightLoading,
    error: error2,
  } = useSWR<string[][]>(
    planItems ? "/api/chat/chatSpotNames" : "",
    (url: string) =>
      fetcher(url, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sentences: planItems?.map((item) => item.activity),
        }),
      }),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
      onErrorRetry: (err, key, config, revalidate, { retryCount }) => {
        console.log("retry.......");
        if (retryCount >= 4) return;
        revalidate({ retryCount: retryCount + 1 });
      },
    }
  );
  if (error1 || error2 || highlightLoading || planItemsLoading) {
    return (
      <div className="flex flex-col items-center justify-center w-screen h-screen">
        <Lottie
          className="mb-6 h-96 w-96"
          animationData={coolAnimation}
        ></Lottie>
        <Lottie animationData={textAnimation}></Lottie>
      </div>
    );
  }
  let updatedPlanItems;
  if (highlightWords && planItems) {
    updatedPlanItems = planItems.map((item, index) => ({
      ...item,
      activityList: {
        activity: item.activity,
        highlightWords: highlightWords[index],
      },
    }));
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="flex flex-col items-center">
        <DailyPlan planItems={updatedPlanItems!} />
      </div>
    </div>
  );
};

export default Page;
