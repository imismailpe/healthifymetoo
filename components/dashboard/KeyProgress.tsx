import React, { useEffect, useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import ComplianceChart from "./ComplianceChart";
import { ClockPlus } from "lucide-react";
import { Button } from "../ui/button";
import UpdateCompliance from "./UpdateCompliance";
import { useUserQuery } from "@/hooks/useUserQuery";
import { useSessionQuery } from "@/hooks/useSessionQuery";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";

export default function KeyProgress() {
  const router = useRouter();
  const [updateComplianceOpen, setUpdateComplianceOpen] = useState(false);
  const optimal_sleep = 7;
  const optimal_dinner = 3;
  const optimal_workout = 15;
  const optimal_wakeup = 1.5;

  const defaultValues = {
    wakeup_gap: 1.5,
    workout: 15,
    last_meal_gap: 3,
    sleep: 7,
  };

  const [data, setData] = useState(defaultValues);
  const { data: session } = useSessionQuery();
  const userId = session?.user?.id || "";
  const userQuery = useUserQuery(userId);
  const chartDataReady = userQuery.isFetched && !userQuery.isFetching;

  useEffect(() => {
    if (chartDataReady) {
      const data = userQuery.data.data[0];

      const values = {
        wakeup_gap: data.wakeup_gap,
        workout: data.workout,
        last_meal_gap: data.last_meal_gap,
        sleep: data.sleep,
      };
      setData(values);
      if (!data.dob) {
        router.push("/profile");
      }
    }
  }, [chartDataReady]);
  const chartData = data;
  return (
    <div className="flex flex-col gap-4 px-4 lg:px-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Compliance with optimal measures</CardTitle>
          <CardDescription>Try to improve your points</CardDescription>
          <CardAction>
            <Button
              variant={"outline"}
              onClick={() => setUpdateComplianceOpen(true)}
            >
              <ClockPlus />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
            {chartDataReady ? (
              <ComplianceChart
                dataKey={"wakeup_gap"}
                label="Wakeup"
                desc="Wakeup at least 1.5hrs before sunrise"
                chartData={chartData}
                optimalValue={optimal_wakeup}
                unit="Hrs"
              />
            ) : (
              <div className="flex gap-4 flex-col">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            )}
            {chartDataReady ? (
              <ComplianceChart
                dataKey={"workout"}
                label="Workout"
                desc="Workout for at least 15mins a day"
                chartData={chartData}
                optimalValue={optimal_workout}
                unit="Mins"
              />
            ) : (
              <div className="flex gap-4 flex-col">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            )}
            {chartDataReady ? (
              <ComplianceChart
                dataKey={"last_meal_gap"}
                label="Last meal gap"
                desc="Eat your last meal at least 3hrs before going to bed"
                chartData={chartData}
                optimalValue={optimal_dinner}
                unit="Hrs"
              />
            ) : (
              <div className="flex gap-4 flex-col">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            )}
            {chartDataReady ? (
              <ComplianceChart
                dataKey={"sleep"}
                label="Sleep"
                desc="Sleep at least 7hrs"
                chartData={chartData}
                optimalValue={optimal_sleep}
                unit="Hrs"
              />
            ) : (
              <div className="flex gap-4 flex-col">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <UpdateCompliance
        open={updateComplianceOpen}
        onOpenChange={setUpdateComplianceOpen}
      />
    </div>
  );
}
