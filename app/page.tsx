"use client";
import { useState } from "react";
export default function Home() {
  const [city, setCity] = useState<string>("");
  return (
    <div className="flex items-center justify-center w-screen h-screen ">
      <div className="content-center ">
        <p>
          Enter the city you want to start your trip:
          <form>
            <input
              type="text"
              name="city"
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
            <button type="submit">Submit</button>
          </form>
        </p>
      </div>
    </div>
  );
}
