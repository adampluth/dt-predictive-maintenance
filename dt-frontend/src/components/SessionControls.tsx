import { useState } from "react";
import { useStartDataStreamSessionMutation, useEndDataStreamSessionMutation } from "@/services/api";

export default function SessionControls({ onStartSession, onEndSession }: { onStartSession: () => void; onEndSession: () => void }) {
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [startSessionMutation, { isLoading: isStarting }] = useStartDataStreamSessionMutation();
  const [endSessionMutation, { isLoading: isStopping }] = useEndDataStreamSessionMutation();

  async function startSession() {
    console.log("Start Session Clicked");
    try {
      const data = await startSessionMutation().unwrap();
      if (data?.session_id) {
        console.log("Session started, ID:", data.session_id);
        setSessionId(data.session_id);
        // Notify WebSocket to connect
        onStartSession();
      } else {
        console.warn("No session ID returned from backend.");
      }
    } catch (error) {
      console.error("Failed to start session:", error);
    }
  }
  
  async function endSession() {
    console.log("End Session Clicked");
    if (!sessionId) {
      console.warn("No active session to end.");
      return;
    }
    try {
      await endSessionMutation(sessionId).unwrap();
      console.log("Session ended:", sessionId);
      setSessionId(null);
      onEndSession();
    } catch (error) {
      console.error("Failed to end session:", error);
    }
  }

  return (
    <div className="flex space-x-2">
      <button 
        onClick={startSession} 
        disabled={!!sessionId || isStarting} 
        className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {isStarting ? "Starting..." : "Start Session"}
      </button>
      <button 
        onClick={endSession} 
        disabled={!sessionId || isStopping} 
        className="bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {isStopping ? "Stopping..." : "End Session"}
      </button>
    </div>
  );
}
