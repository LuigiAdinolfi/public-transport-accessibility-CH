import fetchFromAPI from "@/lib/fetchFromAPI";
import getValidAccessToken from "@/lib/tokenManager";

jest.mock("@/lib/tokenManager");

const mockedGetValidAccessToken = getValidAccessToken as jest.MockedFunction<
  typeof getValidAccessToken
>;

global.fetch = jest.fn();

describe("fetchFromAPI", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return null if getValidAccessToken fails", async () => {
    mockedGetValidAccessToken.mockResolvedValue(null);

    const result = await fetchFromAPI("/endpoint");

    expect(result).toBeNull();
    expect(mockedGetValidAccessToken).toHaveBeenCalledTimes(1);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("should return null if the fetch response is not ok", async () => {
    mockedGetValidAccessToken.mockResolvedValue("mockAccessToken");
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 404,
    });

    const result = await fetchFromAPI("/endpoint");

    expect(result).toBeNull();
    expect(mockedGetValidAccessToken).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://atlas.api.sbb.ch:443/endpoint",
      {
        headers: {
          Authorization: "Bearer mockAccessToken",
        },
      },
    );
  });

  it("should return the response data if fetch is successful", async () => {
    const mockData = { key: "value" };

    mockedGetValidAccessToken.mockResolvedValue("mockAccessToken");
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    });

    const result = await fetchFromAPI("/endpoint");

    expect(result).toEqual(mockData);
    expect(mockedGetValidAccessToken).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://atlas.api.sbb.ch:443/endpoint",
      {
        headers: {
          Authorization: "Bearer mockAccessToken",
        },
      },
    );
  });

  it("should return null if fetch throws an error", async () => {
    mockedGetValidAccessToken.mockResolvedValue("mockAccessToken");
    (fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

    const result = await fetchFromAPI("/endpoint");

    expect(result).toBeNull();
    expect(mockedGetValidAccessToken).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://atlas.api.sbb.ch:443/endpoint",
      {
        headers: {
          Authorization: "Bearer mockAccessToken",
        },
      },
    );
  });
});
