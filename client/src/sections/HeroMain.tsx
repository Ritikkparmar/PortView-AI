"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Cover } from "@/components/ui/cover";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input";
import Image from "next/image";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import linear from "@/assets/linear.webp"
import { RoboAnimation } from "@/components/robo-animation";
import { FloatingPaper } from "@/components/floating-paper";
import { SparklesCore } from "@/components/sparkles2";


export default function HeroMain() {

    const placeholders = [
        "My name is Alex Carter, and I’m a UI/UX Designer...",
        "I’m a freelance photographer specializing in portraits...",
        "I build sleek and scalable web applications as a developer...",
        "Passionate about digital marketing and brand storytelling...",
        "I create cinematic wedding films that capture emotions...",
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.value);
    };
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log("submitted");
    };

    return (
        <div className="w-full flex flex-col items-center justify-center p-4 md:p-8 relative z-20 overflow-hidden">
            <div className="mt-[12vh]"></div>
            <div className="h-full w-full absolute inset-0 z-0">
                <SparklesCore
                    id="tsparticlesfullpage"
                    background="transparent"
                    minSize={0.6}
                    maxSize={1.4}
                    particleDensity={100}
                    className="w-full h-full"
                    particleColor="#FFFFFF"
                />
            </div>
            <div className="absolute inset-0 overflow-hidden -z-30">
                <FloatingPaper count={3} />
            </div>
            <AnimatedGradientText>
                ✨ <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
                <span
                    className={cn(
                        `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#7D47EA] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
                    )}
                >
                    Introducing Career Craft AI
                </span>
            </AnimatedGradientText>
            <div className="relative z-20 mx-auto my-6 text-center text-3xl font-semibold tracking-tight text-neutral-300 md:text-6xl">
                <p>Craft Your Future with</p>
                <div className="mt-2 md:mt-8"><Cover className="py-2">AI-Optimized Resumes & Portfolios</Cover></div>
            </div>
            <p className="relative z-20 mx-auto mt-4 max-w-lg px-4 text-center text-base font-medium text-gray-300 md:text-lg lg:text-lg">
                Create Your Stunning Portfolio in Seconds. Just Enter Your Details and Get Started!
            </p>

            <div className="absolute top-80 right-0 w-96 h-96">
                <RoboAnimation />
            </div>
            <div className="mt-6 mb-4">
                <PlaceholdersAndVanishInput
                    placeholders={placeholders}
                    onChange={handleChange}
                    onSubmit={onSubmit}
                />
            </div>
            <div className="flex flex-col overflow-hidden">
                <ContainerScroll>
                    <Image
                        src={linear}
                        alt="hero"
                        height={720}
                        width={1400}
                        className="mx-auto rounded-2xl object-cover h-full object-left-top"
                        draggable={false}
                    />
                </ContainerScroll>
            </div>
        </div>
    );
}