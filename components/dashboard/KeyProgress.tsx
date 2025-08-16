import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import ComplianceChart from "./ComplianceChart";

export default function KeyProgress() {
  const optimal_sleep = 8;
  const optimal_dinner = 3;
  const optimal_workout = 15;
  const optimal_wakeup = 1.5;
  const chartData = [
    {
      sleep: 2,
      last_meal_gap: 2,
      wakeup_gap: 2,
      workout: 12,
    },
  ];

  return (
    <div className="flex flex-col gap-4 px-4 lg:px-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Compliance with optimal measures</CardTitle>
          <CardDescription>Try to improve your points</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
            <ComplianceChart
              dataKey={"wakeup_gap"}
              label="Wakeup"
              desc="Wakeup at least 1.5hrs before sunrise"
              chartData={chartData}
              optimalValue={optimal_wakeup}
            />
            <ComplianceChart
              dataKey={"workout"}
              label="Workout"
              desc="Workout for at least 15mins a day"
              chartData={chartData}
              optimalValue={optimal_workout}
            />
            <ComplianceChart
              dataKey={"last_meal_gap"}
              label="Last meal gap"
              desc="Eat your last meal at least 3hrs before bed"
              chartData={chartData}
              optimalValue={optimal_dinner}
            />
            <ComplianceChart
              dataKey={"sleep"}
              label="Sleep"
              desc="Sleep at least 7hrs"
              chartData={chartData}
              optimalValue={optimal_sleep}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
