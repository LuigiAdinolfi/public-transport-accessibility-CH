import { Rating, Star } from "@smastrom/react-rating";
import { useTheme } from "next-themes";
import React from "react";

/**
 * Component to display community rating using stars.
 * @returns {React.ReactElement} - The rendered component displaying the community rating.
 */
export function AccountRating(): React.ReactElement {
  const { resolvedTheme } = useTheme();
  const [value, setValue] = React.useState(0);

  // Styles for the star rating component based on the theme
  const myStyles = {
    itemShapes: Star,
    itemSize: 24,
    itemStrokeWidth: 2,
    activeFillColor: resolvedTheme === "light" ? "#18181B" : "#FAFAFA",
    activeStrokeColor: resolvedTheme === "light" ? "#18181B" : "#FAFAFA",
    inactiveFillColor: resolvedTheme === "light" ? "#FAFAFA" : "#18181B",
    inactiveStrokeColor: resolvedTheme === "light" ? "#A1A1AA" : "#A1A1AA",
  };

  return (
    <Rating
      style={{ maxWidth: 100 }}
      value={value}
      itemStyles={myStyles}
      readOnly={false}
      onChange={setValue}
      aria-label={`Community rating: ${value} stars`}
    />
  );
}
