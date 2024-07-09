import * as OJP from "ojp-sdk";
import { fetchTripRequest } from "@/services/openJourneyPlanner/fetch-trip-request";

/**
 * Handles form submission for fetching trip details.
 * @param {OJP.Location | null} origin - The origin location selected.
 * @param {OJP.Location | null} destination - The destination location selected.
 * @param {string} selectedDate - The selected date for the trip.
 * @param {"Dep" | "Arr"} activeSearchTab - The active search tab ("Dep" for departure, "Arr" for arrival).
 * @param {(trips: OJP.Trip[]) => void} setTripDetails - Function to set trip details in state.
 * @param {(url: string) => void} push - Function to navigate to a new URL.
 */
export async function handleFormSubmit(
  origin: OJP.Location | null,
  destination: OJP.Location | null,
  selectedDate: string,
  activeSearchTab: "Dep" | "Arr",
  setTripDetails: (trips: any) => void,
  push: (url: string) => void,
) {
  if (!origin || !destination || !selectedDate) {
    console.error("Please select origin, destination, and date/time.");
    return;
  }

  try {
    const formattedDate = new Date(selectedDate);
    const response = await fetchTripRequest(
      origin.stopPlace?.stopPlaceRef ?? "",
      destination.stopPlace?.stopPlaceRef ?? "",
      formattedDate,
      activeSearchTab,
    );
    setTripDetails(response.trips);
    push("/select");
  } catch (error) {
    console.error("Error fetching trip request:", error);
  }
}
