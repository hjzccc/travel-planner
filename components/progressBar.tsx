import React from "react";
import { Progress } from "antd";

interface ProgressBarProps {
  percent: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percent }) => {
  return <Progress percent={percent} />;
};

export default ProgressBar;