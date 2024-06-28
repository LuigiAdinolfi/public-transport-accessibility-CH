import React from "react";
import { BackButton } from "@/components/shared/back-button";
import { HelpButton } from "@/components/shared/help-button";

/**
 * Header component displaying back and help buttons.
 * @returns {React.ReactElement} HeaderButtons component.
 */
export default function HeaderButtons(): React.ReactElement {
  return (
    <div className="mt-1 flex items-center justify-between">
      <BackButton />
      <HelpButton />
    </div>
  );
}
