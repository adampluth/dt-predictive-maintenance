"use client";

import { useEffect, useState } from "react";
import { useGetItemsQuery } from "@/services/api";
import { Item } from "@/types/types";

interface ItemsListProps {
  initialData?: Item[]; // Optional initial data
}

export default function ItemsList({ initialData }: ItemsListProps) {
  const { data: liveData, error, isLoading } = useGetItemsQuery();
  const [items, setItems] = useState<Item[]>(initialData || []);

  // Update items when liveData is fetched
  useEffect(() => {
    if (liveData) {
      setItems(liveData);
    }
  }, [liveData]);

  if (isLoading && items.length === 0) return <p>Loading...</p>;
  if (error) return <p>Error: Something went wrong</p>;

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <strong>{item.product_id}</strong>: {item.type}, Temp:{" "}
          {item.air_temperature}K
        </li>
      ))}
    </ul>
  );
}
