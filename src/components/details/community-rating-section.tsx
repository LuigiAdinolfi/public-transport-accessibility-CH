import React from "react";
import { CommunityRatingDetails } from "@/components/details/community-rating-details";

interface CommunityRatingSectionProps {
  value: number;
}

/**
 * CommunityRatingSection component displaying a section for community rating.
 *
 * @param {CommunityRatingSectionProps} props - Props for CommunityRatingSection component.
 * @param {number} props.value - Current community rating value.
 * @returns {React.ReactElement} CommunityRatingSection component.
 */
export default function CommunityRatingSection({
  value,
}: CommunityRatingSectionProps): React.ReactElement {
  return (
    <div
      className="flex w-full items-center justify-center px-3 py-6 font-normal"
      role="region"
      aria-label={`Community rating section with a value of ${value} out of 5`}
    >
      <div className="pr-3">Bewertung der Community:</div>
      <CommunityRatingDetails value={value} />
    </div>
  );
}
