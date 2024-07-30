import fetchAndStoreParkingLotsByParentSloid from "@/lib/fetchAndStoreParkingLotsByParentSloid";
import connectDB from "@/db/connectDB";
import fetchFromAPIByParentSloid from "@/lib/fetchFromAPIByParentSloid";
import ParkingLotToStore from "@/models/parkingLot";

jest.mock("@/db/connectDB");
jest.mock("@/lib/fetchFromAPIByParentSloid");
jest.mock("@/models/parkingLot");

const mockedConnectDB = connectDB as jest.MockedFunction<typeof connectDB>;
const mockedFetchFromAPIByParentSloid =
  fetchFromAPIByParentSloid as jest.MockedFunction<
    typeof fetchFromAPIByParentSloid
  >;
const mockedParkingLotToStore = ParkingLotToStore as jest.MockedFunction<
  typeof ParkingLotToStore
>;

describe("fetchAndStoreParkingLotsByParentSloid", () => {
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

    mockedFetchFromAPIByParentSloid.mockResolvedValue(mockData);
    mockedConnectDB.mockResolvedValue(undefined);
    mockedParkingLotToStore.mockReturnValue({
      updateOne: jest.fn().mockResolvedValue({}),
    } as any);

    const result = await fetchAndStoreParkingLotsByParentSloid(
      "/endpoint",
      (data) => data.map((item) => ({ id: item.id, ...item })),
      "parentSloid",
    );

    expect(result).toEqual(mockData);
    expect(mockedConnectDB).toHaveBeenCalledTimes(1);
    expect(mockedFetchFromAPIByParentSloid).toHaveBeenCalledWith(
      "/endpoint",
      "parentSloid",
    );
    expect(mockedParkingLotToStore).toHaveBeenCalledTimes(1);

    const parkingLotModel = mockedParkingLotToStore();
    expect(parkingLotModel.updateOne).toHaveBeenCalledTimes(2);
    expect(parkingLotModel.updateOne).toHaveBeenCalledWith(
      { id: "1" },
      { $set: { id: "1", field1: "value1" } },
      { upsert: true },
    );
    expect(parkingLotModel.updateOne).toHaveBeenCalledWith(
      { id: "2" },
      { $set: { id: "2", field2: "value2" } },
      { upsert: true },
    );
  });

  it("should handle errors during fetch operation", async () => {
    mockedFetchFromAPIByParentSloid.mockRejectedValue(new Error("Fetch error"));
    mockedConnectDB.mockResolvedValue(undefined);

    const result = await fetchAndStoreParkingLotsByParentSloid(
      "/endpoint",
      (data) => data.map((item) => ({ id: item.id, ...item })),
      "parentSloid",
    );

    expect(result).toBeNull();
    expect(mockedConnectDB).toHaveBeenCalledTimes(1);
    expect(mockedFetchFromAPIByParentSloid).toHaveBeenCalledWith(
      "/endpoint",
      "parentSloid",
    );
  });

  it("should handle errors during database upsert", async () => {
    const mockData = {
      objects: [{ id: "1", field1: "value1" }],
    };

    mockedFetchFromAPIByParentSloid.mockResolvedValue(mockData);
    mockedConnectDB.mockResolvedValue(undefined);
    mockedParkingLotToStore.mockReturnValue({
      updateOne: jest.fn().mockRejectedValue(new Error("Database error")),
    } as any);

    const result = await fetchAndStoreParkingLotsByParentSloid(
      "/endpoint",
      (data) => data.map((item) => ({ id: item.id, ...item })),
      "parentSloid",
    );

    expect(result).toBeNull();
    expect(mockedConnectDB).toHaveBeenCalledTimes(1);
    expect(mockedFetchFromAPIByParentSloid).toHaveBeenCalledWith(
      "/endpoint",
      "parentSloid",
    );
    const parkingLotModel = mockedParkingLotToStore();
    expect(parkingLotModel.updateOne).toHaveBeenCalledTimes(1);
  });
});
