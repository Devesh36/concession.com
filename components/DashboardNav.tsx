"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

interface NavLink {
  href: string;
  label: string;
}

interface DashboardNavProps {
  userName: string;
  userRole: string;
  navLinks: NavLink[];
}

export default function DashboardNav({ userName, userRole, navLinks }: DashboardNavProps) {
  return (
    <nav className="bg-white border-b border-amber-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <span className="text-xl font-bold text-amber-900">
              Railway Concession
            </span>
            <div className="hidden md:flex space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-amber-700 hover:text-amber-900 hover:bg-amber-50 rounded-md"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-amber-700">{userName}</span>
            <span className="px-2 py-1 text-xs font-medium bg-amber-100 text-amber-800 rounded-full">
              {userRole.replace("_", " ")}
            </span>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="px-3 py-2 text-sm font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}