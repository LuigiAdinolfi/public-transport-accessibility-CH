import * as OJP from "ojp-sdk";

/**
 * Props interface for a component related to journey points.
 */
export interface JourneyPointProps {
  /**
   * Placeholder text for the input field.
   */
  placeholder: string;

  /**
   * Callback function invoked when a location is selected.
   * @param {OJP.Location} location - The selected location object.
   */
  onLocationSelected: (location: OJP.Location) => void;

  /**
   * Description text displayed below the input field.
   */
  description: string;

  /**
   * Current value of the input field.
   */
  value: string;
}
