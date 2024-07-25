/**
 * Represents a duration of time in hours and minutes.
 */
export type Duration = {
  hours: number;
  minutes: number;
};

/**
 * Formats a duration object into a readable string representation.
 *
 * @param {Duration} duration - The duration object containing hours and minutes.
 * @returns {string} A formatted string describing the duration.
 *                    For example: "2 h 30 min travel time" if hours are greater than 0,
 *                    otherwise "30 min travel time" if hours are 0.
 */
export const formatDuration = (duration: Duration) => {
  const { hours, minutes } = duration;

  // Format the string based on whether hours are greater than 0
  if (hours > 0) {
    return `${hours} h ${minutes} min Reisezeit`;
  } else {
    return `${minutes} min Reisezeit`;
  }
};
