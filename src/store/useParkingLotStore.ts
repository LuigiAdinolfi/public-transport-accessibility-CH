import { ParkingLot } from "@/types/ParkingLot";
import { create } from "zustand";

/**
 * Interface defining the state structure for parking lot data.
 */
interface UseParkingLotState {
  parentServicePointSloid: string;
  parkingLot: ParkingLot;

  // Setter functions
  setParentServicePointSloid: (parentServicePointSloid: string) => void;
  setParkingLot: (parkingLot: ParkingLot) => void;
}

/**
 * Zustand hook for managing parking lot state.
 * @returns {UseParkingLotState} - The state and setter functions for parking lot data.
 */
export const useParkingLotStore = create<UseParkingLotState>((set) => ({
  parentServicePointSloid: "",
  parkingLot: {} as ParkingLot,
  setParentServicePointSloid: (parentServicePointSloid: string) =>
    set({ parentServicePointSloid }),
  setParkingLot: (parkingLot: ParkingLot) => set({ parkingLot }),
}));
