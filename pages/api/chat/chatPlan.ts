import type { NextApiRequest, NextApiResponse } from "next";
import { travelPlanDataType } from "@/store/travelPlanDataSlice";
import travelerChat from "@/common/planTablePrompt";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: "edge", // this is a pre-requisite
};
export default async function handler(request: NextRequest) {
  const body: travelPlanDataType = await request.json();
  console.log(body);
  const { destination, features, tripLevel, days } = body;

  try {
    const travelPlan = await travelerChat.chatForPlan({
      destination,
      features,
      tripLevel,
      days,
    });
    return NextResponse.json(travelPlan, {
      status: 200,
    });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
