"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { LogDrawer } from "@/components/vitals/LogDrawer";
// import { DataTable } from "@/components/data-table";
// import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";
import { HeartPlus, UserPlus } from "lucide-react";
import KeyProgress from "@/components/dashboard/KeyProgress";
import { VitalHistory } from "@/components/vitals/VitalHistory";
import AIAdvice from "@/components/dashboard/AIAdvice";
import { TimelyLogDrawer } from "@/components/vitals/TimelyLogDrawer";

export default function Page() {
  const [logOpen, setLogOpen] = useState(false);
  const [tsLogOpen, setTSLogOpen] = useState(false);
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
              <AIAdvice />
              <KeyProgress />
              {/* <SectionCards /> */}
              <div className="px-4 lg:px-6">
                <VitalHistory />
              </div>
              {/* <DataTable data={data} /> */}
            </div>
          </div>
        </div>
        <div className="sticky right-[32px] bottom-[32px] flex justify-end w-full flex gap-2">
          <Button
            variant="default"
            onClick={() => setLogOpen(!logOpen)}
            className="font-semibold rounded-full"
          >
            <UserPlus />
          </Button>
          <Button
            variant="default"
            onClick={() => setTSLogOpen(!logOpen)}
            className="font-semibold rounded-full"
          >
            <HeartPlus />
          </Button>
        </div>
        <LogDrawer open={logOpen} onOpenChange={setLogOpen} />
        <TimelyLogDrawer open={tsLogOpen} onOpenChange={setTSLogOpen} />
      </SidebarInset>
    </SidebarProvider>
  );
}
