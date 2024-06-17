

import { Rating, Star } from "@smastrom/react-rating";
import { useTheme } from "next-themes";

export function CommunityRating({value}: {value: number}) {
  const { resolvedTheme } = useTheme();
  const myStyles = {
    itemShapes: Star,
    itemSize: 16,
    itemStrokeWidth: 2,
    activeFillColor: resolvedTheme === "light" ? "#18181B": "#FAFAFA",
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
    />
  );
}
