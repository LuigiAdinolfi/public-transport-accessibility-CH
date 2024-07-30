import fetchParkingLotsByParentSloid from "./fetchParkingLotsByParentSloid";
import fetchAndStoreParkingLotsByParentSloid from "@/lib/fetchAndStoreParkingLotsByParentSloid";
import { storeParkingLotToDB } from "@/db/storeParkingLotToDB";

jest.mock("@/lib/fetchAndStoreParkingLotsByParentSloid");
jest.mock("@/db/storeParkingLotToDB");

describe("fetchParkingLotsByParentSloid", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call fetchAndStoreParkingLotsByParentSloid with correct parameters and return data on success", async () => {
    const parentSloid = "parentSloid123";
    const mockData = { some: "data" };

    // Mock the fetchAndStoreParkingLotsByParentSloid function to return mockData
    (fetchAndStoreParkingLotsByParentSloid as jest.Mock).mockResolvedValue(
      mockData,
    );

    const result = await fetchParkingLotsByParentSloid(parentSloid);

    // Check that fetchAndStoreParkingLotsByParentSloid was called with the correct parameters
    expect(fetchAndStoreParkingLotsByParentSloid).toHaveBeenCalledWith(
      "/prm-directory/v1/parking-lots/",
      storeParkingLotToDB,
      parentSloid,
    );
    // Check that the result matches the mock data
    expect(result).toEqual(mockData);
  });

  it("should return null and log an error if fetchAndStoreParkingLotsByParentSloid fails", async () => {
    const parentSloid = "parentSloid123";

    // Mock the fetchAndStoreParkingLotsByParentSloid function to throw an error
    (fetchAndStoreParkingLotsByParentSloid as jest.Mock).mockRejectedValue(
      new Error("Test Error"),
    );

    // Capture console error
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const result = await fetchParkingLotsByParentSloid(parentSloid);

    // Check that fetchAndStoreParkingLotsByParentSloid was called with the correct parameters
    expect(fetchAndStoreParkingLotsByParentSloid).toHaveBeenCalledWith(
      "/prm-directory/v1/parking-lots/",
      storeParkingLotToDB,
      parentSloid,
    );
    // Check that the result is null due to the error
    expect(result).toBeNull();
    // Check that the error was logged
    expect(consoleError).toHaveBeenCalledWith(
      `Failed to fetch parking lots data for parent SLOID ${parentSloid}:`,
      expect.any(Error),
    );

    consoleError.mockRestore();
  });
});
