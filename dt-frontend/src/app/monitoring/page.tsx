import ClientWrapper from "../../components/ClientWrapper";
import WebSocketStream from "../../components/WebSocketStream";

export default function ItemsPage() {
  return (
    <div>
      <h1>Sensor Data Streaming</h1>
      <ClientWrapper>
        <WebSocketStream />
      </ClientWrapper>
    </div>
  );
}
