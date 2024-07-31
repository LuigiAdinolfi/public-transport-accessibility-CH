import React from "react";
import { BackButton } from "@/components/shared/back-button";
import { HelpButton } from "@/components/shared/help-button";

/**
 * Header component displaying back and help buttons.
 *
 * This component renders a header section with two buttons:
 * one for navigating back and another for accessing help.
 * The buttons are arranged in a flex container to be displayed
 * side by side.
 *
 * @returns {React.ReactElement} - The HeaderButtons component.
 */
export default function HeaderButtons(): React.ReactElement {
  return (
    <div className="mt-1 flex items-center justify-between">
      <BackButton />
      <HelpButton />
    </div>
  );
}
