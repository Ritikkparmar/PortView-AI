"use client";

import { SignUp, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
    const { isSignedIn, user } = useUser();
    const router = useRouter();

    useEffect(() => {
        const createUserProfile = async () => {
            if (isSignedIn && user) {
                try {
                    const email = user.primaryEmailAddress?.emailAddress;
                    if (!email) return;

                    // Check if user already exists
                    const checkResponse = await fetch(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/verify/?email=${encodeURIComponent(email)}`
                    );

                    if (checkResponse.ok) {
                        // User already exists, redirect to home
                        router.push('/');
                        return;
                    }

                    // Create new user
                    const newUser = {
                        name: user.fullName || 'Unknown User',
                        picture: user.imageUrl,
                        email: email,
                    };

                    const createResponse = await fetch(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(newUser),
                        }
                    );

                    if (createResponse.ok) {
                        console.log('User profile created successfully');
                        router.push('/');
                    } else {
                        console.error('Failed to create user profile');
                    }
                } catch (error) {
                    console.error('Error creating user profile:', error);
                }
            }
        };

        createUserProfile();
    }, [isSignedIn, user, router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A]">
            <SignUp
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
                path="/sign-up"
                signInUrl="/sign-in"
                redirectUrl="/"
            />
        </div>
    );
} 