"use client";
import { travelPlanDataType } from "@/store/travelPlanDataSlice";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import CardSelection from "@/components/cardSelection";
import { useTravelPlanDataRedux } from "@/hooks/travelPlanData/hooks";
import { Button } from "antd";
import ProgressBar from "@/components/progressBar";
import Stepbar from "@/components/stepsBar";
function Page() {
  const [tripLevel, setTripLevel] = useState<string>("normal");
  const { doSetTripLevel } = useTravelPlanDataRedux();
  const router = useRouter();
  const cardOptions = [
    {
      key: "economic",
      title: "Economic",
      description: "You will visit the most popular places in the city.",
    },
    {
      key: "normal",
      title: "Normal",
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
        <Stepbar current={2} />
        <p className="mx-auto max-w-[280px] text-center text-lg md:max-w-full md:text-xl">
          Enter your budget:
        </p>
        <CardSelection
          cardOptions={cardOptions}
          setOption={setTripLevel}
        ></CardSelection>
        <Button
          className="flex items-center justify-center w-full h-12 px-6 font-semibold text-white rounded-lg bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400"
          onClick={() => {
            doSetTripLevel(tripLevel as travelPlanDataType["tripLevel"]);
            router.push("/tripFeatures");
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default Page;
