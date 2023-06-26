import React, { useState, useEffect } from "react";
import TimeActivity from "./timeActivity";
import useRequest from "@/hooks/useRequest";
import { List } from 'antd';


interface PlanItem {
  day: number;
  time: string;
  activityList: {
    activity: string;
    highlightWords: string[];
  };
}
const DailyPlan: React.FC<{ planItems: PlanItem[] }> = ({ planItems }) => {

  return (
    <List
    size="large"
    className="flex h-screen w-screen" 
    itemLayout="vertical"
    dataSource={planItems}
    renderItem={(item) => {
      return <TimeActivity
      day={item.day}
      time={item.time}
      activityList={item.activityList}
    />
    }}
    />
  );
};

export default DailyPlan;