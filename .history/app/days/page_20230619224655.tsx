"use client";
import React, { useState } from "react";
import { useTravelPlanDataRedux } from "@/hooks/travelPlanData/hooks";
import { useRouter } from "next/navigation";
function Page() {
  const [days, setDays] = useState<number>(1);
  const { doSetDay } = useTravelPlanDataRedux();
  const router = useRouter();
  return (
    <div className="flex items-center justify-center w-screen h-screen ">
      <div className="flex flex-col items-center">
        <p>Enter number of days:</p>
        <div>
          <button
            className="mx-4 bg-slate-300"
            onClick={() => {
              if (days < 7) {
                setDays(days + 1);
              }
            }}
          >
            +
          </button>
          {days}
          <button
            className="mx-4 bg-slate-300"
            onClick={() => {
              if (days > 1) {
                setDays(days - 1);
              }
            }}
          >
            -
          </button>
        </div>
        <button
          className="h-10 my-5 bg-slate-300 w-36"
          onClick={() => {
            doSetDay(days);
            router.push("/tripLevel");
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Page;
