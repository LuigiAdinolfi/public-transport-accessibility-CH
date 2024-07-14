import { StopPoint } from "@/types/StopPoint";
import { create } from "zustand";

interface StopPointStore {
  stopPoint: StopPoint | null;
  setStopPoint: (stopPoint: StopPoint | null) => void;
}

export const useStopPointStore = create<StopPointStore>((set) => ({
  stopPoint: null,
  setStopPoint: (stopPoint) => set({ stopPoint }),
}));
