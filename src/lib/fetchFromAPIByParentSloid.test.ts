import fetchFromAPIByParentSloid from "@/lib/fetchFromAPIByParentSloid";
import getAccessToken from "@/lib/tokenManager";

jest.mock("@/lib/tokenManager");

const mockedGetAccessToken = getAccessToken as jest.MockedFunction<
  typeof getAccessToken
>;

global.fetch = jest.fn();

describe("fetchFromAPIByParentSloid", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return null if getAccessToken fails", async () => {
    mockedGetAccessToken.mockResolvedValue(null);

    const result = await fetchFromAPIByParentSloid(
      "/endpoint",
      "parentServicePointSloid",
    );

    expect(result).toBeNull();
    expect(mockedGetAccessToken).toHaveBeenCalledTimes(1);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("should return null if the fetch response is not ok", async () => {
    mockedGetAccessToken.mockResolvedValue("mockAccessToken");
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 404,
    });

    const result = await fetchFromAPIByParentSloid(
      "/endpoint",
      "parentServicePointSloid",
    );

    expect(result).toBeNull();
    expect(mockedGetAccessToken).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://atlas.api.sbb.ch:443/endpoint/overview/parentServicePointSloid",
      {
        headers: {
          Authorization: "Bearer mockAccessToken",
        },
      },
    );
  });

  it("should return the response data if fetch is successful", async () => {
    const mockData = { key: "value" };

    mockedGetAccessToken.mockResolvedValue("mockAccessToken");
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    });

    const result = await fetchFromAPIByParentSloid(
      "/endpoint",
      "parentServicePointSloid",
    );

    expect(result).toEqual(mockData);
    expect(mockedGetAccessToken).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://atlas.api.sbb.ch:443/endpoint/overview/parentServicePointSloid",
      {
        headers: {
          Authorization: "Bearer mockAccessToken",
        },
      },
    );
  });

  it("should return null if fetch throws an error", async () => {
    mockedGetAccessToken.mockResolvedValue("mockAccessToken");
    (fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

    const result = await fetchFromAPIByParentSloid(
      "/endpoint",
      "parentServicePointSloid",
    );

    expect(result).toBeNull();
    expect(mockedGetAccessToken).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://atlas.api.sbb.ch:443/endpoint/overview/parentServicePointSloid",
      {
        headers: {
          Authorization: "Bearer mockAccessToken",
        },
      },
    );
  });
});
