import { create } from "zustand";
import * as OJP from "ojp-sdk";

interface JourneyState {
  activeSearchTab: "Dep" | "Arr";
  origin: OJP.Location | null;
  destination: OJP.Location | null;
  selectedDate: string;
  tripDetails: OJP.Trip[];
  indexTripSelected: number;
  firstLeg: OJP.TripLeg | null;
  lastLeg: OJP.TripLeg | null;
  allLegs: OJP.TripLeg[];
  setActiveSearchTab: (tab: "Dep" | "Arr") => void;
  setOrigin: (origin: OJP.Location | null) => void;
  setDestination: (destination: OJP.Location | null) => void;
  setSelectedDate: (date: string) => void;
  setTripDetails: (tripDetails: OJP.Trip[]) => void;
  addTripDetail: (tripDetail: OJP.Trip) => void;
  clearTripDetails: () => void;
  setIndexTripSelected: (index: number) => void;
  setFirstLeg: (leg: OJP.TripLeg) => void;
  setLastLeg: (leg: OJP.TripLeg) => void;
  setAllLegs: (legs: OJP.TripLeg[]) => void;
  formattedDuration: (duration: OJP.Duration | undefined) => string;
}

export const useJourneyStore = create<JourneyState>((set) => ({
  activeSearchTab: "Dep",
  origin: null,
  destination: null,
  selectedDate: "",
  tripDetails: [],
  indexTripSelected: 0,
  firstLeg: null,
  lastLeg: null,
  allLegs: [],
  setActiveSearchTab: (tab) => set({ activeSearchTab: tab }),
  setOrigin: (origin) => set({ origin }),
  setDestination: (destination) => set({ destination }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setTripDetails: (tripDetails) => set({ tripDetails }),
  addTripDetail: (tripDetail) =>
    set((state) => ({ tripDetails: [...state.tripDetails, tripDetail] })),
  clearTripDetails: () => set({ tripDetails: [] }),
  setIndexTripSelected: (index) => set({ indexTripSelected: index }),
  setFirstLeg: (leg) => set({ firstLeg: leg }),
  setLastLeg: (leg) => set({ lastLeg: leg }),
  setAllLegs: (legs) => set({ allLegs: legs }),
  formattedDuration: (duration: OJP.Duration | undefined) => {
    if (!duration) return "N/A";

    const totalMinutes = duration.totalMinutes ?? 0;
    const hours = duration.hours ?? Math.floor(totalMinutes / 60);
    const minutes = duration.minutes ?? totalMinutes % 60;

    if (hours > 0) {
      return `${hours} h ${minutes} min Reisezeit`;
    } else {
      return `${minutes} min Reisezeit`;
    }
  }
}));
