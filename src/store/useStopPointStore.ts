import { create } from "zustand";
import { StopPoint } from "@/types/StopPoint";

/**
 * Interface defining the state structure for stop point data.
 */
interface StopPointStore {
  stopPoint: StopPoint;
  setStopPoint: (stopPoint: StopPoint) => void;
}

/**
 * Zustand hook for managing stop point state.
 * @returns {StopPointStore} - The state and setter functions for stop point data.
 */
export const useStopPointStore = create<StopPointStore>((set) => ({
  stopPoint: {} as StopPoint,
  setStopPoint: (stopPoint: StopPoint) => set({ stopPoint }),
}));
