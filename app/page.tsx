"use client";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession();
  return (
    <div className="p-2 w-full">
      <main className="">
        <div className="flex gap-2 flex-col">
          <h1 className="text-xl">
            Are you following an unhealthy diet and paying a lot for it?
          </h1>
          <Button
            className="font-bold hover:text-white cursor-pointer"
            size={"lg"}
          >
            Get advices for a happy healthy life @ just $99
          </Button>
          {session ? (
            <Button variant={"secondary"} onClick={() => signOut()}>
              Logout
            </Button>
          ) : (
            <a href="/login">Login with Google</a>
          )}
        </div>
      </main>
      <footer className=""></footer>
    </div>
  );
}
