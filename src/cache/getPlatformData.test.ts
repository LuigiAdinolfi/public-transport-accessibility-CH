import { getPlatformData } from "./getPlatformData";
import { retrievePlatformData } from "@/cache/retrievePlatformData";

// Mock the external dependency
jest.mock("@/cache/retrievePlatformData", () => ({
  retrievePlatformData: jest.fn(),
}));

describe("getPlatformData", () => {
  const sloid = "testSloid";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return data when retrievePlatformData is successful", async () => {
    const mockData = { id: "1", name: "Platform 1" };
    (retrievePlatformData as jest.Mock).mockResolvedValue({
      data: mockData,
      ok: true,
    });

    const result = await getPlatformData(sloid);

    expect(retrievePlatformData).toHaveBeenCalledWith(sloid);
    expect(result).toEqual(mockData);
  });

  it("should log an error and return data when retrievePlatformData returns an unsuccessful response", async () => {
    const mockData = { error: "Something went wrong" };
    (retrievePlatformData as jest.Mock).mockResolvedValue({
      data: mockData,
      ok: false,
    });

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const result = await getPlatformData(sloid);

    expect(retrievePlatformData).toHaveBeenCalledWith(sloid);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      `Error fetching platform for SLOID ${sloid}:`,
      mockData,
    );
    expect(result).toEqual(mockData);

    consoleErrorSpy.mockRestore();
  });

  it("should handle errors thrown by retrievePlatformData", async () => {
    const mockError = new Error("API call failed");
    (retrievePlatformData as jest.Mock).mockRejectedValue(mockError);

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await expect(getPlatformData(sloid)).rejects.toThrow(mockError);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      `Error fetching platform for SLOID ${sloid}:`,
      mockError,
    );

    consoleErrorSpy.mockRestore();
  });
});
