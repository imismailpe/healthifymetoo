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
      sleep: 7,
      dinner: 2,
      wakeup: 2,
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
          <div className="flex flex-col md:flex-row flex-wrap md:flex-nowrap gap-4">
            <ComplianceChart
              dataKey={"wakeup"}
              label="Wakeup"
              chartData={chartData}
              optimalValue={optimal_wakeup}
            />
            <ComplianceChart
              dataKey={"sleep"}
              label="Sleep"
              chartData={chartData}
              optimalValue={optimal_sleep}
            />
            <ComplianceChart
              dataKey={"workout"}
              label="Workout"
              chartData={chartData}
              optimalValue={optimal_workout}
            />
            <ComplianceChart
              dataKey={"dinner"}
              label="Dinner"
              chartData={chartData}
              optimalValue={optimal_dinner}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
