"use client";

import * as React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import VitalChart from "./VitalChart";
import BPChart from "./BPChart";

const chartData = [
  {
    date: "2025-07-26",
    bp_systolic: 110,
    bp_diastolic: 70,
    glucose_fasting: 107,
    glucose_after: 200,
    cholestrol: 50,
    weight: 55,
  },
  {
    date: "2025-07-27",
    bp_systolic: 125,
    bp_diastolic: 70,
    glucose_fasting: 106,
    glucose_after: 230,
    cholestrol: 90,
    weight: 52,
  },
  {
    date: "2025-07-30",
    bp_systolic: 120,
    bp_diastolic: 80,
    glucose_fasting: 80,
    glucose_after: 200,
    cholestrol: 56,
    weight: 56,
  },
  {
    date: "2025-08-04",
    bp_systolic: 120,
    bp_diastolic: 70,
    glucose_fasting: 170,
    glucose_after: 170,
    cholestrol: 60,
    weight: 50,
  },
  {
    date: "2025-08-06",
    bp_systolic: 130,
    bp_diastolic: 80,
    glucose_fasting: 175,
    glucose_after: 200,
    cholestrol: 50,
    weight: 55,
  },
  {
    date: "2025-08-11",
    bp_systolic: 140,
    bp_diastolic: 90,
    glucose_fasting: 150,
    glucose_after: 210,
    cholestrol: 95,
    weight: 55,
  },
  {
    date: "2025-08-12",
    bp_systolic: 110,
    bp_diastolic: 80,
    glucose_fasting: 160,
    glucose_after: 200,
    cholestrol: 46,
    weight: 57,
  },
  {
    date: "2025-08-15",
    bp_systolic: 120,
    bp_diastolic: 80,
    glucose_fasting: 110,
    glucose_after: 190,
    cholestrol: 50,
    weight: 58,
  },
];

export function VitalHistory() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("30d");

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Vitals History</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Vital readings for past days
          </span>
          <span className="@[540px]/card:hidden">Last 30 days</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="20d">Last 20 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="20d" className="rounded-lg">
                Last 20 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6 grid grid-cols-1 xl:grid-cols-2 gap-4">
        <BPChart
          timeRange={timeRange}
          chartData={chartData}
          dataKey1="bp_systolic"
          dataKey2="bp_diastolic"
          label1="Systolic"
          label2="Diastolic"
          title="Blood Pressure(mmHG)"
        />
        <VitalChart
          timeRange={timeRange}
          chartData={chartData}
          dataKey="cholestrol"
          label="(mg/dL)"
          title="Cholestrol(mg/dL)"
        />
        <VitalChart
          timeRange={timeRange}
          chartData={chartData}
          dataKey="glucose_fasting"
          label="(mmol/L)"
          title="Glucose while fasting(mmol/L)"
        />
        <VitalChart
          timeRange={timeRange}
          chartData={chartData}
          dataKey="glucose_after"
          label="(mmol/L)"
          title="Glucose after food(mmol/L)"
        />
        <VitalChart
          timeRange={timeRange}
          chartData={chartData}
          dataKey="weight"
          label="kg"
          title="Weight(kg)"
        />
      </CardContent>
    </Card>
  );
}
