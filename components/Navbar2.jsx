"use client"
import React from 'react';
import Link from 'next/link';
import { SignedIn, useUser } from '@clerk/nextjs';

const Navbar2 = () => {
  const { user } = useUser();

  return (
    <nav className="bg-[#8174A0] fixed sticky w-full p-4 shadow-none" style={{ fontFamily: 'Acme, sans-serif' }}>
      <div className="flex items-center justify-start space-x-8 ml-8">
        <Link href="/adopt">
          <button className="text-white text-lg font-light hover:bg-purple-600 py-2 px-4 rounded-md transition duration-300">
            Adopt
          </button>
        </Link>
        <Link href="/about">
          <button className="text-white text-lg font-light hover:bg-purple-600 py-2 px-4 rounded-md transition duration-300">
            About Us
          </button>
        </Link>
        <Link href="/contact">
          <button className="text-white text-lg font-light hover:bg-purple-600 py-2 px-4 rounded-md transition duration-300">
            Contact
          </button>
        </Link>
        {/* Show Favorites button only when signed in */}
        <SignedIn>
          <Link href={`/favorites/${user?.id}`}>
            <button className="text-white text-lg font-light hover:bg-purple-600 py-2 px-4 rounded-md transition duration-300">
              Favorites
            </button>
          </Link>
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar2;
