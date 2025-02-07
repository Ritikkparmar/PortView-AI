import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/sections/Navbar";
// import { Footer } from "@/sections/Footer";
import { MyProvider } from "@/context/MyContext";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Career Craft AI",
  description:
    "Empowering your career journey with AI-powered tools like career advising, roadmap generation, portfolio builder, and interview preparation.",
  openGraph: {
    title: "Career Craft AI",
    description:
      "Empowering your career journey with AI-powered tools like career advising, roadmap generation, portfolio builder, and interview preparation.",
    type: "website",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>

      <MyProvider>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <Navbar />
            {children}
          </body>
        </html>
      </MyProvider>
    </ClerkProvider>
  );
}
