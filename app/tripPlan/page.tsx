"use client";
import React, { useEffect, useState } from "react";
import DailyPlan from "@/components/dailyPlan";
import useRequest from "@/hooks/useRequest";
import { useAppSelector } from "@/hooks/redux/hooks";
import { useRouter } from "next/navigation";
import { LoadingOutlined } from "@ant-design/icons";
import Lottie from "lottie-react";
import coolAnimation from "@/assets/2523-loading.json";
import textAnimation from "@/assets/animation_ljc27d9b.json";
interface PlanItem {
  day: number;
  time: string;
  activityList: {
    activity: string;
    highlightWords: string[];
  };
}

const planItems = [

];

const Page = () => {
  const [planItems, setPlanItems] = useState<PlanItem[]>([]);
  const { doRequest, errors } = useRequest({
    url: "/api/chat/chatPlan",
    method: "post",
    body: useAppSelector((state) => state.travelPlanData),
    onSuccess: (response) => {
    },
  });

  const { doRequest: highlightRequest, errors: highlightErrors } = useRequest({
    url: "/api/chat/chatSpotNames",
    method: "post",
    body: { sentences: planItems.map((item) => item.activityList.activity) },
    onSuccess: (response) => {
      const updatedPlanItems = planItems.map((item, index) => ({
        ...item,
        activityList: {
          ...item.activityList,
          highlightWords: response[index],
        },
      }));
      setPlanItems(updatedPlanItems);
    },
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await doRequest();
        const convertedResponse: PlanItem[] = response.map(
          (item: { day: any; time: any; activity: any }, index: number) => ({
            day: item.day,
            time: item.time,
            activityList: {
              activity: item.activity,
              highlightWords: [],
            },
          })
        );
        setPlanItems(convertedResponse);
  
        if (convertedResponse.length > 0 && !loading) {
          await highlightRequest();
        }
      } catch (error) {
        console.error("Error fetching plan items:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="flex flex-col items-center">
        {loading ? (
          <div className="flex flex-col items-center justify-center w-screen h-screen">
            <Lottie
              className="mb-6 h-96 w-96"
              animationData={coolAnimation}
            ></Lottie>
            <Lottie animationData={textAnimation}></Lottie>
          </div>
        ) : (
          <DailyPlan planItems={planItems!} />
        )}
      </div>
    </div>
  );
};

export default Page;
