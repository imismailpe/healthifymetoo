import React from "react";
import { ModeToggle } from "./ModeToggle";

export default function Header() {
  return (
    <div className="p-2 shadow-md flex gap-4 justify-between items-center">
      <h1 className="text-xl font-semibold">HealthyBeing</h1>
      <ModeToggle />
    </div>
  );
}
