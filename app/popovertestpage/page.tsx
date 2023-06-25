"use client";
import { useAppDispath } from "@/hooks/redux/hooks";
import React from "react";
import SpotPopHover from "@/components/spotPopHover";
import { Popover } from "antd";
function Page() {
  return (
    <div className="w-screen h-screen">
      <Popover
        content={
          <SpotPopHover spotName="chihuly garden and glass musem in seattle"></SpotPopHover>
        }
        trigger="click"
      >
        <span>Sarabeth's Central Park South in New York</span>
      </Popover>
    </div>
  );
}

export default Page;
