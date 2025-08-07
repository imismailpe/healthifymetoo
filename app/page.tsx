"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function Home() {
  return (
    <div className="p-0 lg:p-4 w-full">
      <main className="text-lg">
        <div className="flex gap-4 flex-col">
          <div className="bg-[url('/images/bg2.jfif')] bg-cover bg-no-repeat bg-center w-full p-2 md:p-8 flex wrap rounded border-sm shadow-sm">
            <div className="text-black backdrop-blur-sm p-8 rounded bg-black/60 text-white">
              <h2 className="font-bold text-xl">
                Welcome to your path to natural wellness and a life Beyond
                Medication
              </h2>
              <div className="flex flex-col gap-4">
                <p className="text-md md:text-xl">
                  In today&rsquo;s fast-paced world, many rely on quick fixes
                  and medication to manage lifestyle-related health issues. But
                  true wellness begins with prevention, not pills. Our platform
                  is dedicated to promoting a medicine-free lifestyle by helping
                  you understand the power of natural healing, balanced
                  nutrition, and conscious living. We believe your body has the
                  innate ability to heal and thrive when supported with the
                  right habits.
                </p>
                <a href="/login">
                  <Button
                    className="font-bold hover:text-white cursor-pointer w-fit"
                    size={"lg"}
                  >
                    Get Started
                  </Button>
                </a>
              </div>
            </div>
          </div>
          <div className="w-full rounded p-8 flex gap-8 flex-col opacity-0 animate-[fadeIn_0.5s_ease-in_forwards]">
            <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center">
              <Image
                src="/images/bg1.jpg"
                alt="life icons"
                width={230}
                height={230}
                className="rounded-full object-cover w-full max-w-[400px]"
              />
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <h2 className="text-xl font-bold">
                    Nourish Your Body, Naturally
                  </h2>
                  <p>
                    Explore a range of expert-designed healthy diet plans
                    tailored to individual needs — whether your goal is weight
                    loss, detox, improved energy, or managing chronic conditions
                    like diabetes, cholesterol, high blood pressure or any other
                    conditions. Our plans are rooted in no chemicals, no fad
                    diets — just simple, sustainable nutrition that respects
                    your body and nature.
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <h2 className="text-xl font-bold">Lifestyle as Medicine</h2>
                  <p>
                    Health isn&rsquo;t just about what you eat — it&rsquo;s also
                    about how you live. We guide you in building daily routines
                    that promote sleep, movement, mindfulness, and emotional
                    well-being. From stress management to morning rituals, we
                    help you reclaim control of your health the natural way.
                  </p>
                </div>
              </div>
            </section>
          </div>

          <section className="bg-[url('/images/bg3.jfif')] bg-cover bg-no-repeat bg-center w-full rounded grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 p-8">
            <div className="flex flex-col gap-4 backdrop-blur-xl p-8 bg-white/50 rounded text-black shadow-md">
              <h2 className="text-xl font-bold">
                Take Control of Chronic Conditions — Naturally
              </h2>
              <p>
                Living with chronic conditions doesn&rsquo;t have to mean a
                lifetime of medication. Our approach empowers you to manage and
                even reverse common health issues such as diabetes, high blood
                pressure, PCOS, obesity, arthritis, and digestive disorders —
                through natural, sustainable changes in lifestyle and diet.
              </p>
            </div>
            <div className="flex flex-col gap-4 backdrop-blur-xl p-8 bg-white/50 rounded text-black shadow-md">
              <h2 className="text-xl font-bold">
                Food as Healing, Not Just Fuel
              </h2>
              <p>
                We offer carefully crafted diet plans designed to reduce
                inflammation, balance hormones, stabilize blood sugar, and
                support your body&rsquo;s healing mechanisms. These are not
                crash diets or generic meal plans — they are rooted in natural,
                whole foods and tailored to suit specific conditions and body
                types.
              </p>
            </div>
            <div className="flex flex-col gap-4 backdrop-blur-xl p-8 bg-white/50 rounded text-black shadow-md">
              <h2 className="text-xl font-bold">A Lifestyle Beyond Pills</h2>
              <p>
                Modern medicine often treats symptoms, not causes. Our
                philosophy is different. We focus on restoring balance — through
                clean eating, stress reduction, improved sleep, gentle movement,
                and detox practices. Small daily changes can make a big impact
                on your long-term health.
              </p>
            </div>
            <div className="flex flex-col gap-4 backdrop-blur-xl p-8 bg-white/50 rounded text-black shadow-md">
              <h2 className="text-xl font-bold">Start Your Healing Journey</h2>
              <p>
                Whether you&rsquo;ve just been diagnosed or have been struggling
                for years, our resources can guide you toward a medicine-free
                path to better health. It&rsquo;s not about rejecting medical
                care — it&rsquo;s about reducing dependence on drugs by making
                your lifestyle the foundation of your healing.
              </p>
            </div>
          </section>

          <Card className="m-2">
            <CardHeader>
              <CardTitle>
                <h2 className="text-xl font-bold">
                  Join the Wellness Revolution
                </h2>
              </CardTitle>
            </CardHeader>
            <CardContent className="relative grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
              <img
                src={"/images/bg2.jfif"}
                alt="life beyond medication"
                className="rounded w-full"
              />
              <div className="flex gap-4 flex-col">
                <p>
                  If you&rsquo;re ready to move beyond dependency on medicine
                  and embrace holistic wellness, you&rsquo;re in the right
                  place. Our resources, community, and support will walk with
                  you every step of the way - toward a life that&rsquo;s
                  vibrant, balanced, and medicine-free.
                </p>
                <a href="/login">
                  <Button
                    className="font-bold hover:text-white cursor-pointer w-fit"
                    size={"lg"}
                  >
                    Get Started
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className=""></footer>
    </div>
  );
}
