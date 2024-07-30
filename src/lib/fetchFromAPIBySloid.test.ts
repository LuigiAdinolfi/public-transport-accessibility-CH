import fetchFromAPIBySloid from "@/lib/fetchFromAPIBySloid";
import getAccessToken from "@/lib/tokenManager";

jest.mock("@/lib/tokenManager");

const mockedGetAccessToken = getAccessToken as jest.MockedFunction<
  typeof getAccessToken
>;

global.fetch = jest.fn();

describe("fetchFromAPIBySloid", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return null if getAccessToken fails", async () => {
    mockedGetAccessToken.mockResolvedValue(null);

    const result = await fetchFromAPIBySloid("/endpoint", "sloid");

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

    const result = await fetchFromAPIBySloid("/endpoint", "sloid");

    expect(result).toBeNull();
    expect(mockedGetAccessToken).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://atlas.api.sbb.ch:443/endpoint/sloid",
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

    const result = await fetchFromAPIBySloid("/endpoint", "sloid");

    expect(result).toBeNull();
    expect(mockedGetAccessToken).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://atlas.api.sbb.ch:443/endpoint/sloid",
      {
        headers: {
          Authorization: "Bearer mockAccessToken",
        },
      },
    );
  });
});
