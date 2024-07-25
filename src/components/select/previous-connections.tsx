"use client";

import React from "react";
import { Button } from "@/components/ui/button";

/**
 * Component for displaying a button to view previous available connections.
 *
 * This component renders a button labeled "Frühere Verbindungen" which means "Previous Connections" in German.
 * The button is currently set up to log a message to the console when clicked. This behavior can be replaced
 * with actual navigation or functionality to view previous connections as needed.
 *
 * @returns {React.ReactElement} The rendered button component for viewing previous connections.
 */
export default function PreviousConnections(): React.ReactElement {
  return (
    <div className="flex w-full justify-center">
      <Button
        className="flex w-full text-base font-medium"
        variant="secondary"
        aria-label="Previous Connections"
        onClick={() => console.log("Previous Connections")}
      >
        Frühere Verbindungen
      </Button>
    </div>
  );
}
