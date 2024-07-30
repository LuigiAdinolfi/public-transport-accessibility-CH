import fetchAndStoreStopPointBySloidToDB from "@/lib/fetchAndStoreStopPointBySloidToDB";
import connectDB from "@/db/connectDB";
import fetchFromAPIBySloid from "@/lib/fetchFromAPIBySloid";
import { StopPointToStore } from "@/models/stopPoint";

jest.mock("@/db/connectDB");
jest.mock("@/lib/fetchFromAPIBySloid");
jest.mock("@/models/stopPoint");

const mockedConnectDB = connectDB as jest.MockedFunction<typeof connectDB>;
const mockedFetchFromAPIBySloid = fetchFromAPIBySloid as jest.MockedFunction<
  typeof fetchFromAPIBySloid
>;
const mockedStopPointToStore = StopPointToStore as jest.MockedFunction<
  typeof StopPointToStore
>;

describe("fetchAndStoreStopPointBySloidToDB", () => {
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
    mockedStopPointToStore.mockReturnValue({
      updateOne: jest.fn().mockResolvedValue({}),
    } as any);

    const result = await fetchAndStoreStopPointBySloidToDB(
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
    expect(mockedStopPointToStore).toHaveBeenCalledTimes(1);

    const stopPointModel = mockedStopPointToStore();
    expect(stopPointModel.updateOne).toHaveBeenCalledTimes(2);
    expect(stopPointModel.updateOne).toHaveBeenCalledWith(
      { id: "1" },
      { $set: { id: "1", field1: "value1" } },
      { upsert: true },
    );
    expect(stopPointModel.updateOne).toHaveBeenCalledWith(
      { id: "2" },
      { $set: { id: "2", field2: "value2" } },
      { upsert: true },
    );
  });

  it("should handle errors during fetch operation", async () => {
    mockedFetchFromAPIBySloid.mockRejectedValue(new Error("Fetch error"));
    mockedConnectDB.mockResolvedValue(undefined);

    const result = await fetchAndStoreStopPointBySloidToDB(
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
    mockedStopPointToStore.mockReturnValue({
      updateOne: jest.fn().mockRejectedValue(new Error("Database error")),
    } as any);

    const result = await fetchAndStoreStopPointBySloidToDB(
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
    const stopPointModel = mockedStopPointToStore();
    expect(stopPointModel.updateOne).toHaveBeenCalledTimes(1);
  });
});
