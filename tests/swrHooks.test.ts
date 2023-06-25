import { waitFor } from "@testing-library/react";
import { useSWRGoogleApiSpotPlaceId } from "@/hooks/gooleMapApi/googleMapApis";
describe("testHooks", () => {
  it("should run before and after hooks", async () => {
    const { spotIds, error, isLoading } = useSWRGoogleApiSpotPlaceId(
      "Jack's Wife Freda in Soho at new york"
    );
    await waitFor(() => {
      isLoading === false;
    });
    console.log(spotIds);
  });
});
