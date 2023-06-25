import React, { useState } from "react";
import TimeActivity from "./timeActivity";
import useRequest from "@/hooks/useRequest";

interface PlanItem {
  day: number;
  time: string;
  activityList: {
    activity: string;
    highlightWords: string[];
  };
}
const DailyPlan: React.FC<{ planItems: PlanItem[] }> = ({ planItems }) => {
  const [activityList, setActivityList] = useState<string[]>([]);

  const handleHighLightWordsList = async (response: string[][]) => {
    planItems?.map((item, index) => {
      item.activityList.highlightWords = response[index];
    })
  }

  const { doRequest, errors } = useRequest({
    url: "/api/chat/chatSpotNames",
    method: "post",
    body: activityList,
    onSuccess: (response) => {
      if(response.length === planItems.length)
        handleHighLightWordsList(response);
    }
  });

  const itineraryList = planItems?.map((item) => {
     return <TimeActivity day={item.day} time={item.time} activityList={item.activityList} />;
  });

  return (
    <ol>
      {itineraryList}
    </ol>
  );
};

export default DailyPlan;