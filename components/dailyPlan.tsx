import React from "react";
import TimeActivity from "./timeActivity";

interface PlanItem {
  day: number;
  time: string;
  activity: string;
}

const DailyPlan: React.FC<{ planItems: PlanItem[] }> = ({ planItems }) => {
  const itineraryList = planItems?.map((item) => {
     return <TimeActivity day={item.day} time={item.time} activity={item.activity} />;
  });
  return (
    <ol>
      {itineraryList}
    </ol>
  );
};

export default DailyPlan;