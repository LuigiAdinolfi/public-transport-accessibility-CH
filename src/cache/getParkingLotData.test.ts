import { getParkingLotData } from "./getParkingLotData";
import { retrieveParkingLotData } from "@/cache/retrieveParkingLotData";

// Mock the fetchParkingLotFromLocalAPI function
jest.mock("@/cache/retrieveParkingLotData", () => ({
  retrieveParkingLotData: jest.fn(),
}));

describe("getParkingLotData", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return parking lot data as a plain object when the fetch is successful", async () => {
    const parentServicePointSloid = "testSloid";
    const mockData = { id: "1", name: "Test Parking Lot" };

    // Mock the function to return a successful response
    (retrieveParkingLotData as jest.Mock).mockResolvedValue({
      data: mockData,
      ok: true,
    });

    const result = await getParkingLotData(parentServicePointSloid);

    // Verify that fetchParkingLotFromLocalAPI was called with the correct SLOID
    expect(retrieveParkingLotData).toHaveBeenCalledWith(
      parentServicePointSloid,
    );

    // Verify that the result is the mock data as a plain object
    expect(result).toEqual(mockData);
  });

  it("should log an error and return an empty object when an exception occurs during the fetch", async () => {
    const parentServicePointSloid = "testSloid";

    // Mock the function to throw an error
    (retrieveParkingLotData as jest.Mock).mockRejectedValue(
      new Error("Network Error"),
    );

    // Capture console log
    const consoleLog = jest.spyOn(console, "log").mockImplementation(() => {});

    const result = await getParkingLotData(parentServicePointSloid);

    // Verify that fetchParkingLotFromLocalAPI was called with the correct SLOID
    expect(retrieveParkingLotData).toHaveBeenCalledWith(
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
