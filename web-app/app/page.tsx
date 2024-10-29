"use client";

import { LiveKitRoom, useVoiceAssistant, RoomAudioRenderer, DisconnectButton } from "@livekit/components-react";
import { useCallback, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mic, X as CloseIcon } from "lucide-react";
import Footer from "@/components/Footer";

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
    <div className="min-h-screen bg-black text-white">
      <header className="pt-24 pb-16 px-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.h1 
            className="text-6xl font-semibold tracking-tight mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Your Mentor, Steve Jobs
          </motion.h1>
          <motion.p 
            className="text-2xl text-gray-400 font-light mt-4 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Experience mentorship that changed Silicon Valley
          </motion.p>
        </motion.div>
      </header>

      <main className="max-w-[1100px] mx-auto px-6 py-12">
        <motion.div 
          className="apple-glass-card relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 via-transparent to-transparent" />
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-semibold mb-6">Seek Guidance</h2>
              <p className="text-xl text-gray-400 font-light mb-8 max-w-lg">
                {agentState === "disconnected" && "What challenges are you facing today?"}
                {agentState === "connecting" && "Connecting to your mentor..."}
                {agentState === "connected" && "I'm here to guide you"}
                {agentState === "speaking" && "Sharing mentor insights"}
                {agentState === "listening" && "Tell me more about your challenge..."}
              </p>
              
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
            </div>

            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-40 transition duration-1000"></div>
              <motion.div 
                className="relative w-64 h-64 rounded-full bg-gradient-to-b from-[#1a1a1a] to-black p-1"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.img
                  src="https://i.pinimg.com/474x/ee/79/3d/ee793dfb2085b85ce187909013a43816.jpg"
                  alt="Steve Jobs"
                  className="w-full h-full rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="apple-feature-card">
            <h3 className="text-xl font-semibold mb-3">Startup Guidance</h3>
            <p className="text-gray-400">Get insights on product vision, market disruption, and building revolutionary products</p>
          </div>
          <div className="apple-feature-card">
            <h3 className="text-xl font-semibold mb-3">Leadership Wisdom</h3>
            <p className="text-gray-400">Learn how to build exceptional teams, make tough decisions, and lead with conviction</p>
          </div>
          <div className="apple-feature-card">
            <h3 className="text-xl font-semibold mb-3">Product Excellence</h3>
            <p className="text-gray-400">Master the art of product design, user experience, and breakthrough innovation</p>
          </div>
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
  return (
    <div className="relative flex items-center justify-start">
      {agentState === "disconnected" && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onConnectButtonClicked}
          className="flex items-center gap-2 px-8 py-4 
            bg-[#0071e3] hover:bg-[#0077ed] 
            text-white rounded-full transition-all duration-300
            hover:scale-105 hover:shadow-lg"
        >
          <Mic className="w-5 h-5" />
          Start Mentorship Session
        </motion.button>
      )}

      {agentState !== "disconnected" && (
        <DisconnectButton>
          <motion.button 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-[#ff3b30] hover:bg-[#ff453a] 
              text-white px-8 py-4 rounded-full transition-all duration-300
              flex items-center gap-2 hover:scale-105 hover:shadow-lg"
          >
            <CloseIcon className="w-5 h-5" />
            End Session
          </motion.button>
        </DisconnectButton>
      )}
    </div>
  );
}
