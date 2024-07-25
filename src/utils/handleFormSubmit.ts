import * as OJP from "ojp-sdk";
import { fetchTripRequest } from "@/services/openJourneyPlanner/fetch-trip-request";

/**
 * Handles form submission to fetch trip details based on user input.
 *
 * This function is responsible for validating the form inputs, formatting the date, and making an API request to fetch trip details.
 * It then updates the state with the fetched trip details and navigates to a new URL.
 *
 * @param {OJP.Location | null} origin - The selected origin location. If null, the form submission will not proceed.
 * @param {OJP.Location | null} destination - The selected destination location. If null, the form submission will not proceed.
 * @param {string} selectedDate - The selected date for the trip in ISO string format (e.g., "2024-07-25T12:00:00Z").
 * @param {"Dep" | "Arr"} activeSearchTab - Indicates the type of search: "Dep" for departure or "Arr" for arrival.
 * @param {(trips: OJP.Trip[]) => void} setTripDetails - Callback function to update the trip details in the state with the fetched trip data.
 * @param {(url: string) => void} push - Function to navigate to a new URL, typically used for routing.
 *
 * @returns {Promise<void>} - This function does not return a value. It performs asynchronous operations and updates the state and URL.
 */
export async function handleFormSubmit(
  origin: OJP.Location | null,
  destination: OJP.Location | null,
  selectedDate: string,
  activeSearchTab: "Dep" | "Arr",
  setTripDetails: (trips: OJP.Trip[]) => void,
  push: (url: string) => void,
) {
  // Validate input fields
  if (!origin || !destination || !selectedDate) {
    console.error("Please select origin, destination, and date/time.");
    return;
  }

  try {
    // Convert selected date to a Date object
    const formattedDate = new Date(selectedDate);

    // Fetch trip details using the provided API function
    const response = await fetchTripRequest(
      origin.stopPlace?.stopPlaceRef ?? "",
      destination.stopPlace?.stopPlaceRef ?? "",
      formattedDate,
      activeSearchTab,
    );

    // Update the state with the fetched trip details
    setTripDetails(response.trips);

    // Navigate to the select page
    push("/select");
  } catch (error) {
    // Log any errors encountered during the fetch operation
    console.error("Error fetching trip request:", error);
  }
}
