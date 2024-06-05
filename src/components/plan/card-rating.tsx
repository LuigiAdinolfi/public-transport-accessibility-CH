import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { RatingStars } from "@/components/plan/rating-stars";
import { ButtonAddComment } from "@/components/plan/button-add-comment";
import * as React from "react";

export function CardRating() {
  return (
    <Card className="w-full lg:h-36 h-28 lg:w-96 py-4">
      <CardContent className="px-4 flex flex-col items-center justify-center lg:space-y-6 space-y-4">
        <div className="flex lg:flex-col items-center justify-center space-y-2">
          <CardDescription className="w-full text-sm font-base text-text/60 text-center">
            Reiseerfahrung
          </CardDescription>
          <div className="flex justify-center">
            <RatingStars />
          </div>
        </div>
        <ButtonAddComment />
      </CardContent>
    </Card>
  );
}
