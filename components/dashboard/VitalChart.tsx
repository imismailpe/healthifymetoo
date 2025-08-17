import React from "react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

export default function VitalChart({
  chartData,
  timeRange,
  dataKey,
  label,
  title
}: {
  chartData: Record<string, unknown>[];
  timeRange: string;
  dataKey: string;
  label: string;
  title: string;
}) {
  const chartConfig = {
    [dataKey]: {
      label: label,
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig;
  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date as string);
    const referenceDate = new Date();
    let daysToSubtract = 30;
    if (timeRange === "20d") {
      daysToSubtract = 20;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });
  return (
    <div className="flex flex-col">
      <div className="mb-4 font-semibold">{title}</div>
      <ChartContainer
        config={chartConfig}
        className="aspect-auto h-[250px] w-full"
      >
        <AreaChart data={filteredData}>
          <defs>
            <linearGradient id={`fill${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-chart-2)"
                stopOpacity={1.0}
              />
              <stop
                offset="95%"
                stopColor="var(--color-chart-2)"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={32}
            tickFormatter={(value) => {
              const date = new Date(value);
              return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });
            }}
          />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                labelFormatter={(value) => {
                  return new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
                indicator="dot"
              />
            }
          />
          <Area
            dataKey={dataKey}
            type="natural"
            fill={`url(#fill${dataKey})`}
            stroke="var(--color-chart-2)"
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
