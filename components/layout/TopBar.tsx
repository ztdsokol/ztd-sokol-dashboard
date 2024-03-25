import { UserButton } from "@clerk/nextjs";
import React from "react";

const TopBar = () => {
  return (
    <div className="flex flex-row justify-between px-10 py-4">
      <div className="">ZTD SOKOL</div>
      <UserButton />{" "}
    </div>
  );
};

export default TopBar;
