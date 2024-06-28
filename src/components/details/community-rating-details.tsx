import { Rating, Star } from "@smastrom/react-rating";
import { useTheme } from "next-themes";
import React from "react";

/**
 * CommunityRatingDetails component displaying community rating with stars.
 *
 * @param {Object} props - Props for CommunityRatingDetails component.
 * @param {number} props.value - Current rating value.
 * @returns {React.ReactElement} CommunityRatingDetails component.
 */
export function CommunityRatingDetails({
  value,
}: {
  value: number;
}): React.ReactElement {
  const { resolvedTheme } = useTheme();

  // Styles for the star rating component based on theme
  const myStyles = {
    itemShapes: Star, // Shape of each rating item
    itemSize: 16, // Size of each rating item
    itemStrokeWidth: 2, // Stroke width of each rating item
    activeFillColor: resolvedTheme === "light" ? "#18181B" : "#FAFAFA", // Fill color when item is active
    activeStrokeColor: resolvedTheme === "light" ? "#18181B" : "#FAFAFA", // Stroke color when item is active
    inactiveFillColor: resolvedTheme === "light" ? "#FAFAFA" : "#18181B", // Fill color when item is inactive
    inactiveStrokeColor: resolvedTheme === "light" ? "#A1A1AA" : "#A1A1AA", // Stroke color when item is inactive
  };

  return (
    <Rating
      style={{ maxWidth: 100 }} // Limiting the maximum width of the rating component
      value={value} // Current rating value
      itemStyles={myStyles} // Custom styles for rating items
      readOnly={true} // Making the rating read-only
      aria-label={`Community rating: ${value} out of 5`} // Accessibility label for screen readers
    />
  );
}
