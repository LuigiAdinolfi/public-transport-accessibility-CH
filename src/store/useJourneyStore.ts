import { create } from "zustand";
import * as OJP from "ojp-sdk";

interface JourneyState {
  activeSearchTab: "Dep" | "Arr";
  origin: OJP.Location | null;
  destination: OJP.Location | null;
  selectedDate: string;
  setActiveSearchTab: (tab: "Dep" | "Arr") => void;
  setOrigin: (origin: OJP.Location | null) => void;
  setDestination: (destination: OJP.Location | null) => void;
  setSelectedDate: (date: string) => void;
}

export const useJourneyStore = create<JourneyState>((set) => ({
  activeSearchTab: "Dep",
  origin: null,
  destination: null,
  selectedDate: "",
  setActiveSearchTab: (tab) => set({ activeSearchTab: tab }),
  setOrigin: (origin) => set({ origin }),
  setDestination: (destination) => set({ destination }),
  setSelectedDate: (date) => set({ selectedDate: date })
}));
