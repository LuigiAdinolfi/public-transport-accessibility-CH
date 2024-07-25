// In usePlatformStore.ts

import { create } from "zustand";
import { Platform } from "@/types/Platform";

/**
 * Interface defining the state structure for platform-related data.
 */
interface PlatformState {
  platformOrigin: Platform | null;
  platformDestination: Platform | null;

  // Setter functions
  setPlatformOrigin: (platform: Platform | null) => void;
  setPlatformDestination: (platform: Platform | null) => void;
}

/**
 * Zustand hook for managing platform-related state.
 * @returns {PlatformState} - The state and setter functions for platform-related data.
 */
export const usePlatformStore = create<PlatformState>((set) => ({
  platformOrigin: null,
  platformDestination: null,
  setPlatformOrigin: (platform) => set({ platformOrigin: platform }),
  setPlatformDestination: (platform) => set({ platformDestination: platform }),
}));
