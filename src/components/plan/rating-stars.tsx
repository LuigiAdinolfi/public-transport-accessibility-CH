"use client";

import { useState } from "react";
import { Rating as ReactRating } from "@smastrom/react-rating";

export function RatingStars() {
  const [rating, setRating] = useState(0);

  return (
    <ReactRating
      style={{ maxWidth: 120 }}
      value={rating}
      onChange={setRating}
    />
  );
}
