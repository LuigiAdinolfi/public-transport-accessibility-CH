import { create } from "zustand";

interface RecentJourney {
  fromLocation: string;
  toLocation: string;
  journeyDate: string;
  journeyDuration: string;
  vehicleType: string;
  vehicleNumber: string;
  isMultipleConnection: boolean;
  connections: { vehicleType: string; vehicleNumber: string }[];
}

interface JourneyState {
  recentJourneys: RecentJourney[]; // Array to store recent journeys
  addRecentJourney: (journey: RecentJourney) => void; // Function to add a recent journey
  getRecentJourneys: () => RecentJourney[]; // Function to get recent journeys
}

export const useRecentJourneysStore = create<JourneyState>((set, get) => {
  // Initialize recent journeys from localStorage or empty array
  const initialRecentJourneys: RecentJourney[] = JSON.parse(
    localStorage.getItem("recentJourneys") || "[]",
  );
  return {
    recentJourneys: initialRecentJourneys,
    addRecentJourney: (journey) =>
      set((state) => {
        const updatedJourneys = [journey, ...state.recentJourneys];
        localStorage.setItem("recentJourneys", JSON.stringify(updatedJourneys));
        return { recentJourneys: updatedJourneys };
      }),
    getRecentJourneys: () => get().recentJourneys,
  };
});

// Without local storage
// export const useRecentJourneysStore = create<JourneyState>((set, get) => ({
//   recentJourneys: [],
//   addRecentJourney: (journey) =>
//     set((state) => ({
//       recentJourneys: [journey, ...state.recentJourneys].slice(0, 5), // Keep only the 5 most recent journeys
//     })),
//   getRecentJourneys: () => get().recentJourneys,
// }));
