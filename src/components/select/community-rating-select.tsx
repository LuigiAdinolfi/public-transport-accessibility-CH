import { Rating, Star } from "@smastrom/react-rating";
import { useTheme } from "next-themes";
import React from "react";

/**
 * Component to display community rating using stars.
 * @param {Object} props - Component props.
 * @param {number} props.value - Rating value (from 1 to 5).
 * @returns {React.ReactElement} - The rendered component displaying the community rating.
 */
export function CommunityRatingSelect({
  value,
}: {
  value: number;
}): React.ReactElement {
  const { resolvedTheme } = useTheme();

  // Styles for the star rating component based on the theme
  const myStyles = {
    itemShapes: Star,
    itemSize: 16,
    itemStrokeWidth: 2,
    activeFillColor: resolvedTheme === "light" ? "#18181B" : "#FAFAFA",
    activeStrokeColor: resolvedTheme === "light" ? "#18181B" : "#FAFAFA",
    inactiveFillColor: resolvedTheme === "light" ? "#FAFAFA" : "#18181B",
    inactiveStrokeColor: resolvedTheme === "light" ? "#A1A1AA" : "#A1A1AA",
  };

  return (
    <Rating
      style={{ maxWidth: 80 }}
      value={value}
      itemStyles={myStyles}
      readOnly={true}
      aria-label={`Community rating: ${value} stars`}
    />
  );
}
