"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { LogDrawer } from "@/components/HealthLog/LogDrawer";
// import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";
import { HeartPlus } from "lucide-react";
import KeyProgress from "@/components/dashboard/KeyProgress";

// import data from "./data.json";

export default function Page() {
  const [logOpen, setLogOpen] = useState(false);
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset className="relative">
        <SiteHeader title="Dashboard" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <KeyProgress />
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              {/* <DataTable data={data} /> */}
            </div>
          </div>
        </div>
        <div className="sticky right-[16px] bottom-[16px] flex justify-end w-full">
          <Button
            variant="default"
            onClick={() => setLogOpen(!logOpen)}
            className="font-semibold rounded-full"
          >
            <HeartPlus />
          </Button>
        </div>
        <LogDrawer open={logOpen} onOpenChange={setLogOpen} />
      </SidebarInset>
    </SidebarProvider>
  );
}
