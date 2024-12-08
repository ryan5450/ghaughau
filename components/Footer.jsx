import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[#8174A0] fixed sticky w-full p-10 shadow-md" style={{ fontFamily: 'Acme, sans-serif' }}>
      <div className="flex items-center justify-center space-x-14">
        <Link href="/feedback">
          <button className="text-white text-lg font-light hover:bg-purple-600 py-2 px-4 rounded-md transition duration-300">
            Feedback
          </button>
        </Link>
        <Link href="/policy">
          <button className="text-white text-lg font-light hover:bg-purple-600 py-2 px-4 rounded-md transition duration-300">
            Policy
          </button>
        </Link>
        <Link href="/faqs">
          <button className="text-white text-lg font-light hover:bg-purple-600 py-2 px-4 rounded-md transition duration-300">
            FAQs
          </button>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
