import React, { useState } from "react";

type Props = {
  cardOptions: { key: string; title: string; description: string }[];
  setOption: React.Dispatch<React.SetStateAction<string>>;
};
function Page({ cardOptions }: Props) {
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
          console.log(selected);
        }}
      >
        <article className="prose-base">
          <h2>{cardOption.title}</h2>
          <h3>{cardOption.description}</h3>
        </article>
      </div>
    ))
  );
}

export default Page;
