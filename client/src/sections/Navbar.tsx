"use client";

import Image from "next/image";
import Uparrow from "@/assets/uil_arrow-up.svg";
import { NavLinks } from "@/components/NavLinks";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import Link from 'next/link';


export default function Navbar() {
    return (
        <nav className="fixed top-0 backdrop-blur-md z-30 w-full">
            <div className="flex justify-between items-center h-[10vh] px-6 md:px-32 w-full">
                <div className="flex gap-2 items-center">
                    {/* <Image src={logo} alt="Logo" width={35} height={35} /> */}
                    <Link href="/" className="font-medium font-chillax text-[1.2rem] md:text-[1.5rem] text-white">
                        CAREER CRAFT AI
                    </Link>
                </div>

                <div className="hidden md:flex font-medium">
                    <NavLinks />
                </div>

                <div className="hidden md:flex">
                    <HoverBorderGradient
                        containerClassName="rounded-full"
                        as="button"
                        className="bg-[#171717] flex items-center px-4 py-2 rounded-full active:bg-[#7D47EA]"
                    >
                        <span>Sign in</span>
                        <Image src={Uparrow} alt="up-arrow" className="ml-2" />
                    </HoverBorderGradient>
                </div>

                {/* Mobile Menu Button (visible on small screens) */}
                <div className="flex md:hidden">
                    <button className="text-white">
                        <Image src={Uparrow} alt="mobile-menu" width={30} height={30} />
                    </button>
                </div>
            </div>
        </nav>
    );
}
