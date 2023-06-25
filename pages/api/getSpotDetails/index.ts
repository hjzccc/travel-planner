import {
  PlaceApiFindPlaceResponse,
  PlaceDetailsApiResponse,
} from "@/types/googleWebApi";
import type { NextApiRequest, NextApiResponse } from "next";

export type SpotDetailsResponseBody = {
  formatted_address: string;
  name: string;
  open_now: boolean;
  photos: string[];
  price_level: number;
  rating: number;
  website: string;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SpotDetailsResponseBody | { message: string }>
) {
  try {
    const { spotName } = req.query;
    const getSpotIdUrl = new URL(
      "https://maps.googleapis.com/maps/api/place/findplacefromtext/json"
    );
    getSpotIdUrl.searchParams.append("input", spotName as string);
    getSpotIdUrl.searchParams.append("inputtype", "textquery");
    getSpotIdUrl.searchParams.append("fields", "place_id");
    getSpotIdUrl.searchParams.append(
      "key",
      process.env.GOOGLE_MAP_API_KEY as string
    );
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
      "name,rating,website,price_level,photo,opening_hours,formatted_address"
    );
    getSpotDetailsUrl.searchParams.append(
      "key",
      process.env.GOOGLE_MAP_API_KEY as string
    );
    const spotDetailsResponse = await fetch(getSpotDetailsUrl, {
      method: "GET",
    });
    const spotDetailsResponseData: PlaceDetailsApiResponse =
      await spotDetailsResponse.json();
    if (spotDetailsResponseData.status !== "OK") {
      throw new Error("Google API Error");
    }

    let photos: string[] = [];
    if (spotDetailsResponseData.result.photos.length > 0) {
      const getPhotoUrl = new URL(
        "https://maps.googleapis.com/maps/api/place/photo"
      );
      getPhotoUrl.searchParams.append("maxwidth", "400");
      getPhotoUrl.searchParams.append(
        "photo_reference",
        spotDetailsResponseData.result.photos[0].photo_reference
      );
      getPhotoUrl.searchParams.append(
        "key",
        process.env.GOOGLE_MAP_API_KEY as string
      );
      const photoResponse = await fetch(getPhotoUrl, { method: "GET" });
      const photoResponseData = await photoResponse.arrayBuffer();
      const base64Image = Buffer.from(photoResponseData).toString("base64");
      photos.push(base64Image);
      console.log(photoResponseData);
    }
    return res.status(200).json({
      formatted_address: spotDetailsResponseData.result.formatted_address,
      name: spotDetailsResponseData.result.name,
      open_now: spotDetailsResponseData.result.opening_hours?.open_now || true,
      photos: photos,
      price_level: spotDetailsResponseData.result.price_level,
      rating: spotDetailsResponseData.result.rating,
      website: spotDetailsResponseData.result.website,
    });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
