import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ChartConfig, ChartContainer } from "../ui/chart";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

export default function KeyProgress() {
  const chartConfig = {
    optimal_p: {
      label: "Optimal",
      color: "var(--chart-2)",
    },
    user_p: {
      label: "Yours",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;
  const optimal_sleep = 8;
  const optimal_dinner = 3;
  const optimal_workout = 15;
  const chartData = [
    {
      sleep: 7,
      fill: "var(--chart-2)",
      dinner: 2,
      wakeup: 2,
      workout: 10,
    },
  ];

  return (
    <div className="flex flex-col gap-4 px-4 lg:px-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Compliance with optimal measures</CardTitle>
          <CardDescription>Try to improve your points</CardDescription>
        </CardHeader>
        <CardContent className="flex h-fit min-h-[250px]">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <RadialBarChart
              data={chartData}
              startAngle={0}
              endAngle={(chartData[0].sleep / optimal_sleep) * 360}
              innerRadius={80}
              outerRadius={110}
            >
              <PolarGrid
                gridType="circle"
                radialLines={false}
                stroke="none"
                className="first:fill-muted last:fill-background"
                polarRadius={[86, 74]}
              />
              <RadialBar dataKey="sleep" background cornerRadius={10} />
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-4xl font-bold"
                          >
                            {`
                              ${(
                                (chartData[0].sleep / optimal_sleep) *
                                100
                              ).toFixed(2)}%`}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Sleep
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </PolarRadiusAxis>
            </RadialBarChart>
          </ChartContainer>
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <RadialBarChart
              data={chartData}
              startAngle={0}
              endAngle={(chartData[0].workout / optimal_workout) * 360}
              innerRadius={80}
              outerRadius={110}
            >
              <PolarGrid
                gridType="circle"
                radialLines={false}
                stroke="none"
                className="first:fill-muted last:fill-background"
                polarRadius={[86, 74]}
              />
              <RadialBar dataKey="sleep" background cornerRadius={10} />
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-4xl font-bold"
                          >
                            {`
                              ${(
                                (chartData[0].workout / optimal_workout) *
                                100
                              ).toFixed(2)}%`}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Workout
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </PolarRadiusAxis>
            </RadialBarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
