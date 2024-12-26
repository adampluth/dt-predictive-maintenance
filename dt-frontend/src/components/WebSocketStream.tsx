'use client';

import React, { useEffect, useState, useRef } from "react";

export default function WebSocketStream() {
  const [data, setData] = useState<string[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:8000/ws/sensor-stream/");
    wsRef.current = ws;

    ws.onmessage = (event) => {
      const message = event.data;
      setData((prevData) => [...prevData.slice(-9), message]); // Keep the last 10 messages
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  return (
    <div className="">
      <ul className="space-y-2">
        {data.map((message, index) => (
          <li
            key={index}
            className="bg-card text-card-foreground rounded-lg shadow-sm p-6 transition-transform border border-border glass break-words"
            // className="p-3 bg-card-foreground text-foreground rounded shadow-sm break-words"
          >
            {message}
          </li>
        ))}
      </ul>
    </div>
  );
}
