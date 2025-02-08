'use client';

import React from "react";
import { FiMessageSquare, FiSearch, FiPlus } from "react-icons/fi";
import { useState, useRef, useEffect } from 'react';
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from 'next/navigation';


type Message = {
  text: string;
  sender: 'user' | 'bot';
};


export default function Interviewbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [jobRole, setJobRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      console.log({ jobRole, jobDescription });
      setIsSubmitting(false);
    }, 1500);
    router.push('/interviewbot/chat1');
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    setTimeout(() => {
      const botMessage: Message = { text: 'This is a response from OpenAI API.', sender: 'bot' };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  return (
    <div className="relative min-h-screen pt-[10vh] flex">
      <div className="w-72 bg-[#121212] text-white p-4 flex flex-col m-2 rounded-lg">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full p-2 bg-[#1e1e1e] text-white rounded-md pl-10"
          />
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
        </div>

        <div className="mt-4 flex flex-col gap-2">
          {["Plan a 3-day trip", "Ideas for a customer loyalty program", "Help me pick", "Write simple JS code"].map((chat) => (
            <div key={chat} className="px-3 py-2 bg-[#1e1e1e] rounded-md cursor-pointer hover:bg-[#292929] flex items-center gap-2">
              <FiMessageSquare className="text-gray-400" />
              <span>{chat}</span>
            </div>
          ))}
        </div>

        <Link href="/interviewbot" className="mt-auto flex items-center justify-center gap-2 bg-[#7d47ea] hover:bg-violet-700 text-white py-2 rounded-lg">
          <FiPlus /> New Chat
        </Link>
      </div>

      <div className="flex flex-col justify-center items-center h-[90vh] w-full max-w-6xl text-white p-4 pb-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-[#121212] p-6 rounded-lg shadow-lg w-96"
        >
          <h2 className="text-xl font-bold mb-4 text-center">Enter Job Details</h2>

          <label className="block mb-2">Job Role:</label>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            className="w-full p-2 rounded bg-[#1e1e1e] text-white outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
            placeholder="e.g., Data Scientist, UI/UX Designer..."
          />

          <label className="block mt-4 mb-2">Job Description:</label>
          <motion.textarea
            whileFocus={{ scale: 1.02 }}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full p-2 rounded bg-[#1e1e1e] text-white outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
            placeholder="Describe the role, responsibilities, and expectations in detail..."
            rows={4}
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full mt-4 bg-[#7d47ea] hover:bg-violet-700 p-2 rounded text-white font-semibold flex justify-center items-center gap-2 transition-all duration-200"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
            ) : (
              "Submit"
            )}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
