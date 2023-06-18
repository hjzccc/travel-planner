"use client";
import { useTravelPlanDataRedux } from "@/hooks/travelPlanData/hooks";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import CardSelectionMulti from "@/components/cardSelectionMulti";
function Page() {
  const [tripFeaures, setTripFeaures] = useState<string[]>([]);
  const { doSetFeatures } = useTravelPlanDataRedux();
  const router = useRouter();
  const cardOptions = [
    {
      key: "chill",
      title: "Chill",
      description: "You will visit the most popular places in the city.",
    },
    {
      key: "adventure",
      title: "Adventure",
      description: "You will visit the most popular places in the city.",
    },
    {
      key: "exiting",
      title: "Exiting",
      description: "You will visit the most popular places in the city.",
    },
  ];
  return (
    <div className="flex items-center justify-center w-screen h-screen ">
      <div className="flex flex-col items-center">
        <p>Enter the features you like:</p>
        <CardSelectionMulti
          cardOptions={cardOptions}
          setOption={setTripFeaures}
        ></CardSelectionMulti>
        <button
          className="h-10 bg-slate-300 w-36"
          onClick={() => {
            doSetFeatures(tripFeaures);
            router.push("/tripFeatures");
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Page;
