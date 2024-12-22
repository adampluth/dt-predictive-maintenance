import ItemsList from "../../components/ItemsList";
import { Item } from "@/types/types";

export default async function ItemsPage() {
  const data: Item[] = await fetch("http://127.0.0.1:8000/items").then((res) =>
    res.json()
  );

  return (
    <div>
      <h1>Items</h1>
      <ItemsList initialData={data} />
    </div>
  );
}
