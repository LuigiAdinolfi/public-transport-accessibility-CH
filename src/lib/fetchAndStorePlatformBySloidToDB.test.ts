import fetchAndStorePlatformBySloidToDB from "@/lib/fetchAndStorePlatformBySloidToDB";
import connectDB from "@/db/connectDB";
import fetchFromAPIBySloid from "@/lib/fetchFromAPIBySloid";
import PlatformToStore from "@/models/platform";

jest.mock("@/db/connectDB");
jest.mock("@/lib/fetchFromAPIBySloid");
jest.mock("@/models/platform");

const mockedConnectDB = connectDB as jest.MockedFunction<typeof connectDB>;
const mockedFetchFromAPIBySloid = fetchFromAPIBySloid as jest.MockedFunction<
  typeof fetchFromAPIBySloid
>;
const mockedPlatformToStore = PlatformToStore as jest.MockedFunction<
  typeof PlatformToStore
>;

describe("fetchAndStorePlatformBySloidToDB", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should connect to the database, fetch data, process it, and upsert to MongoDB successfully", async () => {
    const mockData = {
      objects: [
        { id: "1", field1: "value1" },
        { id: "2", field2: "value2" },
      ],
    };

    mockedFetchFromAPIBySloid.mockResolvedValue(mockData);
    mockedConnectDB.mockResolvedValue(undefined);
    mockedPlatformToStore.mockReturnValue({
      updateOne: jest.fn().mockResolvedValue({}),
    } as any);

    const result = await fetchAndStorePlatformBySloidToDB(
      "/endpoint",
      (data) => data.map((item) => ({ id: item.id, ...item })),
      "sloid",
    );

    expect(result).toEqual(mockData);
    expect(mockedConnectDB).toHaveBeenCalledTimes(1);
    expect(mockedFetchFromAPIBySloid).toHaveBeenCalledWith(
      "/endpoint",
      "sloid",
    );
    expect(mockedPlatformToStore).toHaveBeenCalledTimes(1);

    const platformModel = mockedPlatformToStore();
    expect(platformModel.updateOne).toHaveBeenCalledTimes(2);
    expect(platformModel.updateOne).toHaveBeenCalledWith(
      { id: "1" },
      { $set: { id: "1", field1: "value1" } },
      { upsert: true },
    );
    expect(platformModel.updateOne).toHaveBeenCalledWith(
      { id: "2" },
      { $set: { id: "2", field2: "value2" } },
      { upsert: true },
    );
  });

  it("should handle errors during fetch operation", async () => {
    mockedFetchFromAPIBySloid.mockRejectedValue(new Error("Fetch error"));
    mockedConnectDB.mockResolvedValue(undefined);

    const result = await fetchAndStorePlatformBySloidToDB(
      "/endpoint",
      (data) => data.map((item) => ({ id: item.id, ...item })),
      "sloid",
    );

    expect(result).toBeNull();
    expect(mockedConnectDB).toHaveBeenCalledTimes(1);
    expect(mockedFetchFromAPIBySloid).toHaveBeenCalledWith(
      "/endpoint",
      "sloid",
    );
  });

  it("should handle errors during database upsert", async () => {
    const mockData = {
      objects: [{ id: "1", field1: "value1" }],
    };

    mockedFetchFromAPIBySloid.mockResolvedValue(mockData);
    mockedConnectDB.mockResolvedValue(undefined);
    mockedPlatformToStore.mockReturnValue({
      updateOne: jest.fn().mockRejectedValue(new Error("Database error")),
    } as any);

    const result = await fetchAndStorePlatformBySloidToDB(
      "/endpoint",
      (data) => data.map((item) => ({ id: item.id, ...item })),
      "sloid",
    );

    expect(result).toBeNull();
    expect(mockedConnectDB).toHaveBeenCalledTimes(1);
    expect(mockedFetchFromAPIBySloid).toHaveBeenCalledWith(
      "/endpoint",
      "sloid",
    );
    const platformModel = mockedPlatformToStore();
    expect(platformModel.updateOne).toHaveBeenCalledTimes(1);
  });
});
