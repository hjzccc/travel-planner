"use client";
import { useTravelPlanDataRedux } from "@/hooks/travelPlanData/hooks";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Button } from "antd";

export default function Home() {
  const router = useRouter();
  const [city, setCity] = useState<string>("");
  const { doSetDestination } = useTravelPlanDataRedux();

  return (
    <div className="flex items-center justify-center w-screen h-screen ">
      <div className="flex flex-col items-center">
        <p>Enter the city you want to start your trip:</p>
        <Input
          className="mx-2 my-3"
          placeholder="Craft Your Journey NOW!"
          allowClear
          type="text"
          name="city"
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <Button 
          type="primary"
          className="h-10 bg-slate-300 w-36"
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
