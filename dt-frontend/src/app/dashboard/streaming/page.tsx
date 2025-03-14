"use client";

import React from "react";
import { useStreamSensorDataQuery } from "@/services/api";
import Card from "@/components/ui/Card";

export default function StreamingPage({ isStreaming }: { isStreaming: boolean }) {
  const { data = [] } = useStreamSensorDataQuery(undefined, { skip: !isStreaming });

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Streaming</h2>
      <p>
        This is the mock data stream. Start the stream to see incoming data for diagnostic purposes.
        It is currently limited to displaying the last 10 records. This feature will eventually be removed.
      </p>

      {!isStreaming || data.length === 0 ? (
        <p className="text-gray-400 mt-4">No data is currently streaming.</p>
      ) : (
        <ul className="space-y-2 mt-4">
          {data.map((message, index) => (
            <li key={index}>
              <Card className="break-words">
                {message}
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
