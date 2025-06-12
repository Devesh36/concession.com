"use client";

import React, { useState } from 'react';
import Link from 'next/link';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-amber-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-amber-800 font-bold text-xl">
              RailwayConcession
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login?role=STUDENT"
              className="group relative inline-flex items-center justify-center px-6 py-2.5 rounded-lg text-sm font-medium text-amber-600 border border-amber-600 transition-all duration-200 ease-in-out hover:bg-amber-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 active:scale-95"
            >
              <span className="relative">Student Login</span>
            </Link>
            <Link
              href="/login?role=COLLEGE_STAFF"
              className="group relative inline-flex items-center justify-center px-6 py-2.5 rounded-lg text-sm font-medium text-amber-600 border border-amber-600 transition-all duration-200 ease-in-out hover:bg-amber-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 active:scale-95"
            >
              <span className="relative">College Staff</span>
            </Link>
            <Link
              href="/login?role=RAILWAY_STAFF"
              className="group relative inline-flex items-center justify-center px-6 py-2.5 rounded-lg text-sm font-medium text-amber-600 border border-amber-600 transition-all duration-200 ease-in-out hover:bg-amber-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 active:scale-95"
            >
              <span className="relative">Railway Staff</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-amber-700 hover:text-amber-900 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="p-4 space-y-3 bg-amber-50">
            <Link
              href="/login?role=STUDENT"
              className="block w-full px-6 py-3 text-center rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-sm font-medium text-white shadow-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-200 ease-in-out hover:shadow-amber-500/25 active:scale-95"
            >
              Student Login
            </Link>
            <Link
              href="/login?role=COLLEGE_STAFF"
              className="block w-full px-6 py-3 text-center rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 text-sm font-medium text-white shadow-lg hover:from-amber-700 hover:to-amber-800 transition-all duration-200 ease-in-out hover:shadow-amber-600/25 active:scale-95"
            >
              College Staff Login
            </Link>
            <Link
              href="/login?role=RAILWAY_STAFF"
              className="block w-full px-6 py-3 text-center rounded-lg bg-gradient-to-r from-amber-700 to-amber-800 text-sm font-medium text-white shadow-lg hover:from-amber-800 hover:to-amber-900 transition-all duration-200 ease-in-out hover:shadow-amber-700/25 active:scale-95"
            >
              Railway Staff Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
