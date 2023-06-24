"use client";
import React, { useState } from "react";
import { useTravelPlanDataRedux } from "@/hooks/travelPlanData/hooks";
import { useRouter } from "next/navigation";
import { Button } from "antd";
import ProgressBar from "@/components/progressBar";

function Page() {
  const [days, setDays] = useState<number>(1);
  const { doSetDay } = useTravelPlanDataRedux();
  const router = useRouter();
  return (
    <div className="flex items-center justify-center w-screen h-screen ">
      <div className="flex flex-col items-center">
        <ProgressBar percent={25} />
        <p className="mx-auto max-w-[280px] text-center text-lg md:max-w-full md:text-xl">Enter number of days:</p>
        <div>
          <Button
            className="mx-4 bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold"
            onClick={() => {
              if (days < 7) {
                setDays(days + 1);
              }
            }}
          >
            +
          </Button>
          {days}
          <Button
            className="mx-4 bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold"
            onClick={() => {
              if (days > 1) {
                setDays(days - 1);
              }
            }}
          >
            -
          </Button>
        </div>
        <Button
          className="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400"
          onClick={() => {
            doSetDay(days);
            router.push("/tripLevel");
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default Page;
