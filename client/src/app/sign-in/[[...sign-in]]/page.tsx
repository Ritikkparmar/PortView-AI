"use client";

import { SignIn, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMyContext } from "@/context/MyContext";

export default function Page() {
    const { isSignedIn, user } = useUser();
    const router = useRouter();
    const { setUserProfile } = useMyContext();

    useEffect(() => {
        const loadUserProfile = async () => {
            if (isSignedIn && user) {
                try {
                    const email = user.primaryEmailAddress?.emailAddress;
                    if (!email) return;

                    const response = await fetch(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/verify/?email=${encodeURIComponent(email)}`
                    );

                    if (response.ok) {
                        const userData = await response.json();
                        setUserProfile(userData);
                        router.push('/');
                    } else {
                        console.error('Failed to load user profile');
                    }
                } catch (error) {
                    console.error('Error loading user profile:', error);
                }
            }
        };

        loadUserProfile();
    }, [isSignedIn, user, router, setUserProfile]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A]">
            <SignIn
                appearance={{
                    elements: {
                        formButtonPrimary: 
                            "bg-[#7d47ea] hover:bg-violet-700 text-sm normal-case",
                        card: "bg-[#171717] shadow-xl",
                        headerTitle: "text-white",
                        headerSubtitle: "text-gray-400",
                        socialButtonsBlockButton: 
                            "border border-gray-700 hover:bg-gray-800",
                        formFieldLabel: "text-gray-400",
                        formFieldInput: 
                            "bg-[#1e1e1e] border-gray-700 text-white focus:border-[#7d47ea]",
                        footerActionLink: "text-[#7d47ea] hover:text-violet-700",
                    },
                }}
                routing="path"
                path="/sign-in"
                signUpUrl="/sign-up"
                redirectUrl="/"
            />
        </div>
    );
}