'use client';

import { useEffect, useState } from "react";
import { useGetItemsQuery } from "@/services/api";
import { Item } from "@/types/types";

interface ItemsListProps {
  initialData?: Item[];
}

export default function ItemsList({ initialData }: ItemsListProps) {
  const { data: liveData, error, isLoading } = useGetItemsQuery();
  const [items, setItems] = useState<Item[]>(initialData || []);

  useEffect(() => {
    if (liveData) {
      setItems(liveData);
    }
  }, [liveData]);

  if (isLoading && items.length === 0) {
    return <p className="text-center text-muted dark:text-muted-dark">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 dark:text-red-400">Error: Something went wrong</p>;
  }

  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li
          key={item.id}
          className="p-4 bg-card dark:bg-card-dark text-card-foreground dark:text-card-foreground-dark rounded-lg shadow-md hover:bg-muted dark:hover:bg-muted-dark transition-all"
        >
          <strong>{item.product_id}</strong>: {item.type}, Temp: {item.air_temperature}K
        </li>
      ))}
    </ul>
  );
}
