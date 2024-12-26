'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import StreamingPage from "@/app/monitoring/streaming/page";
import AnalyticsPage from "@/app/monitoring/analytics/page";

export default function MonitoringPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Monitoring & Analytics</h1>
      <Tabs defaultValue="streaming">
        <TabsList className="border-b border-gray-300">
          <TabsTrigger value="streaming">Streaming</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="streaming">
          <StreamingPage />
        </TabsContent>
        <TabsContent value="analytics">
          <AnalyticsPage />
        </TabsContent>
      </Tabs>
    </div>
  );
}
