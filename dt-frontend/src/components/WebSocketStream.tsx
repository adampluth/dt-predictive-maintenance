"use client";

import React, { useEffect, useState } from "react";
import { useStreamSensorDataQuery } from "@/services/api";
import SessionControl from "./SessionControls";

export default function WebSocketStream() {
  const [isStreaming, setIsStreaming] = useState(false);
  const { data = [], refetch, isUninitialized } = useStreamSensorDataQuery(undefined, {
    skip: !isStreaming,
  });

  function handleStartSession() {
    setIsStreaming(true);
  }

  useEffect(() => {
    if (!isUninitialized) {
      refetch();
    }
  }, [isStreaming, isUninitialized, refetch]);

  function handleEndSession() {
    setIsStreaming(false);
  }

  return (
    <div>
      <SessionControl onStartSession={handleStartSession} onEndSession={handleEndSession} />
      <ul className="space-y-2">
        {data.map((message, index) => (
          <li key={index} className="bg-card text-card-foreground rounded-lg shadow-sm p-6 border border-border glass break-words">
            {message}
          </li>
        ))}
      </ul>
    </div>
  );
}
