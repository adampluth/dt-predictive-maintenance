"use client";

import { useEffect, useState } from "react";

interface Item {
  id: number;
  product_id: string;
  type: string;
  air_temperature: number;
  process_temperature: number;
  rotational_speed: number;
  torque: number;
  tool_wear: number;
  machine_failure: boolean;
}

export default function WebSocketStream() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const socket = new WebSocket("ws://127.0.0.1:8000/ws/sensor-stream/");

    socket.onmessage = (event) => {
      const newItem: Item = JSON.parse(event.data);
      setItems((prevItems) => [newItem, ...prevItems].slice(0, 10)); // Keep the latest 10 items
    };

    socket.onerror = (error) => console.error("WebSocket error:", error);

    return () => socket.close();
  }, []);

  return (
    <div>
      <h2>Live Sensor Data</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.product_id}: {item.type}, Temp: {item.air_temperature}K
          </li>
        ))}
      </ul>
    </div>
  );
}
