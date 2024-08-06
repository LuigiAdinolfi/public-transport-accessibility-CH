import { getStopPointData } from "./getStopPointData";
import { retrieveStopPointData } from "@/cache/retrieveStopPointData";

jest.mock("@/cache/retrieveStopPointData", () => ({
  retrieveStopPointData: jest.fn(),
}));

describe("getStopPointData", () => {
  const sloid = "ch:1:testSloid";
  const mockData = { id: "1", name: "Stop Point 1" };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return stop point data when fetch is successful", async () => {
    (retrieveStopPointData as jest.Mock).mockResolvedValueOnce({
      data: mockData,
      ok: true,
    });

    const result = await getStopPointData(sloid);

    expect(retrieveStopPointData).toHaveBeenCalledWith(sloid);
    expect(result).toEqual(mockData);
  });

  it("should log an error and return data when fetch is unsuccessful but returns data", async () => {
    (retrieveStopPointData as jest.Mock).mockResolvedValueOnce({
      data: { message: "Error" },
      ok: false,
    });
    console.error = jest.fn(); // Mock console.error

    const result = await getStopPointData(sloid);

    expect(retrieveStopPointData).toHaveBeenCalledWith(sloid);
    expect(console.error).toHaveBeenCalledWith(
      `Error fetching stop point for SLOID ${sloid}:`,
      { message: "Error" },
    );
    expect(result).toEqual({ message: "Error" });
  });

  it("should throw an error if retrieveStopPointData throws an error", async () => {
    const errorMessage = "Network Error";
    (retrieveStopPointData as jest.Mock).mockRejectedValueOnce(
      new Error(errorMessage),
    );
    console.error = jest.fn(); // Mock console.error

    await expect(getStopPointData(sloid)).rejects.toThrow(errorMessage);
    expect(console.error).toHaveBeenCalledWith(
      `Error fetching stop point for SLOID ${sloid}:`,
      new Error(errorMessage),
    );
  });
});
