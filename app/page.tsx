"use client";
import { useTravelPlanDataRedux } from "@/hooks/travelPlanData/hooks";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Button } from "antd";
import ProgressBar from "@/components/progressBar";

export default function Home() {
  const router = useRouter();
  const [city, setCity] = useState<string>("");
  const { doSetDestination } = useTravelPlanDataRedux();
  

  return (
    <div className="flex items-center justify-center w-screen h-screen ">
      <div className="flex flex-col items-center">
        <ProgressBar percent={0} />
        <p className="mx-auto max-w-[280px] text-center text-lg md:max-w-full md:text-xl">Craft Your Journey Now:</p>
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
          onClick={() => {
            if(!city) {
              alert("A journey of a thousand miles begins with a non-empty destination");
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
