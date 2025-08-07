import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "./ModeToggle";

export default function Header() {
  return (
    <div className="p-2 shadow-md flex gap-4 justify-between items-center">
      <div>HealthifyMeToo</div>
      <ModeToggle />
    </div>
  );
}
