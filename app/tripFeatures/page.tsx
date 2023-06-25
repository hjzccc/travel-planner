"use client";
import { useTravelPlanDataRedux } from "@/hooks/travelPlanData/hooks";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import CardSelectionMulti from "@/components/cardSelectionMulti";
import { Button } from "antd";
import ProgressBar from "@/components/progressBar";

function Page() {
  const [tripFeaures, setTripFeaures] = useState<string[]>([]);
  const { doSetFeatures } = useTravelPlanDataRedux();
  const router = useRouter();

  const cardOptions = [
    {
      key: "chill",
      title: "Chill 🏖️",
      description: "We will loosen the trip schedule as possible.",
    },
    {
      key: "nature",
      title: "Nature 🏞️",
      description: "We will embrace attractions in the nature.",
    },
    {
      key: "urban",
      title: "Urban 🏙️",
      description: "We will prioritize attractions in the downtown.",
    },
  ];

  return (
    <div className="flex items-center justify-center w-screen h-screen ">
      <div className="flex flex-col items-center">
        <ProgressBar percent={75} />
        <p className="mx-auto max-w-[280px] text-center text-lg md:max-w-full md:text-xl">Enter the features you like:</p>
        <CardSelectionMulti
          cardOptions={cardOptions}
          setOption={setTripFeaures}
        ></CardSelectionMulti>
        <Button
          className="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400"
          onClick={() => {
            doSetFeatures(tripFeaures);
            router.push('/tripPlan');
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default Page;
