"use client";

import { usePathname, useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import SessionControls from "@/components/SessionControls";
import { useGetCurrentSessionQuery } from "@/services/api";
import StreamingPage from "./streaming/page";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname() ?? "/dashboard/monitoring";

  // Extract the active tab from the URL
  const validTabs = ["monitoring", "analytics", "cybersecurity", "streaming"];
  let activeTab = pathname.split("/").pop() ?? "monitoring";
  if (!validTabs.includes(activeTab)) {
    activeTab = "monitoring";
  }

  const { data: sessionData } = useGetCurrentSessionQuery();

  const handleTabChange = (tab: string) => {
    router.push(`/dashboard/${tab}`);
  };

  return (
    <div className="p-6">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        {/* Session Controls & Session ID */}
        <div className="flex items-center space-x-4">
          {sessionData?.session_id ? (
            <p className="text-green-500 text-sm font-semibold">
              Session ID: {sessionData.session_id}
            </p>
          ) : (
            <p className="text-gray-500 text-sm">No Active Session</p>
          )}
            <SessionControls onStartSession={() => {}} onEndSession={() => {}} />
        </div>
      </div>

      {/* Tabs for Navigation */}
      <Tabs defaultValue={activeTab} onValueChange={handleTabChange}>
        <TabsList className="border-b border-gray-300">
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="cybersecurity">Cybersecurity</TabsTrigger>
          <TabsTrigger value="streaming">Streaming</TabsTrigger>
        </TabsList>

        {/* Tab Content */}
        <TabsContent value="monitoring">{activeTab === "monitoring" && children}</TabsContent>
        <TabsContent value="analytics">{activeTab === "analytics" && children}</TabsContent>
        <TabsContent value="cybersecurity">{activeTab === "cybersecurity" && children}</TabsContent>
        <TabsContent value="streaming">
          {activeTab === "streaming" && <StreamingPage isStreaming={!!sessionData?.session_id} />}
        </TabsContent>
      </Tabs>
    </div>
  );
}
