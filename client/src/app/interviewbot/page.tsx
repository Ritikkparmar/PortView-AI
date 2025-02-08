'use client';

import React from "react";
import { FiMessageSquare, FiSearch, FiPlus } from "react-icons/fi";
import { AudioLines, SendHorizontal, Upload } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

type Message = {
  text: string;
  sender: 'user' | 'bot';
};


export default function Interviewbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

        <button className="mt-auto flex items-center justify-center gap-2 bg-[#7d47ea] hover:bg-violet-700 text-white py-2 rounded-md">
          <FiPlus /> New Chat
        </button>
      </div>

      <div className="flex flex-col justify-end items-center h-full w-full max-w-6xl text-white p-4 pb-2">
        <div className="w-full max-w-3xl flex flex-col space-y-2 overflow-y-auto h-[65vh] p-2 no-scrollbar">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`p-3 rounded-lg max-w-xs ${msg.sender === 'user' ? 'bg-[#7d47ea]/70' : 'bg-gray-700'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="w-full max-w-3xl flex items-center space-x-2 mt-4">
          <div className='bg-[#171717] rounded-lg px-4 pt-4 pb-2 w-full max-w-3xl'>
            <div className='flex items-center justify-between space-x-2 mb-2'>
              <input
                type="text"
                className="flex-1 bg-[#171717] text-white outline-none w-full max-w-3xl px-2"
                placeholder="Chat with AI Career Advisor..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button onClick={sendMessage} className="bg-[#7d47ea] p-2 font-semibold min-w-max rounded-full
                            hover:scale-105
                            active:bg-[radial-gradient(72.97%_270%_at_50%_50%,_rgb(150,100,250)_0%,_rgb(90,20,220)_85%)]
                            active:shadow-[rgba(150,100,250,0.75)_0px_2px_10px_0px,_rgb(150,100,250)_0px_1px_1px_0px_inset] 
                            active:scale-95">
                <SendHorizontal />
              </button>
            </div>

            <div className='flex items-center justify-between w-full'>
              <button className='p-2 rounded-full border hover:scale-105 hover:bg-gray-700'><Upload /></button>
              <button className='p-2 rounded-full hover:scale-110'><AudioLines /></button>
            </div>
          </div>
        </div>
        <p className='text-sm font-light mt-2'>AI suggestions may not be perfect. Please verify before use.</p>
      </div>
    </div>
  );
}
