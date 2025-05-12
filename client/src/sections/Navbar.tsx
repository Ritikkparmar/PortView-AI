"use client";

import { useEffect } from "react";
import Image from "next/image";
import Uparrow from "@/assets/uil_arrow-up.svg";
import { NavLinks } from "@/components/NavLinks";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import logo from "@/assets/logo-photoroom.png";
import { useMyContext } from "@/context/MyContext";

export default function Navbar() {
  const { userProfile, setUserProfile } = useMyContext();
  const { user } = useUser();

  useEffect(() => {
    if (user && user.primaryEmailAddress) {
      const fetchUserData = async () => {
        try {
          const email = user.primaryEmailAddress?.emailAddress || "";
          const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
          
          if (!backendUrl) {
            console.error("Backend URL is not defined in environment variables");
            // Create a local user profile from Clerk data as fallback
            setUserProfile({
              name: user.fullName || "",
              picture: user.imageUrl || "",
              email: email,
            });
            return;
          }
          
          try {
            // Set up fetch with timeout
            const fetchWithTimeout = async (url: string, options: RequestInit = {}, timeout = 5000) => {
              const controller = new AbortController();
              const { signal } = controller;
              
              const timeoutId = setTimeout(() => controller.abort(), timeout);
              
              try {
                const response = await fetch(url, { ...options, signal });
                clearTimeout(timeoutId);
                return response;
              } catch (error) {
                clearTimeout(timeoutId);
                throw error;
              }
            };

            const response = await fetchWithTimeout(
              `${backendUrl}/user/verify/?email=${encodeURIComponent(email)}`
            );

            if (response.ok) {
              const data = await response.json();
              setUserProfile(data);
            } else {
              // User doesn't exist, create new user
              try {
                const newUser = {
                  name: user.fullName || "",
                  picture: user.imageUrl || "",
                  email: email,
                };

                const createResponse = await fetchWithTimeout(
                  `${backendUrl}/user`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newUser),
                  }
                );

                if (createResponse.status === 201) {
                  const createdUser = await createResponse.json();
                  setUserProfile(createdUser);
                } else {
                  console.error("Error creating user:", createResponse.status);
                  // Use Clerk data as fallback
                  setUserProfile({
                    name: user.fullName || "",
                    picture: user.imageUrl || "",
                    email: email,
                  });
                }
              } catch (createError) {
                console.error("Error creating user:", createError);
                // Use Clerk data as fallback
                setUserProfile({
                  name: user.fullName || "",
                  picture: user.imageUrl || "",
                  email: email,
                });
              }
            }
          } catch (fetchError) {
            console.error("Error verifying user:", fetchError);
            // Use Clerk data as fallback
            setUserProfile({
              name: user.fullName || "",
              picture: user.imageUrl || "",
              email: email,
            });
          }
        } catch (error) {
          console.error("Error in user data handling:", error);
          // Use basic user info as fallback if available
          if (user) {
            setUserProfile({
              name: user.fullName || "User",
              picture: user.imageUrl || "",
              email: user.primaryEmailAddress?.emailAddress || "",
            });
          }
        }
      };

      fetchUserData();
    }
  }, [user, setUserProfile]);

  return (
    <nav className="fixed top-0 backdrop-blur-md z-30 w-full">
      <div className="flex justify-between items-center h-[10vh] px-6 md:px-32 w-full">
        <div className="flex gap-2 items-center">
          <Link href="/">
            <Image src={logo} alt="Logo" width={120} height={120} />
          </Link>
        </div>

        <div className="hidden md:flex font-medium">
          <NavLinks />
        </div>

        <SignedOut>
          <Link href="/sign-in" className="hidden md:flex">
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="bg-[#171717] flex items-center px-4 py-2 rounded-full active:bg-[#7D47EA]"
            >
              <span>Sign in</span>
              <Image src={Uparrow} alt="up-arrow" className="ml-2" />
            </HoverBorderGradient>
          </Link>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>

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
