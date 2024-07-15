import { create } from "zustand";
import { StopPoint } from "@/types/StopPoint";

interface StopPointStore {
  stopPoint: StopPoint;
  setStopPoint: (stopPoint: StopPoint) => void;
}

export const useStopPointStore = create<StopPointStore>((set) => ({
  stopPoint: {} as StopPoint,
  setStopPoint: (stopPoint: StopPoint) => set({ stopPoint }),
}));
