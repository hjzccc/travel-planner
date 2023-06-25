"use client";
import React from "react";
import useSWR from "swr";
const timeoutfetcher = async () => {
  await new Promise((resolve) => setTimeout(resolve, 15000));
  return "done";
};
function Page() {
  const { data, isLoading, error } = useSWR("/api", timeoutfetcher);
  if (isLoading) return <div>loading...</div>;
  if (error) return <div>error</div>;
  return <div>Page</div>;
}

export default Page;
