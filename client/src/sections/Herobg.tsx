"use client"

import { FloatingPaper } from "@/components/floating-paper"
import { RoboAnimation } from "@/components/robo-animation"
import { motion } from "framer-motion"
import { FileText, Sparkles } from "lucide-react"

export default function Herobg() {
  return (
    <div className="relative min-h-[calc(100vh-76px)] flex items-center">
      {/* Floating papers background */}
      

      {/* Animated robot */}
      <div className="absolute bottom-0 right-0 w-96 h-96">
      </div>
    </div>
  )
}

