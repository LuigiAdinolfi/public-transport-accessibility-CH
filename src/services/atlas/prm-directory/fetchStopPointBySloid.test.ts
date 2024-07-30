import fetchStopPointBySloid from "./fetchStopPointBySloid";
import fetchAndStoreStopPointBySloidToDB from "@/lib/fetchAndStoreStopPointBySloidToDB";
import { storeStopPointToDB } from "@/db/storeStopPointToDB";

jest.mock("@/lib/fetchAndStoreStopPointBySloidToDB");
jest.mock("@/db/storeStopPointToDB");

describe("fetchStopPointBySloid", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call fetchAndStoreStopPointBySloidToDB with correct parameters and return data on success", async () => {
    const sloid = "sloid123";
    const mockData = { some: "stop point data" };

    // Mock the fetchAndStoreStopPointBySloidToDB function to return mockData
    (fetchAndStoreStopPointBySloidToDB as jest.Mock).mockResolvedValue(
      mockData,
    );

    const result = await fetchStopPointBySloid(sloid);

    // Check that fetchAndStoreStopPointBySloidToDB was called with the correct parameters
    expect(fetchAndStoreStopPointBySloidToDB).toHaveBeenCalledWith(
      "/prm-directory/v1/stop-points",
      storeStopPointToDB,
      sloid,
    );
    // Check that the result matches the mock data
    expect(result).toEqual(mockData);
  });

  it("should return null and log an error if fetchAndStoreStopPointBySloidToDB fails", async () => {
    const sloid = "sloid123";

    // Mock the fetchAndStoreStopPointBySloidToDB function to throw an error
    (fetchAndStoreStopPointBySloidToDB as jest.Mock).mockRejectedValue(
      new Error("Test Error"),
    );

    // Capture console error
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const result = await fetchStopPointBySloid(sloid);

    // Check that fetchAndStoreStopPointBySloidToDB was called with the correct parameters
    expect(fetchAndStoreStopPointBySloidToDB).toHaveBeenCalledWith(
      "/prm-directory/v1/stop-points",
      storeStopPointToDB,
      sloid,
    );
    // Check that the result is null due to the error
    expect(result).toBeNull();
    // Check that the error was logged
    expect(consoleError).toHaveBeenCalledWith(
      `Failed to fetch stop point for SLOID ${sloid}:`,
      expect.any(Error),
    );

    consoleError.mockRestore();
  });
});
