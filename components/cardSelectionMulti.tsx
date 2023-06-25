import React, { useState } from "react";
import { Card } from "antd";

const { Meta } = Card;

type Props = {
  cardOptions: { key: string; title: string; description: string }[];
  setOption:
    | React.Dispatch<React.SetStateAction<string[]>>
    | ((features: string[]) => void);
};
function Page({ cardOptions, setOption }: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const colors = [
    "border-red-300",
    "border-orange-300",
    "border-yellow-300",
    "border-green-300",
    "border-blue-300",
    "border-indigo-300",
    "border-purple-300",
  ];
  const [currentColorIndex, setColorIndex] = useState(0);

  const handleClick = () => {
    setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
  };
  return (
    cardOptions &&
    cardOptions.map((cardOption, index) => (
      <div
        key={cardOption.key}
        className={`my-4 border-2   ${
          selected.includes(cardOption.key)
            ? colors[currentColorIndex]
            : "border-gray-300"
        }`}
        onClick={() => {
          setSelected((prevSelected) => {
            handleClick();
            let nextSelected;
            if (!prevSelected.includes(cardOption.key)) {
              nextSelected = [...prevSelected, cardOption.key];
            } else {
              nextSelected = prevSelected.filter(
                (item) => item !== cardOption.key
              );
            }
            setOption(nextSelected);
            return nextSelected;
          });
        }}
      >
        <Card className="z-0 rounded-lg prose-base w-96" hoverable>
          <Meta title={cardOption.title} description={cardOption.description} />
        </Card>
      </div>
    ))
  );
}

export default Page;
