import { create } from "zustand";
import * as OJP from "ojp-sdk";

/**
 * Interface defining the structure of a recent journey.
 */
interface RecentJourney {
  fromLocation: OJP.Location | null;
  toLocation: OJP.Location | null;
  journeyDate: Date | null;
  journeyDuration: string;
  vehicleType: string;
  vehicleNumber: string;
  isMultipleConnection: boolean;
  connections: { vehicleType: string; vehicleNumber: string }[];
}

/**
 * Interface defining the state structure for recent journeys.
 */
interface JourneyState {
  recentJourneys: RecentJourney[]; // Array to store recent journeys
  addRecentJourney: (journey: RecentJourney) => void; // Function to add a recent journey
  getRecentJourneys: () => RecentJourney[]; // Function to get recent journeys
}

/**
 * Zustand hook for managing recent journeys state.
 * @returns {JourneyState} - The state and setter functions for recent journeys.
 */
export const useRecentJourneysStore = create<JourneyState>((set, get) => {
  // Initialize recent journeys from localStorage or empty array
  const initialRecentJourneys: RecentJourney[] =
    typeof window !== "undefined" && localStorage.getItem("recentJourneys")
      ? JSON.parse(localStorage.getItem("recentJourneys") || "[]")
      : [];

  return {
    recentJourneys: initialRecentJourneys,
    addRecentJourney: (journey) =>
      set((state) => {
        const updatedJourneys = [journey, ...state.recentJourneys].slice(0, 5); // Keep only the 5 most recent journeys
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "recentJourneys",
            JSON.stringify(updatedJourneys),
          );
        }
        return { recentJourneys: updatedJourneys };
      }),
    getRecentJourneys: () => get().recentJourneys,
  };
});
