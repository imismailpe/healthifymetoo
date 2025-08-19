import React from "react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

export default function PulseChart({
  chartData,
  timeRange,
  dataKey,
  label,
  title,
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
    const date = new Date(item.createdAt as string);
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
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="createdAt"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={32}
            tickFormatter={(value) => {
              const date = new Date(value);
              return (
                date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                }) +
                "-" +
                date.toLocaleTimeString("en-US", { timeStyle: "short" })
              );
            }}
          />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                labelFormatter={(_, payload) => {
                  if (!payload?.length) return "";
                  const raw = payload[0].payload.createdAt; // <-- use original millis
                  const date = new Date(raw);
                  return (
                    date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                    }) +
                    " - " +
                    date.toLocaleTimeString("en-US", { timeStyle: "short" })
                  );
                }}
                indicator="dot"
              />
            }
          />
          <Area
            dataKey={dataKey}
            type="linear"
            fill={`url(#fill${dataKey})`}
            stroke="var(--color-chart-2)"
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
