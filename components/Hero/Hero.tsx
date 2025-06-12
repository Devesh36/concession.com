"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RetroGrid } from "@/components/magicui/retro-grid";;
import Link from 'next/link';
import { UserRole } from "@prisma/client";
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const cards = [
    {
        title: "Apply For Concession",
        description: "Fill out the application form with your details and upload necessary documents.",
        link: "/apply",
        icon: "📝",
        delay: 0.1,
    },

    {
        title: "Check Application Status",
        description: "Track the status of your application in real-time.",
        link: "/status",
        icon: "🔍",
        delay: 0.2,
    },

    {
        title : "Download Your Pass",
        description: "Once approved, download your digital concession pass instantly.",
        link: "/download",
        icon: "📥",
        delay: 0.3,
    }
];



function Hero() {
  const [selectedRole, setSelectedRole] = useState('STUDENT');

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-amber-50 to-amber-100">
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Replace multiple login buttons with dropdown */}
       

        {/* Hero Content */}
        <motion.div 
          className="text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl font-bold tracking-tight text-amber-900 sm:text-7xl mb-4 font-serif"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Railway Concession <br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-900">
              Made Simple
            </span>
          </motion.h1>
          
          <motion.p 
            className="mt-6 text-xl leading-8 text-amber-700 max-w-2xl mx-auto font-serif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Apply for your railway concession pass quickly and easily. Save time with our streamlined digital process.
          </motion.p>

          <motion.div 
            className="mt-10 flex items-center justify-center gap-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link 
              href="/apply"
              className="group relative rounded-full bg-amber-600 px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-amber-500 transition-all duration-300 hover:scale-105"
            >
              Apply Now
              <span className="absolute -inset-0.5 -z-10 rounded-full bg-gradient-to-b from-amber-400 to-amber-600 opacity-50 blur group-hover:opacity-75 transition-opacity" />
            </Link>
            <Link 
              href="/learn-more"
              className="text-amber-700 hover:text-amber-900 font-medium px-4 py-2 transition-colors"
            >
             
            </Link>
          </motion.div>

          <motion.div 
            className="mt-16 flex justify-center gap-8 opacity-70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-sm text-amber-700">✓ Instant Digital Process</p>
            <p className="text-sm text-amber-700">✓ Secure Verification</p>
            <p className="text-sm text-amber-700">✓ Quick Approval</p>
          </motion.div>
        </motion.div>

        {/* Cards Section */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: card.delay }}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="h-14 w-14 rounded-xl bg-amber-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">{card.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-amber-900 mb-3">
                {card.title}
              </h3>
              <p className="text-amber-700 mb-6 text-sm">
                {card.description}
              </p>
              <Link
                href={card.link}
                className="inline-flex items-center text-amber-600 hover:text-amber-800 font-medium transition-colors"
              >
                Get Started
                <svg
                  className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="absolute inset-0 z-0">
        <RetroGrid />
      </div>
    </section>
  );
}

export default Hero;