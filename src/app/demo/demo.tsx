"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import fetchFromAPI from "@/lib/fetchFromAPI";
import { fetchStopPointsMongoDBClient } from "@/app/demo/fetchStopPointsMongoDBClient";
import { fetchStopPointsRedisClient } from "@/app/demo/fetchStopPointsRedisClient";

const endpoint = "/prm-directory/v1/stop-points";

/**
 * Fetch data from the given API endpoint directly.
 *
 * @param {string} endpoint - The API endpoint to fetch data from.
 * @returns {Promise<{ data: any; time: number }>} - An object containing the fetched data and the time taken for the request.
 */
const fetchDirectly = async (endpoint: string) => {
  const start = performance.now();
  const data = await fetchFromAPI(endpoint);
  const end = performance.now();
  return { data, time: end - start };
};

/**
 * Fetch data from MongoDB.
 *
 * @returns {Promise<{ data: any; time: number }>} - An object containing the fetched data and the time taken for the request.
 */
const fetchFromMongoDB = async () => {
  const start = performance.now();
  const data = await fetchStopPointsMongoDBClient();
  const end = performance.now();
  return { data, time: end - start };
};

/**
 * Fetch data from Redis cache.
 *
 * @returns {Promise<{ data: any; time: number }>} - An object containing the fetched data and the time taken for the request.
 */
const fetchFromRedisCacheWrapper = async () => {
  const start = performance.now();
  const data = await fetchStopPointsRedisClient();
  const end = performance.now();
  return { data, time: end - start };
};

/**
 * Demo component for fetching and displaying data from various sources.
 * Includes buttons to fetch data and displays the results with timing information.
 *
 * @returns {React.ReactElement} - The Demo component, which displays the results of fetching data from different sources.
 */
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

  /**
   * Handles the fetch data action.
   * Fetches data from API, MongoDB, and Redis cache sequentially,
   * and updates the state with the results and timings.
   */
  const handleFetchData = async () => {
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
      {/* Button to trigger data fetch */}
      <Button
        className="w-48 px-4 py-2"
        onClick={handleFetchData}
        disabled={loading}
      >
        {loading ? "Loading..." : "Fetch Data"}
      </Button>

      <div className="flex w-full flex-wrap justify-around">
        {/* API Direct Call Results */}
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

        {/* MongoDB Call Results */}
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

        {/* Redis Cache Call Results */}
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
