"use client"

import { useState } from "react"
import Image from "next/image"
import { Work_Sans } from "next/font/google"

import starIcon from "@/assets/icon-star.svg"
import plusIcon from "@/assets/icon-plus.svg"
import minusIcon from "@/assets/icon-minus.svg"

const workSans = Work_Sans({
    weight: ["400", "600", "700"],
    subsets: ["latin"],
})

export default function FAQs() {

    const questions = [
        {
            question: "What is Career Craft AI?",
            answer: "Career Craft AI is an all-in-one platform that helps users build their careers with AI-powered tools. It provides career guidance, personalized roadmaps, portfolio creation, and interview preparation to make job hunting easier and more effective."
        },
        {
            question: "How does the AI Career Advisor help me?",
            answer: "Our AI Career Advisor analyzes your skills, interests, and career goals to recommend the best career paths and opportunities. It provides personalized insights to help you make informed decisions."
        },
        {
            question: "What is the Roadmap for Success tool?",
            answer: "The Roadmap for Success tool generates a structured learning path based on your chosen career. It outlines the essential skills, courses, and projects you need to master for your desired role."
        },
        {
            question: "Can I create my own portfolio using Career Craft AI?",
            answer: "Yes! Our Portfolio Website Generator allows you to create a professional-looking portfolio effortlessly. Just input your details, and AI will generate a stunning website to showcase your work."
        },
        {
            question: "How does the AI Interview Prep Chatbot work?",
            answer: "Our AI-powered chatbot simulates real interview scenarios, providing relevant questions and giving instant feedback. It helps you practice and improve your responses before the actual interview."
        },
        {
            question: "Is Career Craft AI suitable for beginners?",
            answer: "Absolutely! Whether you’re a student, a job seeker, or an experienced professional, our AI-driven tools are designed to guide you at every step of your career journey."
        },
        {
            question: "Do I need any coding skills to use this platform?",
            answer: "No, Career Craft AI is user-friendly and requires no coding knowledge. The platform is designed for everyone, from tech professionals to non-tech users."
        },
        {
            question: "Is Career Craft AI free to use?",
            answer: "Some features are available for free, while premium features may require a subscription. Check our pricing page for more details."
        },
        {
            question: "How do I get started with Career Craft AI?",
            answer: "Simply sign up on our platform, explore the tools, and start building your career with AI-powered assistance!"
        }
    ];

    const [activeIndex, setActiveIndex] = useState<number | null>(null)
    const [answerHeights, setAnswerHeights] = useState<number[]>(
        Array(questions.length).fill(0),)

    const toggleQuestion = (idx: number) => {
        setActiveIndex(activeIndex === idx ? null : idx)
        const newAnswerHeights = Array(questions.length).fill(0)
        if (activeIndex !== idx)
            newAnswerHeights[idx] = document.getElementById(
                `answer-${idx}`,
            )?.scrollHeight
        setAnswerHeights(newAnswerHeights)
    }

    return (
        <div className={`${workSans.className} container max-w-3xl rounded-xl bg-faqWhite p-6 text-white mt-20 mx-auto`}>

            <div className="flex items-center gap-6">
                <Image
                    src={starIcon}
                    aria-hidden="true"
                    alt="star"
                    className="h-8 w-8"
                />
                <h1 className="text-4xl font-bold">FAQs</h1>
            </div>

            <div className="mt-4 md:mt-0flex flex-col divide-y">
                {questions.map(({ question, answer }, idx) => (
                    <div key={idx} className="py-2 md:py-6">
                        <div
                            className="flex items-center justify-between hover:cursor-pointer"
                            onClick={() => toggleQuestion(idx)}
                        >
                            <h2 className="text-sm md:text-lg font-medium leading-6 text-white hover:text-faqPurple">
                                {question}
                            </h2>
                            <Image
                                src={activeIndex === idx ? minusIcon : plusIcon}
                                alt="toggle question"
                            />
                        </div>

                        <div
                            id={`answer-${idx}`}
                            className="overflow-hidden transition-all duration-300"
                            style={{ maxHeight: `${answerHeights[idx] || 0}px` }}
                        >
                            <p className="pt-6 text-white/70 text-sm sm:text-base">{answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}