import { fetchAndCacheStopPointData } from "./fetchAndCacheStopPointData";
import { getStopPointData } from "@/cache/getStopPointData";
import { useStopPointStore } from "@/store/useStopPointStore";

jest.mock("@/cache/getStopPointData", () => ({
  getStopPointData: jest.fn(),
}));
jest.mock("@/store/useStopPointStore", () => ({
  useStopPointStore: {
    getState: jest.fn(() => ({
      setStopPoint: jest.fn(),
    })),
  },
}));

describe("fetchAndCacheStopPointData", () => {
  const validSloid = "ch:1:testSloid";
  const invalidSloid = "invalidSloid";
  const emptySloid = "";

  const mockStopPoint = { id: "1", name: "Stop Point 1" };
  const mockSetStopPoint = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch and return stop point data when sloid is valid and fetchAndCacheStopPointData succeeds", async () => {
    (getStopPointData as jest.Mock).mockResolvedValueOnce(mockStopPoint);
    (useStopPointStore.getState as jest.Mock).mockReturnValueOnce({
      setStopPoint: mockSetStopPoint,
    });

    const result = await fetchAndCacheStopPointData(validSloid);

    expect(getStopPointData).toHaveBeenCalledWith(validSloid);
    expect(mockSetStopPoint).toHaveBeenCalledWith(mockStopPoint);
    expect(result).toEqual(mockStopPoint);
  });

  it("should return an empty object and log an error when fetchAndCacheStopPointData fails", async () => {
    const mockError = new Error("Fetch failed");
    (getStopPointData as jest.Mock).mockRejectedValueOnce(mockError);
    (useStopPointStore.getState as jest.Mock).mockReturnValueOnce({
      setStopPoint: mockSetStopPoint,
    });

    console.error = jest.fn(); // Mock console.error to avoid cluttering test output

    const result = await fetchAndCacheStopPointData(validSloid);

    expect(getStopPointData).toHaveBeenCalledWith(validSloid);
    expect(mockSetStopPoint).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(
      `Error fetching stop point for SLOID ${validSloid}:`,
      mockError,
    );
    expect(result).toEqual({});
  });

  it("should return an empty object and log an error when sloid does not start with 'ch:1:'", async () => {
    console.error = jest.fn(); // Mock console.error to avoid cluttering test output

    const result = await fetchAndCacheStopPointData(invalidSloid);

    expect(getStopPointData).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(
      `SLOID ${invalidSloid} does not start with ch:1:`,
    );
    expect(result).toEqual({});
  });

  it("should return an empty object when sloid is empty", async () => {
    const result = await fetchAndCacheStopPointData(emptySloid);

    expect(getStopPointData).not.toHaveBeenCalled();
    expect(result).toEqual({});
  });
});
