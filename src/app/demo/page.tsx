import React from "react";
import Demo from "@/app/demo/demo";

const Page = () => {
  return (
    <div className="w-full max-w-screen-xl px-0">
      <h1 className="flex justify-center text-[3rem] font-bold text-zinc-950">
        Data Fetch Comparison
      </h1>
      <Demo />
    </div>
  );
};

export default Page;
