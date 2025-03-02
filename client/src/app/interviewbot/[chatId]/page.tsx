'use client';

import React, { useState, useRef, useEffect } from 'react';
import { SendHorizontal, Upload, AudioLines, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import advisorimg from "@/assets/Advisor.svg"
import { useMyContext } from '@/context/MyContext';
import { useParams } from "next/navigation";


type Message = {
    text: string;
    sender: 'user' | 'bot';
};

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

export default function Interviewbot() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(false);
    const [lastQuestion, setLastQuestion] = useState<string>("Tell me about yourself");
    const [jobRole, setJobRole] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const { userProfile } = useMyContext();
    const params = useParams();
    const chatId = params.chatId as string;


    useEffect(() => {
        fetchChatHistory();
    }, [chatId, userProfile]);

    const fetchChatHistory = async () => {
        if (userProfile?.UserId) {
            try {
                const userId = userProfile?.UserId;
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/chat/${userId}/${chatId}`);

                const chatData = await response.json();
                console.log(chatData)
                setMessages(chatData.chat);
                setJobRole(chatData.jobRole);
                setJobDescription(chatData.jobDescription);
            } catch (error) {
                console.error("Error fetching chat history:", error);
            }
        } else {
            return
        }
    };

    const updateChatInDB = async (newMessages: Message[]) => {
        if (userProfile?.UserId) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/chat/${userProfile.UserId}/${chatId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ updatedChat: { chat: newMessages } }),
                });
                const chatData = await response.json();
                console.log(chatData)

                if (!response.ok) {
                    console.error("Failed to update chat in database");
                }
            } catch (error) {
                console.error("Error updating chat:", error);
            }
        }
    };

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage: Message = { text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]); // Update UI first

        setInput('');
        setLoading(true);
        await updateChatInDB([userMessage]); // Send only user message

        try {
            const botReply = await fetchGeminiResponse(lastQuestion, input);
            const botMessage: Message = { text: botReply, sender: 'bot' };

            setMessages(prev => [...prev, botMessage]); // Update UI with bot response
            await updateChatInDB([botMessage]); // Send only bot message

            const nextQuestion = botReply.split("\n").pop()?.trim() || "Can you elaborate?";
            setLastQuestion(nextQuestion);
        } catch (error) {
            console.error('Error fetching Gemini response:', error);
            setMessages(prev => [...prev, { text: "Error fetching response. Please try again.", sender: 'bot' }]);
        } finally {
            setLoading(false);
        }
    };

    const fetchGeminiResponse = async (question: string, answer: string) => {
        const requestBody = {
            contents: [
                {
                    parts: [{
                        text: `You are an AI interviewer conducting a structured job interview.  
                        Job Role: ${jobRole}  
                        Job Description: ${jobDescription}  
                        
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

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();
        let rawResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI.";

        rawResponse = rawResponse
            .replace(/\*\*Feedback:\*\*/g, "Feedback:")
            .replace(/\*\*Next Question:\*\*/g, "Next Question:");

        return rawResponse;
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        console.log(messages)
    }, [messages]);

    return (
        <div className="flex flex-col justify-end items-center h-full w-full max-w-6xl text-white p-4 pb-2">
            <div className="w-full max-w-3xl flex flex-col space-y-2 overflow-y-auto h-[65vh] p-2 no-scrollbar">
                {messages.length === 0 && (
                    <div className='w-full h-full flex items-center justify-center'>
                        <Image src={advisorimg} alt='AI Advisor' />
                    </div>
                )}
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`p-3 rounded-lg max-w-md ${msg.sender === 'user' ? 'bg-[#7d47ea]/70' : 'bg-gray-700'}`}>
                            <ReactMarkdown>{msg.text}</ReactMarkdown>
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="p-3 rounded-lg max-w-md bg-gray-700 flex items-center space-x-2">
                            <Loader2 className="animate-spin" size={20} />
                            <span>Thinking...</span>
                        </div>
                    </div>
                )}
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
                            disabled={loading}
                        />
                        <button onClick={sendMessage} className="bg-[#7d47ea] p-2 font-semibold min-w-max rounded-full
              hover:scale-105
              active:bg-[radial-gradient(72.97%_270%_at_50%_50%,_rgb(150,100,250)_0%,_rgb(90,20,220)_85%)]
              active:shadow-[rgba(150,100,250,0.75)_0px_2px_10px_0px,_rgb(150,100,250)_0px_1px_1px_0px_inset] 
              active:scale-95"
                            disabled={loading}>
                            {loading ? <Loader2 className="animate-spin" size={20} /> : <SendHorizontal />}
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
    );
}