'use client';

import WebSocketStream from "@/components/WebSocketStream";
import ClientWrapper from "@/components/ClientWrapper";
import Card from "@/components/ui/Card";

export default function StreamingPage() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Sensor Data Streaming</h2>
      <ClientWrapper>
        <Card
          title="Live Sensor Data"
          content={
            <WebSocketStream />
          }
        />
      </ClientWrapper>
    </div>
  );
}
