"use client";

import { LiveKitRoom, useVoiceAssistant, BarVisualizer, RoomAudioRenderer, VoiceAssistantControlBar, DisconnectButton } from "@livekit/components-react";
import { useCallback, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Footer from "@/components/Footer";
import { Mic, Send, Pause, X as CloseIcon } from "lucide-react";

export default function Page() {
  const [connectionDetails, updateConnectionDetails] = useState(undefined);
  const [agentState, setAgentState] = useState("disconnected");

  const onConnectButtonClicked = useCallback(async () => {
    try {
      setAgentState("connecting");
      const url = new URL(
        process.env.NEXT_PUBLIC_CONN_DETAILS_ENDPOINT ?? "/api/connection-details",
        window.location.origin
      );
      const response = await fetch(url.toString());
      const connectionDetailsData = await response.json();
      updateConnectionDetails(connectionDetailsData);
    } catch (error) {
      console.error('Connection error:', error);
      setAgentState("disconnected");
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      <header className="pt-12 pb-6 px-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center justify-center mb-4"
        >
          {/* Apple Logo with hover effect */}
          <motion.svg 
            className="w-5 h-5 mr-3 cursor-pointer"
            viewBox="0 0 814 1000"
            fill="currentColor"
            whileHover={{ 
              scale: 1.1,
              filter: "brightness(1.2)",
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
          </motion.svg>
          <motion.h1 
            className="text-4xl font-light bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Think Different
          </motion.h1>
        </motion.div>
        <motion.p 
          className="text-center text-gray-400 mt-2 font-light max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Experience the wisdom that changed technology forever.
          <span className="block text-sm mt-1 text-gray-500">
            Powered by advanced AI
          </span>
        </motion.p>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12">
        <motion.div 
          className="apple-card mb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ 
            boxShadow: "0 0 30px rgba(0, 113, 227, 0.2)",
            transition: { duration: 0.3 }
          }}
        >
          <div className="flex flex-col items-center space-y-8">
            <motion.div 
              className="w-40 h-40 rounded-full bg-gradient-to-b from-[#2c2c2e] to-[#1c1c1e] p-1"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.img
                src="https://i.pinimg.com/474x/ee/79/3d/ee793dfb2085b85ce187909013a43816.jpg"
                alt="Steve Jobs"
                className="w-full h-full rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              />
            </motion.div>

            <LiveKitRoom
              token={connectionDetails?.participantToken}
              serverUrl={connectionDetails?.serverUrl}
              connect={connectionDetails !== undefined}
              audio={true}
              video={false}
              onDisconnected={() => {
                updateConnectionDetails(undefined);
                setAgentState("disconnected");
              }}
              onError={(error) => {
                console.error('LiveKit Error:', error);
                setAgentState("disconnected");
              }}
              onConnected={() => {
                console.log('Connected to LiveKit room');
                setAgentState("connected");
              }}
            >
              <SimpleVoiceAssistant onStateChange={setAgentState} />
              <ControlBar
                onConnectButtonClicked={onConnectButtonClicked}
                agentState={agentState}
                updateConnectionDetails={updateConnectionDetails}
                setAgentState={setAgentState}
              />
              <RoomAudioRenderer />
            </LiveKitRoom>

            {/* Status messages */}
            <motion.p 
              className="text-gray-400 text-sm text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {agentState === "disconnected" && (
                "Tap the microphone to begin your conversation with Steve"
              )}
              {agentState === "connecting" && (
                "Establishing connection..."
              )}
              {agentState === "connected" && (
                "Connected. You can start talking"
              )}
              {agentState === "speaking" && (
                "Steve is sharing his insights"
              )}
              {agentState === "listening" && (
                "Listening to your question..."
              )}
            </motion.p>
          </div>
        </motion.div>

        <motion.div 
          className="bg-[#1c1c1e] rounded-2xl p-6 border border-[#2c2c2e]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
        >
          <h2 className="text-lg font-medium text-white mb-4">
            Crafting Meaningful Conversations
          </h2>
          <ul className="space-y-3 text-gray-400">
            <motion.li 
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1 + (0 * 0.1) }}
              whileHover={{ x: 10, color: '#fff' }}
            >
              <motion.span 
                className="tips-bullet"
                whileHover={{ scale: 1.5 }}
                transition={{ type: "spring", stiffness: 400 }}
              />
              Explore innovation through simplicity and design
            </motion.li>
            <motion.li 
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1 + (1 * 0.1) }}
              whileHover={{ x: 10, color: '#fff' }}
            >
              <motion.span 
                className="tips-bullet"
                whileHover={{ scale: 1.5 }}
                transition={{ type: "spring", stiffness: 400 }}
              />
              Discover insights on leadership and vision
            </motion.li>
            <motion.li 
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1 + (2 * 0.1) }}
              whileHover={{ x: 10, color: '#fff' }}
            >
              <motion.span 
                className="tips-bullet"
                whileHover={{ scale: 1.5 }}
                transition={{ type: "spring", stiffness: 400 }}
              />
              Learn how to make your own dent in the universe
            </motion.li>
          </ul>
          
          <motion.p 
            className="text-sm text-gray-500 mt-6 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            "The people who are crazy enough to think they can change the world are the ones who do."
          </motion.p>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}

// Update SimpleVoiceAssistant component with animations
function SimpleVoiceAssistant({ onStateChange }) {
  const { state } = useVoiceAssistant();
  
  useEffect(() => {
    if (state) {
      onStateChange(state);
    }
  }, [onStateChange, state]);

  return null;
}

function ControlBar({ onConnectButtonClicked, agentState, updateConnectionDetails, setAgentState }) {
  const handleDisconnect = () => {
    updateConnectionDetails(undefined);
    setAgentState("disconnected");
  };

  return (
    <div className="relative h-[100px] flex items-center justify-center">
      {agentState === "disconnected" && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onConnectButtonClicked}
          className="flex items-center gap-2 px-8 py-3 
            bg-[#0071e3] hover:bg-[#0077ed] 
            text-white rounded-full transition-colors"
        >
          <Mic className="w-5 h-5" />
          Start a conversation
        </motion.button>
      )}

      {agentState !== "disconnected" && (
        <motion.button 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="bg-[#ff3b30] hover:bg-[#ff453a] 
            text-white px-8 py-3 rounded-full transition-colors
            flex items-center gap-2"
          onClick={handleDisconnect}
        >
          <CloseIcon className="w-5 h-5" />
          End conversation
        </motion.button>
      )}
    </div>
  );
}
