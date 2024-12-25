'use client';

import React, { useEffect, useState, useRef } from "react";

export default function WebSocketStream() {
  const [data, setData] = useState<string[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:8000/ws/sensor-stream/");
    wsRef.current = ws;

    // Handle incoming messages
    ws.onmessage = (event) => {
      const message = event.data;
      setData((prevData) => {
        const updatedData = [...prevData, message];
        // Only keep the last 10 messages
        return updatedData.slice(-10);
      });
    };

    // Handle errors
    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Cleanup WebSocket connection on unmount
    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  return (
    <div className="p-4">
      <h3 className="text-lg font-bold mb-4">Live Sensor Data</h3>
      <ul className="space-y-2">
        {data.map((message, index) => (
          <li
            key={index}
            className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg p-3 shadow-md break-words"
          >
            {message}
          </li>
        ))}
      </ul>
    </div>
  );
}
