import React, { useState } from "react";
import { Card } from "antd";

type Props = {
  cardOptions: { key: string; title: string; description: string }[];
  setOption: React.Dispatch<React.SetStateAction<string>>;
};
function Page({ cardOptions, setOption }: Props) {
  const [selected, setSelected] = useState<string>("");
  return (
    cardOptions &&
    cardOptions.map((cardOption, index) => (
      <div
        className={`my-4 border-2   ${
          selected == cardOption.key ? "border-red-300" : "border-gray-300"
        }`}
        key={cardOption.key}
        onClick={() => {
          setSelected(cardOption.key);
          setOption(cardOption.key);
        }}
      >
        <Card className="prose-base ">
          <h2>{cardOption.title}</h2>
          <h3>{cardOption.description}</h3>
        </Card>
      </div>
    ))
  );
}

export default Page;
