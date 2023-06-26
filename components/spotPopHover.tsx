import fetcher from "@/common/swrFetcher";
import { SpotDetailsResponseBody } from "@/pages/api/getSpotDetails";
import React from "react";
import useSWR, { mutate } from "swr";
import { Spin, Result, Button, Image, Rate } from "antd";
import { EnvironmentFilled, MoneyCollectFilled } from "@ant-design/icons";
type Props = {
  spotName?: string;
};
function Page({ spotName }: Props) {
  const { data, error, isLoading, mutate } = useSWR<SpotDetailsResponseBody>(
    `/api/getSpotDetails?spotName=${spotName}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
    }
  );
  if (isLoading || !spotName) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Spin></Spin>
      </div>
    );
  }
  if (error) {
    return (
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={
          <Button type="primary" onClick={() => mutate()}>
            Reload
          </Button>
        }
      ></Result>
    );
  }
  console.log(data, error);
  return (
    <div className=" bg-slate-100">
      <div className="relative">
        <Image
          src={`data:image/png;base64,${data?.photos[0]}`}
          fallback="xxx"
          className="w-screen"
          width={380}
          height={290}
        ></Image>
        <div className="absolute top-36">
          <div className="ml-5 text-4xl font-black text-slate-200 font-Caprasimo">
            {data?.name}
          </div>
          <div className="relative mt-2 ">
            <div className="inline-block ml-5">
              <EnvironmentFilled className=" text-slate-200" />
            </div>
            <div className="absolute inline-block pt-1 pl-2 text-slate-200 font-Caprasimo">
              {data?.formatted_address}
            </div>
          </div>
        </div>
      </div>
      <div>
        <span className="pl-3 font-bold font-Caprasimo">Rating:</span>
        <Rate
          disabled
          defaultValue={data?.rating}
          className="relative left-1"
        ></Rate>
      </div>
      <div>
        <span className="pl-3 font-bold font-Caprasimo">Price:</span>
        <Rate
          disabled
          className="relative left-3.5"
          defaultValue={data?.price_level}
          //@ts-ignore
          character={({ index }: { index: number }) => {
            //@ts-ignore
            if (index < data?.price_level) {
              return <MoneyCollectFilled className="text-red-400 " />;
            } else {
              return <MoneyCollectFilled />;
            }
          }}
        ></Rate>
      </div>
    </div>
  );
}

export default Page;
