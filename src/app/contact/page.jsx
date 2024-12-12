"use client";

import React, { useState } from 'react';
import Navbar from '../../../components/Navbar';
import Navbar2 from '../../../components/Navbar2';
import Footer from '../../../components/Footer';

const Contact = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [submittedContactInfo, setSubmittedContactInfo] = useState([]);

  const handleNameChange = (e) => setUserName(e.target.value);
  const handleEmailChange = (e) => setUserEmail(e.target.value);
  const handleMessageChange = (e) => setUserMessage(e.target.value);

  const handleSubmitContact = (e) => {
    e.preventDefault();
    if (userName.trim() && userEmail.trim() && userMessage.trim()) {
      setSubmittedContactInfo([...submittedContactInfo, { userName, userEmail, userMessage }]);
      setUserName('');
      setUserEmail('');
      setUserMessage('');
    }
  };

  return (
    <div className='flex bg-[#F1DBE2] flex-col h-screen justify-between'>
      <header>
        <Navbar />
        <Navbar2 />
      </header>

      <div style={{ fontFamily: 'Acme, sans-serif' }} className="bg-[#F1DBE2] min-h-screen">
        <h1 className="text-center text-4xl font-bold text-[#8174A0] py-8">Contact Us</h1>
        <div className="max-w-3xl mx-auto">
          
          {/* Contact Information Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold text-[#4B3F72]">Our Contact Information</h2>
            <div className="mt-4 space-y-4">
              <div className="flex items-center">
                <span className="font-semibold text-[#4B3F72] w-1/4">Phone:</span>
                <span className="text-[#6B5B8C]">+880 01644272228</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-[#4B3F72] w-1/4">Email:</span>
                <span className="text-[#6B5B8C]">contact@petadoption.com</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-[#4B3F72] w-1/4">Address:</span>
                <span className="text-[#6B5B8C]"> Badda, Dhaka, Bangladesh, 1111</span>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold text-[#4B3F72]">Send Us a Message</h2>
            <form onSubmit={handleSubmitContact} className="mt-4">
              <div className="mb-4">
                <label className="block text-[#4B3F72] font-semibold">Your Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={handleNameChange}
                  className="w-full p-2 border rounded-lg mt-2"
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-[#4B3F72] font-semibold">Your Email</label>
                <input
                  type="email"
                  value={userEmail}
                  onChange={handleEmailChange}
                  className="w-full p-2 border rounded-lg mt-2"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-4">
                <label className="block text-[#4B3F72] font-semibold">Your Message</label>
                <textarea
                  value={userMessage}
                  onChange={handleMessageChange}
                  rows="4"
                  className="w-full p-2 border rounded-lg mt-2"
                  placeholder="Enter your message"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#FFC585] text-white py-2 rounded-lg mt-4"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Render submitted contact info */}
          {submittedContactInfo.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-[#4B3F72]">Messages Sent</h2>
              {submittedContactInfo.map((info, index) => (
                <div key={index} className="mt-4 border-t pt-4">
                  <h3 className="font-semibold text-[#4B3F72]">{info.userName}</h3>
                  <p className="text-[#6B5B8C]">{info.userEmail}</p>
                  <p className="mt-2 text-[#6B5B8C]">{info.userMessage}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Contact;
