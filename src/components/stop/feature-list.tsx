import React from "react";
import { SquareCheckBig } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import { useBehigRecordStore } from "@/store/useBehigRecordStore";

/**
 * Component displaying a list of features with checkboxes.
 * @returns {React.ReactElement} - FeatureList component.
 */
export default function FeatureList(): React.ReactElement {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const { behigRecord } = useBehigRecordStore();

  const assistanceavailability = behigRecord.assistanceavailability;
  const assistanceservice = behigRecord.assistanceservice;
  const audioticketmachine = behigRecord.audioticketmachine;
  const contrastingareas = behigRecord.contrastingareas;
  const dynamicaudiosystem = behigRecord.dynamicaudiosystem;
  const dynamicopticsystem = behigRecord.dynamicopticsystem;
  const wheelchairticketmachine = behigRecord.wheelchairticketmachine;

  const featureMappings = [
    { value: assistanceavailability, text: "Unterstützung verfügbar" },
    { value: assistanceservice, text: "Rollstuhl-Assistenzdienst" },
    { value: audioticketmachine, text: "Audioticketmaschine" },
    { value: contrastingareas, text: "Kontrastierende Bereiche" },
    { value: dynamicaudiosystem, text: "Dynamisches Audiosystem" },
    { value: dynamicopticsystem, text: "Dynamisches optisches System" },
    { value: wheelchairticketmachine, text: "Rollstuhl-Ticket-Maschine" },
  ];

  const features = featureMappings
    .filter((feature) => feature.value === "YES")
    .map((feature) => feature.text);

  if (features.length === 0) {
    return <div></div>;
  } else {
    return (
      <div
        className={`${!isMobile ? "grid grid-cols-3 px-12" : "flex flex-col px-8"} gap-x-1 gap-y-6 py-4`}
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
