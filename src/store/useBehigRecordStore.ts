import { BehigRecord } from "@/types/BehigRecord";
import { create } from "zustand";

interface BehigRecordState {
  behigRecord: BehigRecord;
  setBehigRecord: (behigRecord: BehigRecord) => void;
}

export const useBehigRecordStore = create<BehigRecordState>((set) => ({
  behigRecord: {} as BehigRecord,
  setBehigRecord: (behigRecord: BehigRecord) => set({ behigRecord }),
}));
