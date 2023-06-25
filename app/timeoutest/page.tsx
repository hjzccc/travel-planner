"use client";
import React from "react";
import useSWR from "swr";
import fetcher from "@/common/swrFetcher";
const timeoutfetcher = async () => {
  await new Promise((resolve) => setTimeout(resolve, 15000));
  return "done";
};
function Page() {
  const { data, isLoading, error } = useSWR("/api/chat/chatForPlan", (url) =>
    fetcher(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        destination: "New York",
        features: ["museum", "park", "restaurant"],
        days: 3,
        tripLevel: "normal",
      }),
    })
  );
  if (isLoading) return <div>loading...</div>;
  if (error) return <div>error</div>;
  return <div>Page</div>;
}

export default Page;
