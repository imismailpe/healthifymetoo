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
import { useSessionQuery } from "@/hooks/useSessionQuery";
import { Skeleton } from "../ui/skeleton";
import { useVitalsQuery } from "@/hooks/useVitalsQuery";

export function VitalHistory() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("30d");

  const { data: session } = useSessionQuery();
  const userId = session?.user?.id || "";

  const vitalsQuery = useVitalsQuery(userId);
  const chartData = vitalsQuery?.data?.data || [];
  const VitalsChartList = [
    {
      dataKey: "cholestrol",
      label: "(mg/dL)",
      title: "Cholestrol(mg/dL)",
    },
    {
      dataKey: "glucose_fasting",
      label: "(mmol/L)",
      title: "Glucose while fasting(mmol/L)",
    },
    {
      dataKey: "glucose_after",
      label: "(mmol/L)",
      title: "Glucose after food(mmol/L)",
    },
    {
      dataKey: "weight",
      label: "(kg)",
      title: "Body weight(kg)",
    },
    {
      dataKey: "heart_rate",
      label: "(bpm)",
      title: "Heart pulse rate(pbm)",
    },
  ];
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
            disabled={vitalsQuery.isFetching}
          >
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="20d">Last 20 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select
            value={timeRange}
            onValueChange={setTimeRange}
            disabled={vitalsQuery.isFetching}
          >
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
        {vitalsQuery.isFetched ? (
          <BPChart
            timeRange={timeRange}
            chartData={chartData}
            dataKey1="bp_systolic"
            dataKey2="bp_diastolic"
            label1="Systolic"
            label2="Diastolic"
            title="Blood Pressure(mmHG)"
          />
        ) : (
          <div className="flex gap-4 flex-col">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        )}
        {VitalsChartList.map((vital) => (
          <React.Fragment key={vital.dataKey}>
            {vitalsQuery.isFetched ? (
              <VitalChart
                timeRange={timeRange}
                chartData={chartData}
                dataKey={vital.dataKey}
                label={vital.label}
                title={vital.title}
              />
            ) : (
              <div className="flex gap-4 flex-col">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            )}
          </React.Fragment>
        ))}
      </CardContent>
    </Card>
  );
}
