"use client";
import { useTravelPlanDataRedux } from "@/hooks/travelPlanData/hooks";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Button } from "antd";
import classNames from 'classnames';
const InputGroup = Input.Group;

export default function Home() {
  const router = useRouter();
  const [city, setCity] = useState<string>("");
  const { doSetDestination } = useTravelPlanDataRedux();

  const btnCls = classNames({
    'ant-search-btn': true,
    'ant-search-btn-noempty': !!this.state.value.trim(),
  });
  const searchCls = classNames({
    'ant-search-input': true,
    'ant-search-input-focus': this.state.focus,
  });

  return (
    <div className="flex items-center justify-center w-screen h-screen ">
      <div className="flex flex-col items-center">
        <p>Enter the city you want to start your trip:</p>
        <InputGroup 
        <Input
          className="block mx-2 my-3"
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
