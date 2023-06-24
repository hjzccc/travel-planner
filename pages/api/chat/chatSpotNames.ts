import type { NextApiRequest, NextApiResponse } from "next";
import { travelPlanDataType } from "@/store/travelPlanDataSlice";
import travelerChat from "@/common/planTablePrompt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body: { sentences: string[] } = req.body;
  const { sentences } = body;
  let spotNames: string[][] = [];
  try {
    for (const sentence of sentences) {
      const response = await travelerChat.chatPlanForSpotNames(sentence);
      spotNames.push(response);
    }
    res.status(200).json(spotNames);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}
