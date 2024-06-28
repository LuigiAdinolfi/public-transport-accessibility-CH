import { useRouter } from "next/navigation";
import { useJourneyStore } from "@/store/useJourneyStore";
import * as OJP from "ojp-sdk";

/**
 * Custom hook to handle click events for selecting trip details and navigating to the details page.
 * @param {OJP.TripLeg[]} allLegs - Array of trip legs to set in the journey store.
 * @returns Click event handler function.
 */
export const useHandleClick = (allLegs: OJP.TripLeg[]) => {
  const router = useRouter();
  const { setAllLegs } = useJourneyStore();

  /**
   * Handles the click event.
   */
  return () => {
    setAllLegs(allLegs); // Set all trip legs in the journey store
    router.push("/select/details"); // Navigate to the details page
  };
};
