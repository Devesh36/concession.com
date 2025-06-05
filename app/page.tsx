import Image from "next/image";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import Features from "@/components/layout/Features/Features";
import { motion } from "framer-motion";
import React from "react";
import Link from "next/link";
import Footer from "@/components/layout/Footer/Footer";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`${inter.className} min-h-screen bg-amber-50`}>
      <SmoothCursor />
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </main>
  );
}
