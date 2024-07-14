"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import fetchFromAPI from "@/lib/fetchFromAPI";
import { fetchStopPointsMongoDBClient } from "@/app/demo/fetchStopPointsMongoDBClient";
import { fetchStopPointsRedisClient } from "@/app/demo/fetchStopPointsRedisClient";

const endpoint = "/prm-directory/v1/stop-points";

const fetchDirectly = async (endpoint: string) => {
  const start = performance.now();
  const data = await fetchFromAPI(endpoint);
  const end = performance.now();
  return { data, time: end - start };
};

const fetchFromMongoDB = async () => {
  const start = performance.now();
  const data = await fetchStopPointsMongoDBClient();
  const end = performance.now();
  return { data, time: end - start };
};

const fetchFromRedisCacheWrapper = async () => {
  const start = performance.now();
  const data = await fetchStopPointsRedisClient();
  const end = performance.now();
  return { data, time: end - start };
};

const Demo = () => {
  const [apiResult, setApiResult] = useState<{
    data: any;
    time: number;
  } | null>(null);
  const [mongoResult, setMongoResult] = useState<{
    data: any;
    time: number;
  } | null>(null);
  const [redisResult, setRedisResult] = useState<{
    data: any;
    time: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFetchData = async () => {
    // Uncomment the following lines to fetch data in parallel

    // const [apiData, mongoData, redisData] = await Promise.all([
    //   fetchDirectly(endpoint),
    //   fetchFromMongoDB(),
    //   fetchFromRedisCacheWrapper(),
    // ]);
    //
    // setApiResult(apiData);
    // setMongoResult(mongoData);
    // setRedisResult(redisData);

    setLoading(true);

    try {
      const apiData = await fetchDirectly(endpoint);
      const mongoData = await fetchFromMongoDB();
      const redisData = await fetchFromRedisCacheWrapper();

      setApiResult(apiData);
      setMongoResult(mongoData);
      setRedisResult(redisData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-14 flex flex-col items-center space-y-16">
      <Button
        className="w-48 px-4 py-2"
        onClick={handleFetchData}
        disabled={loading}
      >
        {loading ? "Loading..." : "Fetch Data"}
      </Button>
      <div className="flex w-full flex-wrap justify-around">
        <div className="w-full p-4 md:w-1/3">
          <div className="rounded-md border p-4">
            <h2 className="mb-2 text-[1.5rem] font-bold">API Direct Call</h2>
            {loading && <p>Loading...</p>}
            {apiResult && !loading && (
              <div className="max-w-full overflow-x-auto">
                <div className="pb-8">
                  <span className="mb-2 text-[1.3rem]">Time: </span>
                  <span className="text-[1.3rem] font-semibold">
                    {apiResult.time} ms
                  </span>
                </div>
                <pre>{JSON.stringify(apiResult.data, null, 2)}</pre>
              </div>
            )}
          </div>
        </div>
        <div className="w-full p-4 md:w-1/3">
          <div className="rounded-md border p-4">
            <h2 className="mb-2 text-[1.5rem] font-bold">MongoDB Call</h2>
            {loading && <p>Loading...</p>}
            {mongoResult && !loading && (
              <div className="max-w-full overflow-x-auto">
                <div className="pb-8">
                  <span className="mb-2 text-[1.3rem]">Time: </span>
                  <span className="text-[1.3rem] font-semibold">
                    {mongoResult.time} ms
                  </span>
                </div>
                <pre>{JSON.stringify(mongoResult.data, null, 2)}</pre>
              </div>
            )}
          </div>
        </div>
        <div className="w-full p-4 md:w-1/3">
          <div className="rounded-md border p-4">
            <h2 className="mb-2 text-[1.5rem] font-bold">Redis Cache Call</h2>
            {loading && <p>Loading...</p>}
            {redisResult && !loading && (
              <div className="max-w-full overflow-x-auto">
                <div className="pb-8">
                  <span className="mb-2 text-[1.3rem]">Time: </span>
                  <span className="text-[1.3rem] font-semibold">
                    {redisResult.time} ms
                  </span>
                </div>
                <pre>{JSON.stringify(redisResult.data, null, 2)}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
