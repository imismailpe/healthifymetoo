"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSessionQuery } from "@/hooks/useSessionQuery";
import { User } from "lucide-react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

export default function ProfileMenu() {
  const { data: session, isLoading, error } = useSessionQuery();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <User className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {session?.user ? (
          <div className="p-4 rounded flex flex-col gap-4">
            <div>{session.user.name}</div>
            <div>{session.user.email}</div>
            <div>Plan: {session.user.plan}</div>
            <Button variant={"secondary"} onClick={() => signOut()}>
              Logout
            </Button>
          </div>
        ) : (
          <div className="p-4">
            <a href="/login">Login</a>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
