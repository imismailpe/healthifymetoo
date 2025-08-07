import React from "react";
import { ModeToggle } from "./ModeToggle";
import ProfileMenu from "./ProfileMenu";

export default function Header() {
  return (
    <div className="p-2 shadow-md flex gap-4 justify-between items-center">
      <h1 className="text-xl font-semibold">HealthyBeing</h1>
      <div className="flex gap-2">
        <ModeToggle />
        <ProfileMenu />
      </div>
    </div>
  );
}
