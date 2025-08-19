import React from "react";
import { ChartConfig, ChartContainer } from "../ui/chart";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

export default function ComplianceChart({
  dataKey,
  label,
  chartData,
  optimalValue,
  desc,
  unit,
}: {
  dataKey: string;
  label: string;
  chartData: Record<string, number>;
  optimalValue: number;
  desc: string;
  unit: string;
}) {
  const chartConfig = {} satisfies ChartConfig;
  const userValue = chartData[dataKey];
  const higherThan100Good = ["workout"];
  const userPerc =
    userValue <= optimalValue || higherThan100Good.includes(dataKey)
      ? (userValue / optimalValue) * 100
      : ((optimalValue - (userValue - optimalValue)) / optimalValue) * 100;

  return (
    <div className="flex flex-col shadow-sm p-4 rounded-sm">
      <div className="font-semibold flex justify-between">
        <span>{label}</span>
        <span>
          {userValue}
          {unit}
        </span>
      </div>
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[250px] min-h-[200px]"
      >
        <RadialBarChart
          data={[
            {
              [dataKey]: userValue,
              fill:
                userPerc <= 50
                  ? "var(--chart-1)"
                  : userPerc >= 50 && userPerc < 80
                  ? "var(--chart-4)"
                  : "var(--chart-2)",
            },
          ]}
          startAngle={0}
          endAngle={userPerc * 3.6}
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
          <RadialBar dataKey={dataKey} background cornerRadius={10} />
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
                        {`${userPerc.toFixed(1)}%`}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        {label}
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </PolarRadiusAxis>
        </RadialBarChart>
      </ChartContainer>
      <div className="flex flex-col gap-2">
        <div className="text-md font-semibold">
          {userPerc <= 50
            ? `${label} is poor`
            : userPerc < 80
            ? `${label} needs improvement`
            : userPerc < 95
            ? `${label} is fine but not optimal`
            : (userPerc >= 95 && userPerc <= 100) ||
              higherThan100Good.includes(dataKey)
            ? `Looks good`
            : `${label} needs improvement`}
        </div>
        <div className="text-sm font-thin">{desc}</div>
      </div>
    </div>
  );
}
