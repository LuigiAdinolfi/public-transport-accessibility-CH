import * as OJP from "ojp-sdk";
import { fetchTripRequest } from "@/api/openJourneyPlanner/fetch-trip-request";

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
    console.log("Trip details:", response.trips);
    push("/select");
  } catch (error) {
    console.error("Error fetching trip request:", error);
  }
}

/**
 * Swaps the origin and destination locations.
 * @param {OJP.Location | null} origin - The current origin location.
 * @param {OJP.Location | null} destination - The current destination location.
 * @param {(location: OJP.Location | null) => void} setOrigin - Function to set the origin location.
 * @param {(location: OJP.Location | null) => void} setDestination - Function to set the destination location.
 */
export function swapLocations(
  origin: OJP.Location | null,
  destination: OJP.Location | null,
  setOrigin: (location: OJP.Location | null) => void,
  setDestination: (location: OJP.Location | null) => void,
) {
  const temp = origin;
  setOrigin(destination);
  setDestination(temp);
}
