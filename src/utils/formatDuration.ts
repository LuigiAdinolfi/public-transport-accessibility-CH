/**
 * Represents a duration of time in hours and minutes.
 */
export type Duration = {
  hours: number;
  minutes: number;
};

/**
 * Formats a duration object into a readable string representation.
 * @param duration - The duration object containing hours and minutes.
 * @returns A formatted string describing the duration (e.g., "2 h 30 min travel time").
 */
export const formatDuration = (duration: Duration) => {
  const { hours, minutes } = duration;
  if (hours > 0) {
    return `${hours} h ${minutes} min Reisezeit`;
  } else {
    return `${minutes} min Reisezeit`;
  }
};
