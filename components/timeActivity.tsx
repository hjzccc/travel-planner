import SpotPopHover from "@/components/spotPopHover";
import { Popover, List } from "antd";

interface TimeActivityProps {
  day: number;
  time: string;
  activityList: {
    activity: string;
    highlightWords: string[];
  };
}

const TimeActivity: React.FC<TimeActivityProps> = ({ day, time, activityList }) => {
  const { activity, highlightWords } = activityList;

  const highlightActivity = () => {
    let tempActivity = activity;
    let highlightedActivity = (
      <>
      {activity}
      </>
    );

    highlightWords.forEach((word) => {

      const index = tempActivity.indexOf(word);

      if (index !== -1) {
        const highlightedSpot = tempActivity.slice(index, index + word.length);
        const popoverContent = (
          <Popover content={<SpotPopHover spotName={highlightedSpot} />} trigger="click">
            <span className="font-bold underline">{highlightedSpot}</span>
          </Popover>
        );

        highlightedActivity = (
          <>
            {tempActivity.slice(0, index)}
            {popoverContent}
            {tempActivity.slice(index + word.length)}
          </>
        );

        tempActivity = tempActivity.slice(index + word.length);
      }
    });

    return <span>{highlightedActivity}</span>;
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