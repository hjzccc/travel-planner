"use client";
import React, { useEffect, useState } from "react";
import DailyPlan from "@/components/dailyPlan";
import useRequest from "@/hooks/useRequest";
import { useAppSelector } from "@/hooks/redux/hooks";
import { useRouter } from "next/navigation";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

interface PlanItem {
  day: number;
  time: string;
  activityList: {
    activity: string;
    highlightWords: string[];
  };
}

const Page = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const router = useRouter();
  const [planItems, setPlanItems] = useState<PlanItem[]>([]);
  const { doRequest, errors } = useRequest({
    url: "/api/chat/chatPlan",
    method: "post",
    body: useAppSelector((state) => state.travelPlanData),
    onSuccess: (response) => {
      const convertedResponse: PlanItem[] = response.map((item: { day: any; time: any; activity: any; }, index: number) => ({
        day: item.day,
        time: item.time,
        activityList: {
          activity: item.activity,
          highlightWords: [],
        },
      }));
      setPlanItems(convertedResponse);
    }
  });

  const { doRequest: highlightRequest, errors: highlightErrors } = useRequest({
    url: "/api/chat/chatSpotNames",
    method: "post",
    body: { sentences: planItems.map(item => item.activityList.activity)},
    onSuccess: (response) => {
      const updatedPlanItems = planItems.map((item, index) => ({
        ...item,
        activityList: {
          ...item.activityList,
          highlightWords: response[index],
        },
      }));
      setPlanItems(updatedPlanItems);
    }
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); 
      try {
        await doRequest();
      } catch (error) {
        console.error("Error fetching plan items:", error);
      } finally {
        setLoading(false);
      };
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (planItems.length > 0) {
      highlightRequest();
    }
  }, [planItems]);

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="flex flex-col items-center">
        {loading ? (
          <Spin indicator={antIcon} />
        ) : (
          <DailyPlan planItems={planItems!} />
        )}
      </div>
    </div>
  );
};


export default Page;