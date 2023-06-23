"use client";
import { useTravelPlanDataRedux } from "@/hooks/travelPlanData/hooks";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import CardSelectionMulti from "@/components/cardSelectionMulti";
import { Button } from "antd";
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
        <p className="mx-auto max-w-[280px] text-center text-lg md:max-w-full md:text-xl">Enter the features you like:</p>
        <CardSelectionMulti
          cardOptions={cardOptions}
          setOption={setTripFeaures}
        ></CardSelectionMulti>
        <Button
          className="h-10 bg-slate-300 w-36"
          onClick={() => {
            doSetFeatures(tripFeaures);
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
