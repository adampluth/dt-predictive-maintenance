"use client";

import React, { useState } from "react";
import { useStreamSensorDataQuery, useGetCurrentSessionQuery } from "@/services/api";
import SessionControls from "./SessionControls";

export default function WebSocketStream() {
  const [isStreaming, setIsStreaming] = useState(false);

  // RTK Query should now update this automatically
  const { data: sessionData } = useGetCurrentSessionQuery();

  // Fetch WebSocket data only when streaming is active
  const { data = [] } = useStreamSensorDataQuery(undefined, { skip: !isStreaming });

  function handleStartSession() {
    setIsStreaming(true);
  }

  function handleEndSession() {
    setIsStreaming(false);
  }

  return (
    <div>
      <SessionControls onStartSession={handleStartSession} onEndSession={handleEndSession} />

      {/* Show session ID only if exists */}
      {sessionData?.session_id ? (
        <p className="text-lg font-semibold text-green-500">
          Current Session ID: {sessionData.session_id}
        </p>
      ) : (
        <p className="text-lg font-semibold text-gray-500">No Active Session</p>
      )}

      {/* WebSocket Messages */}
      <ul className="space-y-2 mt-4">
        {data.map((message, index) => (
          <li key={index} className="bg-card text-card-foreground rounded-lg shadow-sm p-6 border border-border glass break-words">
            {message}
          </li>
        ))}
      </ul>
    </div>
  );
}
