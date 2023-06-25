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
  activity: string;
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
      setPlanItems(response);
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

  return (
    <div className="flex items-center justify-center w-screen h-screen">
    {loading ? (
      <Spin indicator={antIcon} />
    ) : (
      <DailyPlan planItems={planItems!} />
    )}
    </div>
  );
};


export default Page;