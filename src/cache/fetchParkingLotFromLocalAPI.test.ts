import { fetchParkingLotFromLocalAPI } from "./fetchParkingLotFromLocalAPI";
import redis from "@/cache/redisClient";

// Mock dependencies
jest.mock("@/cache/redisClient", () => ({
  get: jest.fn(),
  set: jest.fn(),
}));

jest.mock("@/db/connectDB", () => jest.fn());

jest.mock("@/services/atlas/prm-directory/fetchParkingLotsByParentSloid", () =>
  jest.fn(),
);

jest.mock("@/models/parkingLot", () =>
  jest.fn(() => ({
    findOne: jest.fn(),
    updateOne: jest.fn(),
  })),
);

jest.mock("@/db/storeParkingLotToDB", () => ({
  storeParkingLotToDB: jest.fn(),
}));

describe("fetchParkingLotFromLocalAPI", () => {
  const parentServicePointSloid = "testSloid";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return data from Redis cache", async () => {
    const mockCacheData = JSON.stringify({
      id: "1",
      name: "Cached Parking Lot",
    });
    (redis.get as jest.Mock).mockResolvedValue(mockCacheData);

    const result = await fetchParkingLotFromLocalAPI(parentServicePointSloid);

    expect(redis.get).toHaveBeenCalledWith(
      `parkingLot:${parentServicePointSloid}`,
    );
    expect(result).toEqual({ data: JSON.parse(mockCacheData), ok: true });
  });

  it("should handle errors and return an error response", async () => {
    const mockError = new Error("Network Error");
    (redis.get as jest.Mock).mockRejectedValue(mockError); // Simulate Redis error

    const result = await fetchParkingLotFromLocalAPI(parentServicePointSloid);

    expect(result).toEqual({ data: { message: mockError }, ok: false });
  });
});
