import { Rating, Star } from "@smastrom/react-rating";

export function CommunityRating({value}: {value: number}) {

  const myStyles = {
    itemShapes: Star,
    itemSize: 16,
    itemStrokeWidth: 2,
    activeFillColor: "#18181B",
    activeStrokeColor: "#18181B",
    inactiveFillColor: "#FAFAFA",
    inactiveStrokeColor: "#A1A1AA",
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
