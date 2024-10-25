import { useState } from "react";
import { useRoom } from "@livekit/components-react";

export default function ChatInterface() {
  const [message, setMessage] = useState("");
  const { room } = useRoom();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle message submission
    setMessage("");
  };

  return (
    <div className="space-y-6">
      <div className="h-[600px] overflow-y-auto rounded-xl bg-white/50 p-4">
        {/* Chat messages will appear here */}
      </div>
      
      <form onSubmit={handleSubmit} className="flex gap-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask Steve anything..."
          className="flex-1 rounded-full border border-gray-300 px-6 py-3 
          focus:border-[#0071e3] focus:outline-none focus:ring-2 
          focus:ring-[#0071e3]/20"
        />
        <button type="submit" className="apple-button">
          Send
        </button>
      </form>
    </div>
  );
}

