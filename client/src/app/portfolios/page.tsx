"use client"

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import portfolio1 from "@/assets/Portfolio1.png"
import { useMyContext } from "@/context/MyContext";

export default function Portfolios() {
  const { userProfile, setUserProfile } = useMyContext();
  
  console.log("User Profile in Templates: ", userProfile);

  useEffect(() => {
    async function fetchUserProfile() {
      if (!userProfile?.email) return; // Wait until email is available
      const res = await fetch(`/api/user?email=${userProfile.email}`);
      const data = await res.json();
      setUserProfile(data);
      console.log('Set user profile:', data);
    }
    fetchUserProfile();
  }, [userProfile?.email]);

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p className="text-lg">Loading user profile...</p>
      </div>
    );
  }

  if (!userProfile.UserId) {
    console.error("UserId is missing in userProfile:", userProfile);
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p className="text-lg">Error: User ID not found. Please try logging in again.</p>
      </div>
    );
  }

  const templates = [
    {
      id: 1,
      name: "Developer Portfolio",
      thumbnail: portfolio1,
      previewLink: `http://localhost:5173/?id=${userProfile.UserId}`,
      customizeLink: "",
    }
  ];

  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Portfolio Templates</h1>
      

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((template) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#171717] rounded-xl overflow-hidden shadow-xl border border-[#333]"
          >
            <div className="relative h-48 w-full">
              <Image
                src={template.thumbnail}
                alt={template.name}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{template.name}</h3>
              <div className="flex gap-4 mt-4">
                <motion.a
                  href={template.previewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className="flex-1 text-center bg-[#7d47ea] hover:bg-[#5a32c4] transition-all py-2 rounded-lg font-semibold"
                >
                  Preview
                </motion.a>
                <motion.a
                  href={template.customizeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className="flex-1 text-center bg-[#222] hover:bg-[#333] border border-[#7d47ea] py-2 rounded-lg font-semibold"
                >
                  Customize
                </motion.a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
