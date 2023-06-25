import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;
  const spotName = body.spotName;
  const url = new URL(
    "https://maps.googleapis.com/maps/api/place/findplacefromtext/json"
  );
  url.searchParams.append("input", encodeURIComponent(spotName));
  url.searchParams.append("inputtype", "textquery");
  url.searchParams.append("fields", "place_id");
  url.searchParams.append("key", process.env.GOOGLE_MAP_API_KEY as string);
  const ff = await fetch(url, { method: "GET" });
  res.status(200).json({ name: "Example" });
}
