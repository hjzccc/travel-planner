import { List } from 'antd';

interface TimeActivityProps {
  day: number;
  time: string;
  activityList: {
    activity: string;
    highlightWords: string[];
  };
}
const TimeActivity = ({ day, time, activityList }: TimeActivityProps) => {
  const { activity, highlightWords } = activityList;

  const highlightActivity = () => {
    const words = activity.split(" ");
    return words.map((word, index) => {
      const isHighlighted = highlightWords.includes(word.toLowerCase());
      return isHighlighted ? (
        <span key={index} className="highlight">
          {word}{" "}
        </span>
      ) : (
        <span key={index}>{word} </span>
      );
    });
  };
  return (
    <List.Item>
      Day{day} {time} - {highlightActivity()}
    </List.Item>
  )
}

export default TimeActivity;