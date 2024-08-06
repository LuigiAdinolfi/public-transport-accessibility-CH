import React from "react";
import { SquareCheckBig } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import { useStopPointStore } from "@/store/useStopPointStore";

/**
 * Component displaying a list of features with checkboxes.
 * Features are conditionally rendered based on their availability status from the stop point store.
 * The list is responsive and adapts layout based on screen size.
 *
 * @returns {React.ReactElement} - The FeatureList component.
 */
export default function FeatureList(): React.ReactElement {
  // Determine if the screen width is considered mobile (less than 768px)
  const isMobile = useMediaQuery({ maxWidth: 767 });

  // Access stop point data from the store
  const { stopPoint } = useStopPointStore();

  // Destructure relevant features from stop point data
  const assistanceService = stopPoint.assistanceService;
  const wheelchairTicketMachine = stopPoint.wheelchairTicketMachine;
  const wheelchairToilet = "YES"; // Hardcoded as "YES"
  const assistanceAvailability = stopPoint.assistanceAvailability;
  const audioTicketMachine = stopPoint.audioTicketMachine;
  const dynamicAudioSystem = stopPoint.dynamicAudioSystem;
  const dynamicOpticSystem = stopPoint.dynamicOpticSystem;

  // Define feature mappings with their corresponding labels
  const featureMappings = [
    { value: assistanceService, text: "Rollstuhl-Assistenzdienst" },
    { value: wheelchairTicketMachine, text: "Rollstuhl-Ticket-Maschine" },
    { value: wheelchairToilet, text: "Rollstuhlgängige Toilette" },
    { value: assistanceAvailability, text: "Unterstützung verfügbar" },
    { value: audioTicketMachine, text: "Audioticketmaschine" },
    { value: dynamicAudioSystem, text: "Dynamisches Audiosystem" },
    { value: dynamicOpticSystem, text: "Dynamisches optisches System" },
  ];

  // Filter and map features that are available
  const features = featureMappings
    .filter((feature) => feature.value === "YES")
    .map((feature) => feature.text);

  // If no features are available, return an empty div
  if (features.length === 0) {
    return <div></div>;
  } else {
    return (
      <div
        className={`${!isMobile ? "grid grid-cols-3 px-12" : "flex flex-col px-8"} gap-x-1 gap-y-6 py-6`}
      >
        {features.map((feature, index) => (
          <div key={index} className="flex flex-row items-center px-2">
            <SquareCheckBig size={isMobile ? 16 : 20} />
            <div
              className={`pl-2 align-middle font-normal ${isMobile ? "text-sm" : "text-base"}`}
            >
              {feature}
            </div>
          </div>
        ))}
      </div>
    );
  }
}
