"use client"

import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { motion } from 'framer-motion';
import { RippleComponent } from "@/components/RippleComponent";

export function Userflow() {
    const steps = [
        // Roadmap for Success
        [
            {
                step: "Step 1",
                title: "Enter Your Desired Career",
                description: "Type in the career or industry you want to explore.",
            },
            {
                step: "Step 2",
                title: "AI-Generated Roadmap",
                description: "Our AI creates a step-by-step learning and career plan based on market trends.",
            },
            {
                step: "Step 3",
                title: "Discover Learning Resources",
                description: "Get recommendations for courses, books, and projects to enhance your skills.",
            },
            {
                step: "Step 4",
                title: "Track Your Progress",
                description: "Use our platform to mark completed steps and stay on track.",
            },
        ],

        // Portfolio Website Generator
        [
            {
                step: "Step 1",
                title: "Enter Your Details",
                description: "Provide your name, profession, skills, and work samples to generate your portfolio.",
            },
            {
                step: "Step 2",
                title: "Choose a Design",
                description: "Select from beautifully crafted templates that best showcase your work.",
            },
            {
                step: "Step 3",
                title: "Generate & Customize",
                description: "Our AI instantly creates your portfolio, which you can tweak to perfection.",
            },
            {
                step: "Step 4",
                title: "Publish & Share",
                description: "Get a live portfolio website in seconds and share it with recruiters or clients.",
            },
        ],

        // AI Interview Prep Bot
        [
            {
                step: "Step 1",
                title: "Select Your Role",
                description: "Choose the job role you're preparing for to tailor the interview experience.",
            },
            {
                step: "Step 2",
                title: "Practice Realistic Questions",
                description: "Our AI asks industry-specific questions to simulate a real interview.",
            },
            {
                step: "Step 3",
                title: "Get Instant Feedback",
                description: "Receive AI-driven insights on your answers, highlighting strengths and areas for improvement.",
            },
            {
                step: "Step 4",
                title: "Refine & Improve",
                description: "Practice multiple rounds and gain confidence for your actual interview.",
            },
        ],
    ];

    const data = [
        {
            title: "Roadmap for Success",
            content: (
                <div className="w-full max-w-7xl mx-auto">
                    <p className="text-neutral-300 text-xs md:text-lg font-normal mb-8 text-center">
                    Follow a step-by-step AI-generated plan to upskill and achieve your career goals.
                    </p>
                    <section className="bg-[#0A0A0A] text-white">
                        <div className="max-w-6xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {steps[0].map((step, index) => (
                                    <motion.div
                                        key={index}
                                        className="bg-[#121212] p-6 md:p-8 rounded-lg shadow-lg hover:shadow-[#7D47EA]/50 transition-shadow duration-300"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.2 }}
                                    >
                                        <h3 className="text-xl font-semibold text-[#7D47EA]">
                                            {step.step}
                                        </h3>
                                        <h4 className="mt-2 text-lg md:text-xl font-bold text-white">{step.title}</h4>
                                        <p className="mt-4 text-neutral-300">{step.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            ),
        },
        {
            title: "Portfolio Website Generator",
            content: (
                <div className="w-full max-w-7xl mx-auto">
                    <p className="text-neutral-300 text-xs md:text-lg font-normal mb-8 text-center">
                    Instantly create a professional portfolio website to showcase your skills and work.
                    </p>
                    <section className="bg-[#0A0A0A] text-white">
                        <div className="max-w-6xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {steps[1].map((step, index) => (
                                    <motion.div
                                        key={index}
                                        className="bg-[#121212] p-6 md:p-8 rounded-lg shadow-lg hover:shadow-[#7D47EA]/50 transition-shadow duration-300"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.2 }}
                                    >
                                        <h3 className="text-xl font-semibold text-[#7D47EA]">
                                            {step.step}
                                        </h3>
                                        <h4 className="mt-2 text-lg md:text-xl font-bold text-white">{step.title}</h4>
                                        <p className="mt-4 text-neutral-300">{step.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            ),
        },
        {
            title: "AI Interview Prep Bot",
            content: (
                <div className="w-full max-w-7xl mx-auto">
                    <p className="text-neutral-300 text-xs md:text-lg font-normal mb-8 text-center">
                    Practice real interview questions and receive AI-driven feedback to boost your confidence.
                    </p>
                    <section className="bg-[#0A0A0A] text-white">
                        <div className="max-w-6xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {steps[2].map((step, index) => (
                                    <motion.div
                                        key={index}
                                        className="bg-[#121212] p-6 md:p-8 rounded-lg shadow-lg hover:shadow-[#7D47EA]/50 transition-shadow duration-300"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.2 }}
                                    >
                                        <h3 className="text-xl font-semibold text-[#7D47EA]">
                                            {step.step}
                                        </h3>
                                        <h4 className="mt-2 text-lg md:text-xl font-bold text-white">{step.title}</h4>
                                        <p className="mt-4 text-neutral-300">{step.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            ),
        },
    ];
    return (
        <div className="w-full">
            <RippleComponent />
            <div className="-mt-10">
                <Timeline data={data} />
            </div>
        </div>
    );
}
