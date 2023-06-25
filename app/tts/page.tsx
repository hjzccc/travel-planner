"use client";
import { useSWRGoogleApiSpotPlaceId } from "@/hooks/gooleMapApi/googleMapApis";
import React from "react";

function Page() {
  const { isLoading, spotIds, error } = useSWRGoogleApiSpotPlaceId(
    "Jack's Wife Freda in Soho at new york"
  );
  if (isLoading) return <div>Loading...</div>;
  console.log(spotIds, error);
  return <div>Page</div>;
}

export default Page;
