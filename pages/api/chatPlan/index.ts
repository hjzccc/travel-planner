import type { NextApiRequest, NextApiResponse } from "next";
import { travelPlanDataType } from "@/store/travelPlanDataSlice";
import { chatForPlan } from "@/common/planTablePrompt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body: travelPlanDataType = req.body;
  const { destination, features, tripLevel, days } = body;
  const travelPlan = await chatForPlan({
    destination,
    features,
    tripLevel,
    days,
  });
  return res.status(200).json(travelPlan);
}
