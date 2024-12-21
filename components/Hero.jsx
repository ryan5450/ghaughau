"use client"; 

import React from 'react';
import { SignedIn, SignedOut } from '@clerk/nextjs';

const Hero = () => {
  const handleAddToFavourites = () => {
    alert('Added to favourites!');
    // Add logic to save to favourites here
  };

  return (
    <div
      style={{
        backgroundColor: '#F1DBE2',
        fontFamily: 'Acme, sans-serif',
        height: 'calc(100vh - 64px)',
        marginTop: '0px',
      }}
      className="flex flex-col items-center justify-center text-center"
    >
      <h2 className="text-6xl mb-2 lg:text-8xl font-extrabold text-[#8174A0] text-center leading-tight px-4">
        Planning to adopt your new companion?
      </h2>
      <div className="w-full">
        <img
          src="/heroimage.svg"
          className="w-full object-cover mt-8"
          alt="Hero"
        />
      </div>

      {/* Favourite Button */}
      {/* <SignedIn>
        <button
          onClick={handleAddToFavourites}
          className="mt-6 px-6 py-2 bg-orange-300 text-white font-medium rounded-full shadow-md hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
        >
          Add to Favourites
        </button>
      </SignedIn> */}

      {/* Message for users who are not signed in
      <SignedOut>
        <p className="mt-6 text-gray-700">Please sign in to add to favourites.</p>
      </SignedOut> */}
    </div>
  );
};

export default Hero;
