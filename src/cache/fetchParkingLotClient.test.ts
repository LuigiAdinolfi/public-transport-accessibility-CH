import { fetchParkingLotClient } from "./fetchParkingLotClient";
import { fetchParkingLotFromLocalAPI } from "@/cache/fetchParkingLotFromLocalAPI";

// Mock the fetchParkingLotFromLocalAPI function
jest.mock("@/cache/fetchParkingLotFromLocalAPI", () => ({
  fetchParkingLotFromLocalAPI: jest.fn(),
}));

describe("fetchParkingLotClient", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return parking lot data as a plain object when the fetch is successful", async () => {
    const parentServicePointSloid = "testSloid";
    const mockData = { id: "1", name: "Test Parking Lot" };

    // Mock the function to return a successful response
    (fetchParkingLotFromLocalAPI as jest.Mock).mockResolvedValue({
      data: mockData,
      ok: true,
    });

    const result = await fetchParkingLotClient(parentServicePointSloid);

    // Verify that fetchParkingLotFromLocalAPI was called with the correct SLOID
    expect(fetchParkingLotFromLocalAPI).toHaveBeenCalledWith(
      parentServicePointSloid,
    );

    // Verify that the result is the mock data as a plain object
    expect(result).toEqual(mockData);
  });

  it("should log an error and return an empty object when an exception occurs during the fetch", async () => {
    const parentServicePointSloid = "testSloid";

    // Mock the function to throw an error
    (fetchParkingLotFromLocalAPI as jest.Mock).mockRejectedValue(
      new Error("Network Error"),
    );

    // Capture console log
    const consoleLog = jest.spyOn(console, "log").mockImplementation(() => {});

    const result = await fetchParkingLotClient(parentServicePointSloid);

    // Verify that fetchParkingLotFromLocalAPI was called with the correct SLOID
    expect(fetchParkingLotFromLocalAPI).toHaveBeenCalledWith(
      parentServicePointSloid,
    );

    // Verify that an error message was logged
    expect(consoleLog).toHaveBeenCalledWith(
      `Parking lot with parent SLOID ${parentServicePointSloid} not found!`,
    );

    // Verify that the result is an empty object
    expect(result).toEqual({});

    consoleLog.mockRestore();
  });
});
