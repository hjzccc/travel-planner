import React from "react";
import { Steps } from "antd";
type Props = {
  current: number;
  className?: string;
};
function Page({ className, current }: Props) {
  return (
    <Steps
      className={className ? className : `absolute w-screen px-8 top-20 fill-`}
      current={current}
      items={[
        {
          title: "City Name",
          description: "Select your desired destination",
        },
        {
          title: "Days",
          description: "Enter how many days you want to stay",
        },
        {
          title: "Budget",
          description: "Choose your budget",
        },
        {
          title: "Features",
          description: "Select the features you love best!",
        },
      ]}
    />
  );
}

export default Page;
