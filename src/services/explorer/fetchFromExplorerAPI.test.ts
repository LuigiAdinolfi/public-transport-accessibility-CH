import fetchFromExplorerAPI from "./fetchFromExplorerAPI";

global.fetch = jest.fn();

describe("fetchFromExplorerAPI", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return JSON data when the fetch request is successful", async () => {
    const mockResponse = { data: "mock data" };

    // Mock the fetch response
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const where = "someQuery";
    const result = await fetchFromExplorerAPI(where);

    // Verify fetch was called with the correct URL
    expect(fetch).toHaveBeenCalledWith(
      `https://data.sbb.ch/api/explore/v2.1/catalog/datasets/bestandesaufnahme_behig/records?where="${where}"&limit=1`,
    );

    // Verify that the result is the mock data
    expect(result).toEqual(mockResponse);
  });

  it("should return null and log an error when the response is not OK", async () => {
    // Mock fetch to return a response with status not OK
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
      json: () => Promise.resolve({}),
    });

    // Capture console error
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const where = "someQuery";
    const result = await fetchFromExplorerAPI(where);

    // Verify fetch was called with the correct URL
    expect(fetch).toHaveBeenCalledWith(
      `https://data.sbb.ch/api/explore/v2.1/catalog/datasets/bestandesaufnahme_behig/records?where="${where}"&limit=1`,
    );

    // Verify that the result is null
    expect(result).toBeNull();
    // Verify that an error was logged
    expect(consoleError).toHaveBeenCalledWith(
      `Failed to fetch https://data.sbb.ch/api/explore/v2.1/catalog/datasets/bestandesaufnahme_behig/records?where="${where}"&limit=1: 500`,
    );

    consoleError.mockRestore();
  });

  it("should return null and log an error when fetch throws an exception", async () => {
    // Mock fetch to throw an error
    (fetch as jest.Mock).mockRejectedValue(new Error("Network Error"));

    // Capture console error
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const where = "someQuery";
    const result = await fetchFromExplorerAPI(where);

    // Verify fetch was called with the correct URL
    expect(fetch).toHaveBeenCalledWith(
      `https://data.sbb.ch/api/explore/v2.1/catalog/datasets/bestandesaufnahme_behig/records?where="${where}"&limit=1`,
    );

    // Verify that the result is null
    expect(result).toBeNull();
    // Verify that an error was logged
    expect(consoleError).toHaveBeenCalledWith(
      `An error occurred while fetching from the Explorer API`,
      expect.any(Error),
    );

    consoleError.mockRestore();
  });
});
