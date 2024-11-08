import React from "react";
import { CommunityRatingDetails } from "@/components/details/community-rating-details";
import { useMediaQuery } from "react-responsive";

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
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <div
      className="flex w-full items-center justify-center px-3 py-8 font-normal"
      role="region"
      aria-label={`Community rating section with a value of ${value} out of 5`}
    >
      <div className={`${isMobile ? "text-sm" : "pr-3"}`}>
        Bewertung der Community:
      </div>
      <CommunityRatingDetails value={value} />
    </div>
  );
}
