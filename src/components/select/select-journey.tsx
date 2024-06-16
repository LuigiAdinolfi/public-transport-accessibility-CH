import { HelpButton } from "@/components/shared/help-button";
import * as React from "react";
import { BackButton } from "@/components/shared/back-button";
import Link from "next/link";
import { CardSelectJourney } from "@/components/select/card-select-journey";

export function SelectJourney() {
  return (
    <div className="w-full lg:w-[960px]">
      <div className="mt-1 flex items-center justify-between">
        <Link href={"/"} passHref legacyBehavior>
          <BackButton />
        </Link>
        <HelpButton />
      </div>
      <CardSelectJourney />
    </div>
  );
}
