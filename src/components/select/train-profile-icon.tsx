import {
  DarkTrainProfile,
  LightTrainProfile,
} from "@/assets/icons/train-profile";
import { useTheme } from "next-themes";
import React from "react";

/**
 * Component for displaying a train profile icon that changes based on the current theme.
 * @returns {React.ReactElement} The train profile icon component.
 */
export function TrainProfileIcon(): React.ReactElement {
  const { resolvedTheme } = useTheme();
  return resolvedTheme === "dark" ? (
    <DarkTrainProfile className="h-6 w-6" aria-hidden="true" />
  ) : (
    <LightTrainProfile className="h-6 w-6" aria-hidden="true" />
  );
}
