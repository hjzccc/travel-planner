"use client";
import React, { Component } from "react";
import Lottie from "lottie-react";
import coolAnimation from "@/assets/2523-loading.json";
import textAnimation from "@/assets/animation_ljc27d9b.json";
import { Animate, AnimateGroup } from "react-simple-animate";
function Page() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <Lottie className="mb-6 h-96 w-96" animationData={coolAnimation}></Lottie>
      <Lottie animationData={textAnimation}></Lottie>
    </div>
  );
}

export default Page;
