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
import Link from "next/link";
import { useUserQuery } from "@/hooks/useUserQuery";
import UserCard from "./profile/UserCard";

export default function ProfileMenu() {
  const { data: session } = useSessionQuery();
  const userQuery = useUserQuery(session?.user?.id);
  const userData = userQuery?.data?.data[0];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <User className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {userData ? (
          <div className="p-4 rounded flex flex-col gap-4">
            <UserCard />
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/conditions">Health</Link>
            <Link href="/settings">Settings</Link>

            <div>Plan: {userData.plan}</div>
            <Button
              variant={"secondary"}
              onClick={() =>
                signOut({
                  redirect: true,
                  callbackUrl: "/",
                })
              }
            >
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
