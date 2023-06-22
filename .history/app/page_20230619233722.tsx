"use client";
import { useTravelPlanDataRedux } from "@/hooks/travelPlanData/hooks";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Button } from "antd";
export default function Home() {
  const router = useRouter();
  const [city, setCity] = useState<string>("");
  const { doSetDestination } = useTravelPlanDataRedux();
  const onBlur = () => {
    if(!city) {
      console.log('Input is empty')
    }
  }
  return (
    <div className="flex items-center justify-center w-screen h-screen ">
      <div className="flex flex-col items-center">
        <p>Enter the city you want to start your trip:</p>
        <Input
          className="block mx-2 my-3"
          type="text"
          name="city"
          onChange={(e) => {
            setCity(e.target.value);
          }}
          onBlur={onBlur}
        />
        <Button 
          type="primary"
          className="h-10 bg-slate-300 w-36"
          onClick={() => {
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
