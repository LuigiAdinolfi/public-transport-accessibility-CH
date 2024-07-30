import fetchPlatformBySloid from "./fetchPlatformBySloid";
import fetchAndStorePlatformBySloidToDB from "@/lib/fetchAndStorePlatformBySloidToDB";
import { storePlatformToDB } from "@/db/storePlatformToDB";

jest.mock("@/lib/fetchAndStorePlatformBySloidToDB");
jest.mock("@/db/storePlatformToDB");

describe("fetchPlatformBySloid", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call fetchAndStorePlatformBySloidToDB with correct parameters and return data on success", async () => {
    const sloid = "sloid123";
    const mockData = { some: "platform data" };

    // Mock the fetchAndStorePlatformBySloidToDB function to return mockData
    (fetchAndStorePlatformBySloidToDB as jest.Mock).mockResolvedValue(mockData);

    const result = await fetchPlatformBySloid(sloid);

    // Check that fetchAndStorePlatformBySloidToDB was called with the correct parameters
    expect(fetchAndStorePlatformBySloidToDB).toHaveBeenCalledWith(
      "/prm-directory/v1/platforms",
      storePlatformToDB,
      sloid,
    );
    // Check that the result matches the mock data
    expect(result).toEqual(mockData);
  });

  it("should return null and log an error if fetchAndStorePlatformBySloidToDB fails", async () => {
    const sloid = "sloid123";

    // Mock the fetchAndStorePlatformBySloidToDB function to throw an error
    (fetchAndStorePlatformBySloidToDB as jest.Mock).mockRejectedValue(
      new Error("Test Error"),
    );

    // Capture console error
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const result = await fetchPlatformBySloid(sloid);

    // Check that fetchAndStorePlatformBySloidToDB was called with the correct parameters
    expect(fetchAndStorePlatformBySloidToDB).toHaveBeenCalledWith(
      "/prm-directory/v1/platforms",
      storePlatformToDB,
      sloid,
    );
    // Check that the result is null due to the error
    expect(result).toBeNull();
    // Check that the error was logged
    expect(consoleError).toHaveBeenCalledWith(
      `Failed to fetch platform data for SLOID ${sloid}:`,
      expect.any(Error),
    );

    consoleError.mockRestore();
  });
});
