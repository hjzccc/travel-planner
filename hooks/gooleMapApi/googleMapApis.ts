import useSWR from "swr";
import fetcher from "@/common/swrFetcher";
import { PlaceDetailsApiResponse } from "@/types/googleWebApi";
export const useSWRGoogleApiSpotPlaceId = (spotName: string) => {
  const url = new URL(
    "https://maps.googleapis.com/maps/api/place/findplacefromtext/json"
  );
  url.searchParams.append("input", encodeURIComponent(spotName));
  url.searchParams.append("inputtype", "textquery");
  url.searchParams.append("fields", "place_id");
  url.searchParams.append("key", process.env.GOOGLE_MAP_API_KEY as string);
  const { data, error, isLoading } = useSWR(url, (url) => fetcher(url));

  return {
    spotIds: data,
    isLoading,
    error,
  };
};
export const useSWRGoogleApiSpotDetails = (placeId: string) => {
  const url = new URL(
    "https://maps.googleapis.com/maps/api/place/details/json"
  );
  url.searchParams.append("place_id", placeId);
  url.searchParams.append(
    "fields",
    encodeURIComponent("name,geometry,photos,formatted_address")
  );
  url.searchParams.append("key", process.env.GOOGLE_MAP_API_KEY as string);
  const { data, error, isLoading } = useSWR<PlaceDetailsApiResponse>(
    url,
    (url) => fetcher(url)
  );
  return {
    spotDetails: data,
    isLoading,
    error,
  };
};
