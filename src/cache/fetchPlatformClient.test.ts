import { fetchPlatformClient } from "./fetchPlatformClient";
import { fetchPlatformFromLocalAPI } from "@/cache/fetchPlatformFromLocalAPI";

// Mock the external dependency
jest.mock("@/cache/fetchPlatformFromLocalAPI", () => ({
  fetchPlatformFromLocalAPI: jest.fn(),
}));

describe("fetchPlatformClient", () => {
  const sloid = "testSloid";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return data when fetchPlatformFromLocalAPI is successful", async () => {
    const mockData = { id: "1", name: "Platform 1" };
    (fetchPlatformFromLocalAPI as jest.Mock).mockResolvedValue({
      data: mockData,
      ok: true,
    });

    const result = await fetchPlatformClient(sloid);

    expect(fetchPlatformFromLocalAPI).toHaveBeenCalledWith(sloid);
    expect(result).toEqual(mockData);
  });

  it("should log an error and return data when fetchPlatformFromLocalAPI returns an unsuccessful response", async () => {
    const mockData = { error: "Something went wrong" };
    (fetchPlatformFromLocalAPI as jest.Mock).mockResolvedValue({
      data: mockData,
      ok: false,
    });

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const result = await fetchPlatformClient(sloid);

    expect(fetchPlatformFromLocalAPI).toHaveBeenCalledWith(sloid);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      `Error fetching platform for SLOID ${sloid}:`,
      mockData,
    );
    expect(result).toEqual(mockData);

    consoleErrorSpy.mockRestore();
  });

  it("should handle errors thrown by fetchPlatformFromLocalAPI", async () => {
    const mockError = new Error("API call failed");
    (fetchPlatformFromLocalAPI as jest.Mock).mockRejectedValue(mockError);

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await expect(fetchPlatformClient(sloid)).rejects.toThrow(mockError);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      `Error fetching platform for SLOID ${sloid}:`,
      mockError,
    );

    consoleErrorSpy.mockRestore();
  });
});
