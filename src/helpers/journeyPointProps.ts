import * as OJP from "ojp-sdk";

/**
 * Props interface for a component related to journey points.
 * This interface defines the properties required by the component to handle journey point inputs and selection.
 *
 * @interface JourneyPointProps
 */
export interface JourneyPointProps {
  /**
   * Placeholder text for the input field.
   * This text is displayed when the input field is empty, guiding users on what to enter.
   *
   * @type {string}
   */
  placeholder: string;

  /**
   * Callback function invoked when a location is selected.
   * This function receives the selected location object and is triggered upon user selection.
   *
   * @param {OJP.Location} location - The selected location object from the OJP SDK.
   * @returns {void}
   */
  onLocationSelected: (location: OJP.Location) => void;

  /**
   * Description text displayed below the input field.
   * This text provides additional context or instructions related to the input field.
   *
   * @type {string}
   */
  description: string;

  /**
   * Current value of the input field.
   * This represents the text currently entered or selected in the input field.
   *
   * @type {string}
   */
  value: string;
}
