import SpotPopHover from "@/components/spotPopHover";
import { useAppSelector } from "@/hooks/redux/hooks";
import { Popover, List } from "antd";
import React from "react";

interface TimeActivityProps {
  day: number;
  time: string;
  activityList: {
    activity: string;
    highlightWords: string[];
  };
}

const TimeActivity: React.FC<TimeActivityProps> = ({ day, time, activityList }) => {
  const { destination } = useAppSelector((state) => state.travelPlanData)
  const { activity, highlightWords } = activityList;

  const highlightActivity = () => {
    const highlightedActivities: JSX.Element[] = [];
    let tempActivity = activity;
    let index = -1;

    highlightWords.forEach((word) => {
      let highlightedActivity: JSX.Element = (
        <>
          {activity}
        </>
      );
      index = tempActivity.indexOf(word);
  
      if (index !== -1) {
        const highlightedSpot = tempActivity.slice(index, index + word.length);
        const popoverContent = (
          <Popover content={<SpotPopHover spotName={`${highlightedSpot} at ${destination}`}  />} trigger="click">
            <span className="font-bold underline">{highlightedSpot}</span>
          </Popover>
        );
  
        highlightedActivity = (
          <>
            {tempActivity.slice(0, index)}
            {popoverContent}
          </>
        );
  
        tempActivity = tempActivity.slice(index + word.length);
        highlightedActivities.push(highlightedActivity);
        index = index + word.length;
      }
    });
  
    return (
      <>
        {highlightedActivities.map((item, index) => (
          <React.Fragment key={index}>{item}</React.Fragment>
        ))}
        {" " + tempActivity.slice(index)}
      </>
    );
  };
  
  return (
    <List.Item className="flex justify-center w-screen">
      <List.Item.Meta
        title={`Day ${day} - ${time}`}
        description={highlightActivity()}
      />
    </List.Item>
  );
};

export default TimeActivity;