import { create } from "zustand";
import * as OJP from "ojp-sdk";

/**
 * Interface defining the state structure for journey-related data.
 */
interface JourneyState {
  date: Date; // Date for journey
  time: string; // Time for journey
  activeSearchTab: "Dep" | "Arr"; // Active search tab: "Dep" (Departure) or "Arr" (Arrival)
  origin: OJP.Location | null; // Origin location
  destination: OJP.Location | null; // Destination location
  selectedDate: string; // Selected date for journey
  selectedStop: string; // Selected stop point
  selectedTripLeg: OJP.TripLeg | null; // Selected trip leg
  tripDetails: OJP.Trip[]; // List of trip details
  indexTripSelected: number; // Index of selected trip
  firstLeg: OJP.TripLeg | null; // First leg of the journey
  lastLeg: OJP.TripLeg | null; // Last leg of the journey
  allLegs: OJP.TripLeg[]; // All legs of the journey
  setDate: (date: Date) => void; // Function to set journey date
  setTime: (time: string) => void; // Function to set journey time
  setActiveSearchTab: (tab: "Dep" | "Arr") => void; // Function to set active search tab
  setOrigin: (origin: OJP.Location | null) => void; // Function to set origin location
  setDestination: (destination: OJP.Location | null) => void; // Function to set destination location
  setSelectedDate: (date: string) => void; // Function to set selected date
  setSelectedStop: (stop: string) => void; // Function to set selected stop point
  setSelectedTripLeg: (tripLeg: OJP.TripLeg | null) => void; // Function to set selected trip leg
  setTripDetails: (tripDetails: OJP.Trip[]) => void; // Function to set trip details
  addTripDetail: (tripDetail: OJP.Trip) => void; // Function to add a trip detail
  clearTripDetails: () => void; // Function to clear trip details
  setIndexTripSelected: (index: number) => void; // Function to set index of selected trip
  setFirstLeg: (leg: OJP.TripLeg | null) => void; // Function to set the first leg of the journey
  setLastLeg: (leg: OJP.TripLeg | null) => void; // Function to set the last leg of the journey
  setAllLegs: (legs: OJP.TripLeg[]) => void; // Function to set all legs of the journey
}

/**
 * Zustand hook for managing journey-related state.
 * @returns {JourneyState} - The state and setter functions for journey-related data.
 */
export const useJourneyStore = create<JourneyState>((set) => ({
  date: new Date(),
  time: "",
  activeSearchTab: "Dep",
  origin: null,
  destination: null,
  selectedDate: "",
  selectedStop: "",
  tripDetails: [],
  selectedTripLeg: null,
  indexTripSelected: 0,
  firstLeg: null,
  lastLeg: null,
  allLegs: [],

  // Setter functions
  setDate: (date) => set({ date }),
  setTime: (time) => set({ time }),
  setActiveSearchTab: (tab) => set({ activeSearchTab: tab }),
  setOrigin: (origin) => set({ origin }),
  setDestination: (destination) => set({ destination }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setSelectedStop: (stop) => set({ selectedStop: stop }),
  setSelectedTripLeg: (tripLeg) => set({ selectedTripLeg: tripLeg }),
  setTripDetails: (tripDetails) => set({ tripDetails }),
  addTripDetail: (tripDetail) =>
    set((state) => ({ tripDetails: [...state.tripDetails, tripDetail] })),
  clearTripDetails: () => set({ tripDetails: [] }),
  setIndexTripSelected: (index) => set({ indexTripSelected: index }),
  setFirstLeg: (leg) => set({ firstLeg: leg }),
  setLastLeg: (leg) => set({ lastLeg: leg }),
  setAllLegs: (legs) => set({ allLegs: legs }),
}));
