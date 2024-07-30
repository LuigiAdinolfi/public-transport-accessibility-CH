import { getArrivalTime } from "./getArrivalTime";
import { isTripTimedLeg } from "@/utils/isTripTimedLeg";
import { formatTime } from "@/utils/formatTime";

jest.mock("@/utils/isTripTimedLeg", () => ({
  isTripTimedLeg: jest.fn(),
}));
jest.mock("@/utils/formatTime", () => ({
  formatTime: jest.fn(),
}));

describe("getArrivalTime", () => {
  const mockFormatTime = formatTime as jest.MockedFunction<typeof formatTime>;
  const mockIsTripTimedLeg = isTripTimedLeg as jest.MockedFunction<
    typeof isTripTimedLeg
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 'N/A' if the leg is not a TripTimedLeg", () => {
    mockIsTripTimedLeg.mockReturnValue(false);

    const leg = {} as any; // Mock object
    expect(getArrivalTime(leg)).toBe("N/A");
  });

  it("should return 'N/A' if the leg is a TripTimedLeg but arrival time is not available", () => {
    mockIsTripTimedLeg.mockReturnValue(true);

    const leg = {
      toStopPoint: {
        arrivalData: {
          timetableTime: null,
        },
      },
    } as any; // Mock object

    mockFormatTime.mockReturnValue("N/A");

    expect(getArrivalTime(leg)).toBe("N/A");
  });

  it("should return formatted arrival time if the leg is a TripTimedLeg and arrival time is available", () => {
    mockIsTripTimedLeg.mockReturnValue(true);

    const leg = {
      toStopPoint: {
        arrivalData: {
          timetableTime: new Date("2024-07-30T12:00:00Z"),
        },
      },
    } as any; // Mock object

    mockFormatTime.mockReturnValue("12:00");

    expect(getArrivalTime(leg)).toBe("12:00");
  });

  it("should handle the case where formatTime returns 'N/A' for invalid dates", () => {
    mockIsTripTimedLeg.mockReturnValue(true);

    const leg = {
      toStopPoint: {
        arrivalData: {
          timetableTime: new Date("invalid-date"),
        },
      },
    } as any; // Mock object

    mockFormatTime.mockReturnValue("N/A");

    expect(getArrivalTime(leg)).toBe("N/A");
  });

  it("should handle edge cases with different time formats", () => {
    mockIsTripTimedLeg.mockReturnValue(true);

    const leg = {
      toStopPoint: {
        arrivalData: {
          timetableTime: new Date("2024-07-30T16:45:00Z"),
        },
      },
    } as any; // Mock object

    mockFormatTime.mockReturnValue("16:45");

    expect(getArrivalTime(leg)).toBe("16:45");
  });
});
