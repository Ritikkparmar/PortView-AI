import React from "react";
import HeroMain from "./HeroMain";
import Image from "next/image";
import bg from "@/assets/bg.webp"

export default function Hero() {
  return (
    <div className="relative">
      <HeroMain />
    </div>
  );
}
