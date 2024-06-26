import { create } from "zustand";
import * as OJP from "ojp-sdk";

interface JourneyState {
  activeSearchTab: "Dep" | "Arr";
  origin: OJP.Location | null;
  destination: OJP.Location | null;
  selectedDate: string;
  tripDetails: OJP.Trip[];
  setActiveSearchTab: (tab: "Dep" | "Arr") => void;
  setOrigin: (origin: OJP.Location | null) => void;
  setDestination: (destination: OJP.Location | null) => void;
  setSelectedDate: (date: string) => void;
  setTripDetails: (tripDetails: OJP.Trip[]) => void;
  addTripDetail: (tripDetail: OJP.Trip) => void;
  clearTripDetails: () => void;
}

export const useJourneyStore = create<JourneyState>((set) => ({
  activeSearchTab: "Dep",
  origin: null,
  destination: null,
  selectedDate: "",
  tripDetails: [],
  setActiveSearchTab: (tab) => set({ activeSearchTab: tab }),
  setOrigin: (origin) => set({ origin }),
  setDestination: (destination) => set({ destination }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setTripDetails: (tripDetails) => set({ tripDetails }),
  addTripDetail: (tripDetail) => set((state) => ({
    tripDetails: [...state.tripDetails, tripDetail],
  })),
  clearTripDetails: () => set({ tripDetails: [] }),
}));

