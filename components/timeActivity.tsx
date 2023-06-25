interface TimeActivityProps {
  day: number,
  time: string,
  activity: string,
}

const TimeActivity = ({ day, time, activity }: TimeActivityProps) => {
  const timeOptions = [
    {
      time: "Morning",
    },
    {
      time: "Afternoon",
    },
    {
      time: "Night",
    },
  ];
  return (
    <li>Day{day} {time} - {activity}</li>
  )
}

export default TimeActivity;