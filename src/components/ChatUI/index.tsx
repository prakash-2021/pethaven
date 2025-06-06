"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { FaCommentDots, FaPaperPlane, FaTimes } from "react-icons/fa";
import io from "socket.io-client";
import { twMerge } from "tailwind-merge";
import { Button } from "../Button";

type Message = {
  id: string;
  content: string;
  sender: "user" | "admin";
  timestamp: Date;
};

export const ChatUI = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const socket = io("http://localhost:5000"); // Connect to the server

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // };

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages((prev) => [
        ...prev,
        {
          id: msg.id,
          content: msg.content,
          sender: msg.sender,
          timestamp: new Date(msg.timestamp),
        },
      ]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    socket.emit("message", newMessage); // Emit the message to the server
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={toggleChat}
          className="relative w-16 h-16 flex items-center justify-center rounded-full overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#F16849] via-[#ff8066] to-[#FFCDC1] opacity-90" />
          <motion.div
            className="absolute inset-0 bg-white rounded-full"
            initial={{ scale: 0, opacity: 0.7 }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div className="relative z-10 bg-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#F16849] to-[#154c7e] opacity-10" />
            <FaCommentDots className="h-6 w-6 text-[#154c7e]" />
            <div className="absolute top-2 right-2 w-3 h-3 bg-[#F16849] rounded-full border-2 border-white" />
          </div>
        </motion.button>
      </motion.div>

      {/* Chat Modal */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-[350px] sm:w-[400px] bg-white rounded-xl shadow-2xl z-[999] overflow-hidden border border-gray-200"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="bg-[#154c7e] p-4 text-white">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Chat Support</h2>
                <Button
                  size="small"
                  variant="primary"
                  label={<FaTimes className="h-3 w-3" />}
                  onClick={toggleChat}
                  classNames="h-8 w-8 rounded-full p-0 bg-white/10 border-white"
                />
              </div>
              <p className="text-xs text-white/80 mt-1">
                We typically reply within a few minutes
              </p>
            </div>

            {/* Messages */}
            <div className="overflow-y-auto h-[300px] p-4 bg-[#FFCDC1]/10">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                  <FaCommentDots className="h-12 w-12 mb-2 opacity-20 text-[#154c7e]" />
                  <p className="text-sm">
                    Send a message to start chatting with our support team
                  </p>
                </div>
              ) : (
                messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    className={twMerge(
                      "mb-4 max-w-[80%]",
                      msg.sender === "user" ? "ml-auto" : "mr-auto"
                    )}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className={twMerge(
                        "p-3 rounded-2xl",
                        msg.sender === "user"
                          ? "bg-[#F16849] text-white rounded-br-none"
                          : "bg-[#154c7e] text-white rounded-bl-none"
                      )}
                    >
                      <p className="text-sm">{msg.content}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {msg.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </motion.div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-gray-200 bg-white">
              <div className="flex items-center rounded-full bg-[#FFCDC1]/20 px-4 py-2">
                <input
                  type="text"
                  className="flex-1 bg-transparent border-none focus:ring-0 focus:outline-none text-gray-700 placeholder-gray-500"
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <div className="ml-2">
                  <Button
                    onClick={sendMessage}
                    size="small"
                    variant="secondary"
                    label={<FaPaperPlane className="h-3 w-3" />}
                    classNames="h-8 w-8 rounded-full p-0"
                    disabled={!input.trim()}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
