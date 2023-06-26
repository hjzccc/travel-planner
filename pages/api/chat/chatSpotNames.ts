import type { NextApiRequest, NextApiResponse } from "next";
import { travelPlanDataType } from "@/store/travelPlanDataSlice";
import travelerChat from "@/common/planTablePrompt";
import { useAppDispath } from "@/hooks/redux/hooks";
import { NextRequest, NextResponse } from "next/server";
export const config = {
  runtime: "edge", // this is a pre-requisite
};
export default async function handler(req: NextRequest) {
  const body = await req.json();
  const { sentences } = body;
  let spotNames: string[][] = [];
  try {
    for (const sentence of sentences) {
      const response = await travelerChat.chatPlanForSpotNames(sentence);
      spotNames.push(response);
    }
    return NextResponse.json(spotNames, {
      status: 200,
    });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
