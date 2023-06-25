"use client";
import DailyPlan from "@/components/dailyPlan";
import { useEffect } from "react";

interface PlanItem {
  day: number,
  time: string,
  activity: string,
};

interface PageProps {
  planItems: PlanItem[];
}

const Page: React.FC<PageProps> = ({ planItems }) => {
  useEffect(() => {
    console.log(planItems);
  }, [planItems]);

  return (<div>
    <DailyPlan planItems={planItems} />
  </div>);
}

export default Page;