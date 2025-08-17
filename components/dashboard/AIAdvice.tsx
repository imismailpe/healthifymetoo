"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { ShieldUserIcon } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { useSessionQuery } from "@/hooks/useSessionQuery";
import { useUserQuery } from "@/hooks/useUserQuery";
import { useHealthQuery } from "@/hooks/useHealthQuery";
import { useVitalsQuery } from "@/hooks/useVitalsQuery";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

export default function AIAdvice() {
  const [pending, setPending] = useState(false);
  const [advice, setAdvice] = useState("");

  const { data: session } = useSessionQuery();
  const userId = session?.user?.id || "";
  const userQuery = useUserQuery(userId);
  const healthQuery = useHealthQuery(userId);
  const vitalsQuery = useVitalsQuery(userId);

  const getAdvice = async () => {
    const userData = userQuery.data.data;

    if (userData[0]?.plan === "free") {
      toast("Not available on Free plan", {
        description: "Upgrade your plan to use AI features.",
        action: {
          label: "Close",
          onClick: () => console.log("Undo"),
        },
      });
      return;
    }

    setPending(true);

    const vitalsData = vitalsQuery.data.data;
    const healthData = healthQuery?.data.data;
    const params = {
      activity_level: healthData[0].activity_level,
      height: healthData[0].height,
      conditions: healthData[0].conditions,
      wakeup_gap: userData[0].wakeup_gap,
      workout: userData[0].workout,
      last_meal_gap: userData[0].last_meal_gap,
      sleep: userData[0].sleep,
      bp_systolic: vitalsData
        .slice(0, 5)
        .map((row: Record<string, unknown>) => row.date + ":" + row.bp_systolic)
        .join(","),
      bp_diastolic: vitalsData
        .slice(0, 5)
        .map(
          (row: Record<string, unknown>) => row.date + ":" + row.bp_diastolic
        )
        .join(","),
      cholestrol: vitalsData
        .slice(0, 5)
        .map((row: Record<string, unknown>) => row.date + ":" + row.cholestrol)
        .join(","),
      glucose_fasting: vitalsData
        .slice(0, 5)
        .map(
          (row: Record<string, unknown>) => row.date + ":" + row.glucose_fasting
        )
        .join(","),
      glucose_after: vitalsData
        .slice(0, 5)
        .map(
          (row: Record<string, unknown>) => row.date + ":" + row.glucose_after
        )
        .join(","),
      weight: vitalsData
        .slice(0, 5)
        .map((row: Record<string, unknown>) => row.date + ":" + row.weight)
        .join(","),
    };
    const response = await fetch("/api/ai", {
      method: "POST",
      body: JSON.stringify({
        action: "user_message",
        input: {
          health_params: { ...params },
        },
      }),
    });
    const responseJson = await response.json();
    setAdvice(responseJson?.advice?.advice || "");
    setPending(false);
  };
  return (
    <div className="mx-4 lg:mx-6">
      <div className="flex gap-4 border rounded p-4">
        <Button
          onClick={getAdvice}
          disabled={
            userQuery.isFetching ||
            healthQuery.isFetching ||
            vitalsQuery.isFetching
          }
        >
          <ShieldUserIcon /> Get Advice from AI
        </Button>
        <div>{pending ? <Skeleton className="w-[200px] h-10" /> : advice}</div>
      </div>
      <Toaster />
    </div>
  );
}
