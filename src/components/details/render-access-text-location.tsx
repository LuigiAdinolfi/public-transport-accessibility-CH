// Function to handle rendering of accessTextLocation
import React from "react";

export const renderAccessTextLocation = (text: string | undefined) => {
  if (!text) return null;
  if (text.endsWith("vorher anmelden")) {
    const parts = text.split("vorher anmelden");
    return (
      <>
        {parts[0]}
        <a
          href=""
          className="font-bold text-zinc-950 underline dark:text-zinc-50"
        >
          vorher anmelden
        </a>
      </>
    );
  }
  return text;
};
