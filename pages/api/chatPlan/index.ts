import type { NextApiRequest, NextApiResponse } from "next";
import { travelPlanDataType } from "@/store/travelPlanDataSlice";
type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body: travelPlanDataType = req.body;
  const { destination, features, tripLevel, days } = body;
}
