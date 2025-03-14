import { redirect } from "next/navigation";

export default function DashboardPage() {
  redirect("/dashboard/monitoring"); // Redirect to default tab
  return null;
}
