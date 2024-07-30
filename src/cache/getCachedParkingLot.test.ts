import { getCachedParkingLot } from "./getCachedParkingLot";
import { fetchParkingLotClient } from "@/cache/fetchParkingLotClient";
import { useParkingLotStore } from "@/store/useParkingLotStore";

jest.mock("@/cache/fetchParkingLotClient", () => ({
  fetchParkingLotClient: jest.fn(),
}));
jest.mock("@/store/useParkingLotStore", () => ({
  useParkingLotStore: {
    getState: jest.fn(() => ({
      setParkingLot: jest.fn(),
    })),
  },
}));

describe("getCachedParkingLot", () => {
  const validSloid = "ch:1:testSloid";
  const mockParkingLot = { id: "1", name: "Parking Lot 1" };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch and return parking lot data when sloid starts with 'ch:1:'", async () => {
    (fetchParkingLotClient as jest.Mock).mockResolvedValueOnce(mockParkingLot);
    const setParkingLot = jest.fn();
    (useParkingLotStore.getState as jest.Mock).mockReturnValueOnce({
      setParkingLot,
    });

    const result = await getCachedParkingLot(validSloid);

    expect(fetchParkingLotClient).toHaveBeenCalledWith(validSloid);
    expect(setParkingLot).toHaveBeenCalledWith(mockParkingLot);
    expect(result).toEqual(mockParkingLot);
  });

  it("should handle fetch failure and return an empty object", async () => {
    (fetchParkingLotClient as jest.Mock).mockRejectedValueOnce(
      new Error("Fetch failed"),
    );
    const setParkingLot = jest.fn();
    (useParkingLotStore.getState as jest.Mock).mockReturnValueOnce({
      setParkingLot,
    });

    const result = await getCachedParkingLot(validSloid);

    expect(fetchParkingLotClient).toHaveBeenCalledWith(validSloid);
    expect(setParkingLot).not.toHaveBeenCalled();
    expect(result).toEqual({});
  });

  it("should return an empty object if sloid does not start with 'ch:1:'", async () => {
    const invalidSloid = "invalidSloid";
    const result = await getCachedParkingLot(invalidSloid);

    expect(fetchParkingLotClient).not.toHaveBeenCalled();
    expect(result).toEqual({});
  });

  it("should return an empty object if sloid is falsy", async () => {
    const result = await getCachedParkingLot("");

    expect(fetchParkingLotClient).not.toHaveBeenCalled();
    expect(result).toEqual({});
  });

  it("should return an empty object if sloid is not provided", async () => {
    const result = await getCachedParkingLot("");

    expect(fetchParkingLotClient).not.toHaveBeenCalled();
    expect(result).toEqual({});
  });
});
