"use client";

import { useState } from "react";
import { Rating, Star } from "@smastrom/react-rating";

export function RatingStars() {
  const [rating, setRating] = useState(0);

  const myStyles = {
    itemShapes: Star,
    itemStrokeWidth: 2,
    activeFillColor: "#A1A1AA",
    activeStrokeColor: "#18181B",
    inactiveFillColor: "#FAFAFA",
    inactiveStrokeColor: "#A1A1AA",
  };

  return (
    <Rating
      style={{ maxWidth: 120 }}
      value={rating}
      onChange={setRating}
      itemStyles={myStyles}
    />
  );
}
