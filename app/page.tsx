"use client";
import { useTravelPlanDataRedux } from "@/hooks/travelPlanData/hooks";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Button, Steps } from "antd";
import ProgressBar from "@/components/progressBar";
import Stepbar from "@/components/stepsBar";
export default function Home() {
  const router = useRouter();
  const [city, setCity] = useState<string>("");
  const { doSetDestination } = useTravelPlanDataRedux();
  const description = "This is a description.";
  return (
    <div className="flex items-center justify-center w-screen h-screen ">
      <div className="flex flex-col items-center">
        <Stepbar current={0} />
        <p className="mx-auto max-w-[280px] text-center text-lg md:max-w-full md:text-xl">
          Craft Your Journey Now:
        </p>
        <Input
          className="mx-2 my-3"
          placeholder="Where do you want to go?"
          allowClear
          type="text"
          name="city"
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <Button
          className="flex items-center justify-center w-full h-12 px-6 font-semibold text-white rounded-lg bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400"
          onClick={() => {
            if (!city) {
              alert(
                "A journey of a thousand miles begins with a non-empty destination"
              );
              return;
            }
            doSetDestination(city);
            router.push("/days");
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
