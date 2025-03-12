import { useState, useEffect } from "react";
import { 
  useStartDataStreamSessionMutation, 
  useEndDataStreamSessionMutation, 
  useGetCurrentSessionQuery 
} from "@/services/api";

interface SessionControlsProps {
  onStartSession: () => void;
  onEndSession: () => void;
}

export default function SessionControls({ onStartSession, onEndSession }: SessionControlsProps) {
  const [sessionId, setSessionId] = useState<number | null>(null);

  const { data: currentSession } = useGetCurrentSessionQuery();

  useEffect(() => {
    console.log("Session API Response Updated:", currentSession);
    setSessionId(currentSession?.session_id ?? null);
  }, [currentSession]);

  const [startSessionMutation, { isLoading: isStarting }] = useStartDataStreamSessionMutation();
  const [endSessionMutation, { isLoading: isStopping }] = useEndDataStreamSessionMutation();

  async function startSession() {
    console.log("Start Session Clicked");
    try {
      const data = await startSessionMutation().unwrap();
      console.log("Session started, ID:", data.session_id);
      onStartSession();
    } catch (error) {
      console.error("Failed to start session:", error);
    }
  }

  async function endSession() {
    console.log("End Session Clicked");
    if (!sessionId) return;
    try {
      await endSessionMutation(sessionId).unwrap();
      console.log("Session ended:", sessionId);
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
