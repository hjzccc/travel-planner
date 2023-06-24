import type { NextApiRequest, NextApiResponse } from "next";
import { travelPlanDataType } from "@/store/travelPlanDataSlice";
import travelerChat from "@/common/planTablePrompt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body: travelPlanDataType = req.body;
  const { destination, features, tripLevel, days } = body;
  try {
    const travelPlan = await travelerChat.chatForPlan({
      destination,
      features,
      tripLevel,
      days,
    });
    res.status(200).json(travelPlan);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}
