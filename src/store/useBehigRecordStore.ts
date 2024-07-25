import { BehigRecord } from "@/types/BehigRecord";
import { create } from "zustand";

/**
 * Interface representing the state of the BehigRecord store.
 */
interface BehigRecordState {
  /**
   * The current BehigRecord object stored in the state.
   */
  behigRecord: BehigRecord;

  /**
   * Function to update the BehigRecord in the state.
   * @param behigRecord - The new BehigRecord to set.
   */
  setBehigRecord: (behigRecord: BehigRecord) => void;
}

/**
 * Creates a Zustand store for managing the BehigRecord state.
 * @returns The Zustand store with methods to get and set the BehigRecord state.
 */
export const useBehigRecordStore = create<BehigRecordState>((set) => ({
  // Initial state with an empty BehigRecord object.
  behigRecord: {} as BehigRecord,

  /**
   * Updates the BehigRecord in the state.
   * @param behigRecord - The new BehigRecord to set.
   */
  setBehigRecord: (behigRecord: BehigRecord) => set({ behigRecord }),
}));
