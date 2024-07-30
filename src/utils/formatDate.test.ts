import { formatDate } from "./formatDate";

describe("formatDate", () => {
  it("should return an empty string if the date is null", () => {
    expect(formatDate(null)).toBe("");
  });

  it("should return a formatted date string for a valid Date object", () => {
    const date = new Date("2024-07-30T12:00:00Z");
    // Date should be formatted according to the locale `de` and the format "EEEE dd. MMMM yyyy"
    const expectedFormat = "Dienstag 30. Juli 2024"; // In German locale

    expect(formatDate(date)).toBe(expectedFormat);
  });

  it("should handle dates in different time zones correctly", () => {
    // Date in the UTC time zone
    const dateUTC = new Date("2024-07-30T00:00:00Z");
    const expectedFormatUTC = "Dienstag 30. Juli 2024";

    // Date in the local time zone (e.g., Berlin)
    const dateLocal = new Date("2024-07-30T02:00:00+02:00");
    const expectedFormatLocal = "Dienstag 30. Juli 2024";

    expect(formatDate(dateUTC)).toBe(expectedFormatUTC);
    expect(formatDate(dateLocal)).toBe(expectedFormatLocal);
  });

  it("should handle dates with different locales if locale is changed", () => {
    // Changing locale for comparison, but this test assumes `de` locale is used in the function
    // For example, let's use `en-US` and compare the expected format
    const date = new Date("2024-07-30T12:00:00Z");
    const expectedFormatEnglish = "Tuesday 30. July 2024"; // In English locale

    expect(formatDate(date)).not.toBe(expectedFormatEnglish);
  });
});
