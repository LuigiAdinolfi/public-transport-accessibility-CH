import { ParkingLot } from "@/types/ParkingLot";
import { create } from "zustand";

interface UseParkingLotState {
  parentServicePointSloid: string;
  parkingLot: ParkingLot;
  setParentServicePointSloid: (parentServicePointSloid: string) => void;
  setParkingLot: (parkingLot: ParkingLot) => void;
}

export const useParkingLotStore = create<UseParkingLotState>((set) => ({
  parentServicePointSloid: "",
  parkingLot: {} as ParkingLot,
  setParentServicePointSloid: (parentServicePointSloid: string) =>
    set({ parentServicePointSloid }),
  setParkingLot: (parkingLot: ParkingLot) => set({ parkingLot }),
}));
