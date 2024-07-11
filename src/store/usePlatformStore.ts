import { create } from "zustand";
import { Platform } from "@/types/Platform";

interface PlatformState {
  platformOrigin: Platform | null;
  platformDestination: Platform | null;
  setPlatformOrigin: (platform: Platform | null) => void;
  setPlatformDestination: (platform: Platform | null) => void;
}

export const usePlatformStore = create<PlatformState>((set) => ({
  platformOrigin: null,
  platformDestination: null,
  setPlatformOrigin: (platform) => set({ platformOrigin: platform }),
  setPlatformDestination: (platform) => set({ platformDestination: platform }),
}));
