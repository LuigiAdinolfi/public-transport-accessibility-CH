import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { RatingStars } from "@/components/plan/rating-stars";
import { ButtonAddComment } from "@/components/plan/button-add-comment";
import * as React from "react";

export function CardRating() {
  return (
    <Card className="h-28 w-full py-4 lg:h-36 lg:w-96">
      <CardContent className="flex flex-col items-center justify-center space-y-4 px-4 lg:space-y-6">
        <div className="flex items-center justify-center space-y-2 lg:flex-col">
          <CardDescription className="font-base text-text/60 w-full text-center text-sm">
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
