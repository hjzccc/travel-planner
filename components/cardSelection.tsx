import React, { useState } from "react";
import { Card } from "antd";
import { DollarOutlined } from "@ant-design/icons";

const { Meta } = Card;

type TripLevelToDollarIcons = {
  [key: string]: number;
};

type Props = {
  cardOptions: { key: string; title: string; description: string }[];
  setOption: React.Dispatch<React.SetStateAction<string>>;
};
function Page({ cardOptions, setOption }: Props) {
  const [selected, setSelected] = useState<string>("");
  const tripLevelToDollarIcons: TripLevelToDollarIcons = {
    "economic": 1,
    "normal": 2,
    "luxury": 3,
  };
  const renderDollarIcons = (count: number) => {
    return Array.from({ length: count }).map((_, index) => (
      <DollarOutlined key={index} />
    ));
  };
  return (
    cardOptions &&
    cardOptions.map((cardOption, index) => (
      <div
        className={`my-4 border-2 w-96  ${
          selected == cardOption.key ? "border-red-300" : "border-gray-300"
        }`}
        key={cardOption.key}
        onClick={() => {
          setSelected(cardOption.key);
          setOption(cardOption.key);
        }}
      >
        <Card
          title={renderDollarIcons(tripLevelToDollarIcons[cardOption.key])}
          className="prose-base rounded-lg flex flex-col justify-center items-center"
          hoverable
        >
            <Meta title={cardOption.title}/>
        </Card>
      </div>
    ))
  );
}

export default Page;
