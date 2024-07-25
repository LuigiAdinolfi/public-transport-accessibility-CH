import React from "react";

/**
 * Renders the access text location with a link if the text ends with "vorher anmelden".
 *
 * @param {string | undefined} text - The text to be rendered.
 * @returns {React.ReactNode | null} The rendered text with a link or null if text is undefined.
 */
export const renderAccessTextLocation = (text: string | undefined) => {
  // If text is not provided, return null
  if (!text) return null;

  // If text ends with "vorher anmelden", split and render with a link
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

  // Return text as is if it doesn't end with "vorher anmelden"
  return text;
};
