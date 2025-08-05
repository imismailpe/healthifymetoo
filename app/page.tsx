"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useSessionQuery } from "@/hooks/useSessionQuery";
import { signOut, useSession } from "next-auth/react";

export default function Home() {
  // const { data: session, status } = useSession();
  // console.log(status, session);

  const { data: session, isLoading, error } = useSessionQuery();
  console.log("isLoading", isLoading, error, session);
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
            <Card>
              <CardContent>
                <div>Name: {session.user.name}</div>
                <div>Email: {session.user.email}</div>
                <div>Plan: {session.user.plan}</div>
              </CardContent>
              <CardFooter>
                <Button variant={"secondary"} onClick={() => signOut()}>
                  Logout
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <a href="/login">Login with Google</a>
          )}
        </div>
      </main>
      <footer className=""></footer>
    </div>
  );
}
