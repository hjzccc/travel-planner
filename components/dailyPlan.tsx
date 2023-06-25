import React from "react";
import TimeActivity from "./timeActivity";

interface PlanItem {
  day: number;
  time: string;
  activity: string;
}

interface DailyPlanProps {
  planItems: PlanItem[];
}

const DailyPlan: React.FC<DailyPlanProps> = ({ planItems }) => {
  return (
    <ol className="gradient-list">
      {planItems.map((item, index) => (
        <li key={index}>
          <TimeActivity day={item.day} time={item.time} activity={item.activity} />
        </li>
      ))}
    </ol>
  );
};

export default DailyPlan;