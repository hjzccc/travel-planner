import {
  PlaceApiFindPlaceResponse,
  PlaceDetailsApiResponse,
} from "@/types/googleWebApi";
import type { NextApiRequest, NextApiResponse } from "next";

type SpotDetailsResponseBody = {
  formatted_address: string;
  name: string;
  open_now: boolean;
  photos_references: string[];
  price_level: number;
  rating: number;
  website: string;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SpotDetailsResponseBody | { message: string }>
) {
  try {
    const body = req.body;
    const spotName = body.spotName;
    console.log(spotName);
    const getSpotIdUrl = new URL(
      "https://maps.googleapis.com/maps/api/place/findplacefromtext/json"
    );
    getSpotIdUrl.searchParams.append("input", spotName);
    getSpotIdUrl.searchParams.append("inputtype", "textquery");
    getSpotIdUrl.searchParams.append("fields", "place_id");
    getSpotIdUrl.searchParams.append(
      "key",
      process.env.GOOGLE_MAP_API_KEY as string
    );
    console.log(getSpotIdUrl);
    const response = await fetch(getSpotIdUrl, {
      method: "GET",
    });
    const responseData: PlaceApiFindPlaceResponse = await response.json();
    if (responseData.status !== "OK") {
      throw new Error("Google API Error");
    }
    const spotId = responseData.candidates[0].place_id;
    const getSpotDetailsUrl = new URL(
      "https://maps.googleapis.com/maps/api/place/details/json"
    );
    getSpotDetailsUrl.searchParams.append("place_id", spotId);
    getSpotDetailsUrl.searchParams.append(
      "fields",
      "name,rating,website,price_level,photo,opening_hours"
    );
    getSpotDetailsUrl.searchParams.append(
      "key",
      process.env.GOOGLE_MAP_API_KEY as string
    );
    console.log(getSpotDetailsUrl);
    const spotDetailsResponse = await fetch(getSpotDetailsUrl, {
      method: "GET",
    });
    const spotDetailsResponseData: PlaceDetailsApiResponse =
      await spotDetailsResponse.json();
    console.log(spotDetailsResponseData);
    if (spotDetailsResponseData.status !== "OK") {
      throw new Error("Google API Error");
    }
    return res.status(200).json({
      formatted_address: spotDetailsResponseData.result.formatted_address,
      name: spotDetailsResponseData.result.name,
      open_now: spotDetailsResponseData.result.opening_hours?.open_now || true,
      photos_references: spotDetailsResponseData.result.photos.map(
        (photo) => photo.photo_reference
      ),
      price_level: spotDetailsResponseData.result.price_level,
      rating: spotDetailsResponseData.result.rating,
      website: spotDetailsResponseData.result.website,
    });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
