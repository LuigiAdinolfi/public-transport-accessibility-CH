import fetchAndStoreStopPointsToDB from "@/lib/fetchAndStoreStopPointsToDB";
import fetchFromAPI from "@/lib/fetchFromAPI";
import connectDB from "@/db/connectDB";
import StopPointToStoreForDemo from "@/models/stopPointForDemo";

jest.mock("@/lib/fetchFromAPI");
jest.mock("@/db/connectDB");
jest.mock("@/models/stopPointForDemo");

const mockedFetchFromAPI = fetchFromAPI as jest.MockedFunction<
  typeof fetchFromAPI
>;
const mockedConnectDB = connectDB as jest.MockedFunction<typeof connectDB>;
const mockedStopPointToStoreForDemo =
  StopPointToStoreForDemo as jest.MockedFunction<
    typeof StopPointToStoreForDemo
  >;

describe("fetchAndStoreStopPointsToDB", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should connect to the database and upsert data successfully", async () => {
    const mockData = {
      objects: [
        { id: "1", field1: "value1" },
        { id: "2", field2: "value2" },
      ],
    };

    mockedFetchFromAPI.mockResolvedValue(mockData);
    mockedConnectDB.mockResolvedValue(undefined);
    mockedStopPointToStoreForDemo.mockReturnValue({
      updateOne: jest.fn().mockResolvedValue({}),
    } as any);

    const result = await fetchAndStoreStopPointsToDB("/endpoint", (data) =>
      data.map((item) => ({ id: item.id, ...item })),
    );

    expect(result).toEqual(mockData.objects);
    expect(mockedConnectDB).toHaveBeenCalledTimes(1);
    expect(mockedFetchFromAPI).toHaveBeenCalledWith("/endpoint");
    expect(mockedStopPointToStoreForDemo).toHaveBeenCalledTimes(1);

    const stopPointsModel = mockedStopPointToStoreForDemo();
    expect(stopPointsModel.updateOne).toHaveBeenCalledTimes(2);
    expect(stopPointsModel.updateOne).toHaveBeenCalledWith(
      { id: "1" },
      { $set: { id: "1", field1: "value1" } },
      { upsert: true },
    );
    expect(stopPointsModel.updateOne).toHaveBeenCalledWith(
      { id: "2" },
      { $set: { id: "2", field2: "value2" } },
      { upsert: true },
    );
  });

  it("should handle invalid response structure", async () => {
    mockedFetchFromAPI.mockResolvedValue({ invalidField: [] });
    mockedConnectDB.mockResolvedValue(undefined);

    const result = await fetchAndStoreStopPointsToDB("/endpoint", (data) =>
      data.map((item) => ({ id: item.id, ...item })),
    );

    expect(result).toBeNull();
    expect(mockedConnectDB).toHaveBeenCalledTimes(1);
    expect(mockedFetchFromAPI).toHaveBeenCalledWith("/endpoint");
  });

  it("should handle errors during fetch", async () => {
    mockedFetchFromAPI.mockRejectedValue(new Error("Fetch error"));
    mockedConnectDB.mockResolvedValue(undefined);

    const result = await fetchAndStoreStopPointsToDB("/endpoint", (data) =>
      data.map((item) => ({ id: item.id, ...item })),
    );

    expect(result).toBeNull();
    expect(mockedConnectDB).toHaveBeenCalledTimes(1);
    expect(mockedFetchFromAPI).toHaveBeenCalledWith("/endpoint");
  });

  it("should handle errors during database upsert", async () => {
    const mockData = {
      objects: [{ id: "1", field1: "value1" }],
    };

    mockedFetchFromAPI.mockResolvedValue(mockData);
    mockedConnectDB.mockResolvedValue(undefined);
    mockedStopPointToStoreForDemo.mockReturnValue({
      updateOne: jest.fn().mockRejectedValue(new Error("Database error")),
    } as any);

    const result = await fetchAndStoreStopPointsToDB("/endpoint", (data) =>
      data.map((item) => ({ id: item.id, ...item })),
    );

    expect(result).toBeNull();
    expect(mockedConnectDB).toHaveBeenCalledTimes(1);
    expect(mockedFetchFromAPI).toHaveBeenCalledWith("/endpoint");
    const stopPointsModel = mockedStopPointToStoreForDemo();
    expect(stopPointsModel.updateOne).toHaveBeenCalledTimes(1);
  });
});
