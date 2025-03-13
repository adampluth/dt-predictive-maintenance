import { DateTime } from "luxon";

export const formatTime = (timestamp: number): string => {
  if (!timestamp) return "N/A"; // ✅ Prevents undefined errors

  return DateTime.fromMillis(timestamp).toFormat("HH:mm:ss"); // ✅ Properly formatted time
};
