"use client";
import { useTravelPlanDataRedux } from "@/hooks/travelPlanData/hooks";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  const [city, setCity] = useState<string>("");
  const { doSetDestination } = useTravelPlanDataRedux();
  return (
    <div className="flex items-center justify-center w-screen h-screen ">
      <div className="flex flex-col items-center">
        <p>Enter the city you want to start your trip:</p>
        <input
          className="block mx-2 my-3"
          type="text"
          name="city"
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <button
          className="h-10 bg-slate-300 w-36"
          onClick={() => {
            doSetDestination(city);
            router.push("/days");
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
