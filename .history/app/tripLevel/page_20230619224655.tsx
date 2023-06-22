"use client";
import { travelPlanDataType } from "@/store/travelPlanDataSlice";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import CardSelection from "@/components/cardSelection";
import { useTravelPlanDataRedux } from "@/hooks/travelPlanData/hooks";
function Page() {
  const [tripLevel, setTripLevel] = useState<string>("normal");
  const { doSetTripLevel } = useTravelPlanDataRedux();
  const router = useRouter();
  const cardOptions = [
    {
      key: "normal",
      title: "Normal",
      description: "You will visit the most popular places in the city.",
    },
    {
      key: "simple",
      title: "Simple",
      description: "You will visit the most popular places in the city.",
    },
    {
      key: "luxury",
      title: "Luxury",
      description: "You will visit the most popular places in the city.",
    },
  ];
  return (
    <div className="flex items-center justify-center w-screen h-screen ">
      <div className="flex flex-col items-center">
        <p>Enter your budget:</p>
        <CardSelection
          cardOptions={cardOptions}
          setOption={setTripLevel}
        ></CardSelection>
        <button
          className="h-10 bg-slate-300 w-36"
          onClick={() => {
            doSetTripLevel(tripLevel as travelPlanDataType["tripLevel"]);
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
