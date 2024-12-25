"use client";

import { useEffect, useState } from "react";
import { Item } from "../types/types";

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
            {item.product_id}: {item.type}, Temp: {item.air_temperature}K, 
            Rotational Speed: {item.rotational_speed} RPM, Torque: {item.torque} Nm,
            TWF: {item.twf ? "True" : "False"}, Machine Failure: {item.machine_failure ? "Yes" : "No"}
          </li>
        ))}
      </ul>
    </div>
  );
}
