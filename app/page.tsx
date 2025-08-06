"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSessionQuery } from "@/hooks/useSessionQuery";
import { signOut } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {
  // const { data: session, status } = useSession();
  // console.log(status, session);

  const { data: session, isLoading, error } = useSessionQuery();
  console.log("isLoading", isLoading, error, session);

  return (
    <div className="p-4 w-full">
      <main className="">
        <div className="flex gap-4 flex-col">
          <h1 className="text-xl">Welcome to your path to natural wellness</h1>
          <Card className="opacity-0 animate-[fadeIn_0.4s_ease-in_forwards]">
            <CardHeader>
              <CardTitle>
                <h2>Welcome to a Life Beyond Medication</h2>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                In today's fast-paced world, many rely on quick fixes and
                medication to manage lifestyle-related health issues. But true
                wellness begins with prevention, not pills. Our platform is
                dedicated to promoting a medicine-free lifestyle by helping you
                understand the power of natural healing, balanced nutrition, and
                conscious living. We believe your body has the innate ability to
                heal and thrive when supported with the right habits.
              </p>
            </CardContent>
            <CardFooter>
              <Button
                className="font-bold hover:text-white cursor-pointer"
                size={"lg"}
              >
                Get Started
              </Button>
            </CardFooter>
          </Card>
          <Card className="opacity-0 animate-[fadeIn_0.5s_ease-in_forwards]">
            <CardHeader>
              <CardTitle>
                <h2>Nourish Your Body, Naturally</h2>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Explore a range of expert-designed healthy diet plans tailored
                to individual needs — whether your goal is weight loss, detox,
                improved energy, or managing chronic conditions like diabetes,
                cholesterol, high blood pressure or any other conditions. Our
                plans are rooted in no chemicals, no fad diets — just simple,
                sustainable nutrition that respects your body and nature.
              </p>
            </CardContent>
          </Card>
          <Card className="opacity-0 animate-[fadeIn_0.6s_ease-in_forwards]">
            <CardHeader>
              <CardTitle>
                <h2>Lifestyle as Medicine</h2>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Health isn't just about what you eat — it's also about how you
                live. We guide you in building daily routines that promote
                sleep, movement, mindfulness, and emotional well-being. From
                stress management to morning rituals, we help you reclaim
                control of your health the natural way.
              </p>
            </CardContent>
          </Card>

          <Card className="opacity-0 animate-[fadeIn_0.8s_ease-in_forwards]">
            <CardHeader>
              <CardTitle>
                <h2>Take Control of Chronic Conditions — Naturally</h2>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Living with chronic conditions doesn't have to mean a lifetime
                of medication. Our approach empowers you to manage and even
                reverse common health issues such as diabetes, high blood
                pressure, PCOS, obesity, arthritis, and digestive disorders —
                through natural, sustainable changes in lifestyle and diet.
              </p>
            </CardContent>
          </Card>

          <Card className="opacity-0 animate-[fadeIn_0.1s_ease-in_forwards]">
            <CardHeader>
              <CardTitle>
                <h2>Food as Healing, Not Just Fuel</h2>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                We offer carefully crafted diet plans designed to reduce
                inflammation, balance hormones, stabilize blood sugar, and
                support your body's healing mechanisms. These are not crash
                diets or generic meal plans — they are rooted in natural, whole
                foods and tailored to suit specific conditions and body types.
              </p>
            </CardContent>
          </Card>
          <Card className="opacity-0 animate-[fadeIn_0.4s_ease-in_forwards]">
            <CardHeader>
              <CardTitle>
                <h2>A Lifestyle Beyond Pills</h2>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Modern medicine often treats symptoms, not causes. Our
                philosophy is different. We focus on restoring balance — through
                clean eating, stress reduction, improved sleep, gentle movement,
                and detox practices. Small daily changes can make a big impact
                on your long-term health.
              </p>
            </CardContent>
          </Card>
          <Card className="opacity-0 animate-[fadeIn_0.5s_ease-in_forwards]">
            <CardHeader>
              <CardTitle>
                <h2>Start Your Healing Journey</h2>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Whether you've just been diagnosed or have been struggling for
                years, our resources can guide you toward a medicine-free path
                to better health. It's not about rejecting medical care — it's
                about reducing dependence on drugs by making your lifestyle the
                foundation of your healing.
              </p>
            </CardContent>
          </Card>
          <Card className="opacity-0 animate-[fadeIn_0.6s_ease-in_forwards]">
            <CardHeader>
              <CardTitle>
                <h2>Join the Wellness Revolution</h2>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                If you're ready to move beyond dependency on medicine and
                embrace holistic wellness, you're in the right place. Our
                resources, community, and support will walk with you every step
                of the way - toward a life that's vibrant, balanced, and
                medicine-free.
              </p>
            </CardContent>
            <CardFooter>
              <Button
                className="font-bold hover:text-white cursor-pointer"
                size={"lg"}
              >
                Get Started
              </Button>
            </CardFooter>
          </Card>

          <div className="opacity-0 animate-[fadeIn_0.4s_ease-in_forwards] bg-blue-400 p-4 rounded">
            Box 1
          </div>
          {session ? (
            <Card className="opacity-0 animate-[fadeIn_0.4s_ease-in_forwards]">
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
            <a href="/login">Get Started</a>
          )}
        </div>
      </main>
      <footer className=""></footer>
    </div>
  );
}
