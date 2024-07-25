import React from "react";
import Demo from "@/app/demo/demo";

/**
 * Page component for displaying the data fetch comparison.
 *
 * This component renders a page with a title and a `Demo` component for showcasing data fetch comparisons.
 *
 * @returns {React.ReactElement} - The Page component element.
 */
const Page = (): React.ReactElement => {
  return (
    <div className="w-full max-w-screen-xl px-0">
      {/* Page Title */}
      <h1 className="flex justify-center text-[3rem] font-bold text-zinc-950">
        Data Fetch Comparison
      </h1>
      {/* Demo Component */}
      <Demo />
    </div>
  );
};

export default Page;
