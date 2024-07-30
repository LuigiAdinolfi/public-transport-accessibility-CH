import { fetchStopPointClient } from "./fetchStopPointClient";
import { fetchStopPointFromLocalAPI } from "@/cache/fetchStopPointFromLocalAPI";

jest.mock("@/cache/fetchStopPointFromLocalAPI", () => ({
  fetchStopPointFromLocalAPI: jest.fn(),
}));

describe("fetchStopPointClient", () => {
  const sloid = "ch:1:testSloid";
  const mockData = { id: "1", name: "Stop Point 1" };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return stop point data when fetch is successful", async () => {
    (fetchStopPointFromLocalAPI as jest.Mock).mockResolvedValueOnce({
      data: mockData,
      ok: true,
    });

    const result = await fetchStopPointClient(sloid);

    expect(fetchStopPointFromLocalAPI).toHaveBeenCalledWith(sloid);
    expect(result).toEqual(mockData);
  });

  it("should log an error and return data when fetch is unsuccessful but returns data", async () => {
    (fetchStopPointFromLocalAPI as jest.Mock).mockResolvedValueOnce({
      data: { message: "Error" },
      ok: false,
    });
    console.error = jest.fn(); // Mock console.error

    const result = await fetchStopPointClient(sloid);

    expect(fetchStopPointFromLocalAPI).toHaveBeenCalledWith(sloid);
    expect(console.error).toHaveBeenCalledWith(
      `Error fetching stop point for SLOID ${sloid}:`,
      { message: "Error" },
    );
    expect(result).toEqual({ message: "Error" });
  });

  it("should throw an error if fetchStopPointFromLocalAPI throws an error", async () => {
    const errorMessage = "Network Error";
    (fetchStopPointFromLocalAPI as jest.Mock).mockRejectedValueOnce(
      new Error(errorMessage),
    );
    console.error = jest.fn(); // Mock console.error

    await expect(fetchStopPointClient(sloid)).rejects.toThrow(errorMessage);
    expect(console.error).toHaveBeenCalledWith(
      `Error fetching stop point for SLOID ${sloid}:`,
      new Error(errorMessage),
    );
  });
});
