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
}: {
  dataKey: string;
  label: string;
  chartData: Record<string, number>[];
  optimalValue: number;
}) {
  const chartConfig = {} satisfies ChartConfig;
  const userValue = chartData[0][dataKey];
  const userPerc = (userValue / optimalValue) * 100;
  return (
    <div className="flex flex-col shadow-sm p-4 rounded-sm justify-center items-center">
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[250px] min-h-[200px]"
      >
        <RadialBarChart
          data={[
            {
              [dataKey]: userValue,
              fill:
                userPerc > 100 || userPerc < 50
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
      <div className="">
        {userPerc <= 50
          ? `${label} score needs improvement`
          : userPerc < 80
          ? `${label} score needs improvement`
          : userPerc <= 100
          ? `${label} score is fine but not optimal`
          : `${label} score needs improvement`}
      </div>
    </div>
  );
}
