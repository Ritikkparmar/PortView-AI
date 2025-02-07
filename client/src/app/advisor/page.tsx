'use client';
import { useState, useRef, useEffect } from 'react';

type Message = {
  text: string;
  sender: 'user' | 'bot';
};

export default function Chatbot() {
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
    <div className="flex flex-col justify-end items-center h-screen bg-black text-white p-4">
      <div className="w-full max-w-3xl flex flex-col space-y-2 overflow-y-auto h-[75vh] p-2 no-scrollbar">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-3 rounded-lg max-w-xs ${msg.sender === 'user' ? 'bg-blue-500' : 'bg-gray-700'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="w-full max-w-3xl flex items-center space-x-2 mt-4">
        <div className='bg-[#171717] rounded-lg p-4 w-full max-w-3xl'>
          <input
            type="text"
            className="flex-1 bg-[#171717] text-white outline-none mb-2 w-full max-w-3xl"
            placeholder="Chat with AI Career Advisor..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <div className='flex items-center justify-between w-full'>
            <button>+</button>
            <button>+</button>
          </div>
        </div>
        <button onClick={sendMessage} className="bg-[#7d47ea] p-3 font-semibold min-w-max px-4 sm:px-5 rounded-lg
                            hover:scale-105
                            active:bg-[radial-gradient(72.97%_270%_at_50%_50%,_rgb(150,100,250)_0%,_rgb(90,20,220)_85%)]
                            active:shadow-[rgba(150,100,250,0.75)_0px_2px_10px_0px,_rgb(150,100,250)_0px_1px_1px_0px_inset] 
                            active:scale-95">Send</button>
      </div>
    </div>
  );
}
