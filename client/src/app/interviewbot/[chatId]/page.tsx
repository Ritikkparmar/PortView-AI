'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FiMessageSquare, FiSearch, FiPlus } from "react-icons/fi";
import { AudioLines, SendHorizontal, Upload } from 'lucide-react';
import Link from "next/link";
import ReactMarkdown from 'react-markdown';

type Message = {
    text: string;
    sender: 'user' | 'bot';
};

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;  // Store in .env.local

const jobDetails = {
    role: "Software Engineer",
    description: "Responsible for developing, testing, and maintaining web applications using React and Node.js."
};

export default function Interviewbot() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [lastQuestion, setLastQuestion] = useState<string>("Tell me about yourself");

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage: Message = { text: input, sender: 'user' };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');

        try {
            // Fetch AI response (feedback + next question)
            const botReply = await fetchGeminiResponse(lastQuestion, input);
            const botMessage: Message = { text: botReply, sender: 'bot' };

            setMessages((prev) => [...prev, botMessage]);

            // Extract the next question for future use
            const nextQuestion = botReply.split("\n").pop()?.trim() || "Can you elaborate?";
            setLastQuestion(nextQuestion); // Store new question
        } catch (error) {
            console.error('Error fetching Gemini response:', error);
            setMessages((prev) => [...prev, { text: "Error fetching response. Please try again.", sender: 'bot' }]);
        }
    };

    const fetchGeminiResponse = async (question: string, answer: string) => {
        const requestBody = {
            contents: [
                {
                    role: "user",
                    parts: [{
                        text: `You are an AI interviewer conducting a structured job interview.  
                        Job Role: ${jobDetails.role}  
                        Job Description: ${jobDetails.description}  
                        
                        You will ask interview questions one by one.  
                        After each question, the candidate provides an answer.  
                        You must analyze the answer and provide brief constructive feedback (mention strengths and areas for improvement).  
                        Then, ask the next relevant question.  
    
                        Previous Question: ${question}  
                        Candidate's Answer: ${answer}  
                        
                        Provide feedback in a professional yet conversational tone.  
                        Format the response like this:
    
                        Feedback: [Provide feedback here]
                        Next Question:[Ask the next relevant interview question]
                        `
                    }]
                }
            ]
        };

        const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();
        let rawResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI.";

        // Ensure proper formatting
        rawResponse = rawResponse
            .replace(/\*\*Feedback:\*\*/g, "Feedback:")
            .replace(/\*\*Next Question:\*\*/g, "Next Question:");

        return rawResponse;
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
                    {["Tell me about yourself", "What are your strengths?", "Why should we hire you?"].map((chat) => (
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

            <div className="flex flex-col justify-end items-center h-full w-full max-w-6xl text-white p-4 pb-2">
                <div className="w-full max-w-3xl flex flex-col space-y-2 overflow-y-auto h-[65vh] p-2 no-scrollbar">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`p-3 rounded-lg max-w-md ${msg.sender === 'user' ? 'bg-[#7d47ea]/70' : 'bg-gray-700'}`}>
                                <ReactMarkdown>{msg.text}</ReactMarkdown>
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
                                placeholder="Ask me an interview question..."
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
                <p className='text-sm font-light mt-2'>AI-generated responses may need review.</p>
            </div>
        </div>
    );
}
