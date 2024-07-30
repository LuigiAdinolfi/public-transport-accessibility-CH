import fetchStopPointsForDemo from "./fetchStopPointsForDemo";
import fetchAndStoreStopPointsToDB from "@/lib/fetchAndStoreStopPointsToDB";
import { storeStopPointToDBForDemo } from "@/db/storeStopPointToDBForDemo";

jest.mock("@/lib/fetchAndStoreStopPointsToDB");
jest.mock("@/db/storeStopPointToDBForDemo");

describe("fetchStopPointsForDemo", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call fetchAndStoreStopPointsToDB with correct parameters and return data on success", async () => {
    const mockData = { some: "stop point data" };

    // Mock fetchAndStoreStopPointsToDB to return mockData
    (fetchAndStoreStopPointsToDB as jest.Mock).mockResolvedValue(mockData);

    const result = await fetchStopPointsForDemo();

    // Verify that fetchAndStoreStopPointsToDB was called with the correct parameters
    expect(fetchAndStoreStopPointsToDB).toHaveBeenCalledWith(
      "/prm-directory/v1/stop-points",
      storeStopPointToDBForDemo,
    );
    // Verify that the result is the mock data
    expect(result).toEqual(mockData);
  });

  it("should return null and log an error if fetchAndStoreStopPointsToDB fails", async () => {
    // Mock fetchAndStoreStopPointsToDB to throw an error
    (fetchAndStoreStopPointsToDB as jest.Mock).mockRejectedValue(
      new Error("Test Error"),
    );

    // Capture console error
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const result = await fetchStopPointsForDemo();

    // Verify that fetchAndStoreStopPointsToDB was called with the correct parameters
    expect(fetchAndStoreStopPointsToDB).toHaveBeenCalledWith(
      "/prm-directory/v1/stop-points",
      storeStopPointToDBForDemo,
    );
    // Verify that the result is null due to the error
    expect(result).toBeNull();
    // Verify that the error was logged
    expect(consoleError).toHaveBeenCalledWith(
      "Failed to fetch stop points:",
      expect.any(Error),
    );

    consoleError.mockRestore();
  });
});
