"use client";

import React, { useState } from 'react';
import Navbar from '../../../components/Navbar';
import Navbar2 from '../../../components/Navbar2';
import Footer from '../../../components/Footer';

export default function PetProfile() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const openModal = (imageSrc) => {
    setSelectedImage(imageSrc);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className='flex bg-[#F1DBE2] flex-col h-screen justify-between'>
      <header>
        <Navbar />
        <Navbar2 />
      </header>

      <main className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-start">
        <div className="md:w-1/2 md:pr-8">
          <h2 className="text-5xl font-acme text-[#8174A0]">Cookie</h2>
          <p className="text-red-500 text-l font-acme">Special home needed!</p>
          <section className="mt-4">
            <h3 className="text-5xl font-acme text-[#8174A0]">About Cookie:</h3>
            <p className="text-[#A888B5] text-xl mt-2 font-acme">
              Meet Cookie – Your Future Furry Friend! Cookie is an adorable 1-month-old puppy who is ready to bring endless joy to your home! He’s a healthy, playful, and friendly little companion, full of love and energy. With his sweet nature and charming personality, Cookie is sure to become the heart of your family.
            </p>
            <p className="text-[#A888B5] mt-2 text-xl font-acme">
              If you’re looking to welcome a loving pup into your life, Cookie is waiting for you! Please reach out if you’re interested in giving this precious boy a forever home. 💕
            </p>
          </section>
            <div className="mt-6 font-acme grid grid-cols-12 items-center text-[#A888B5]">
            <div className="col-span-5 text-right pr-14 text-xl">
              <p><strong>Age:</strong> 1 Month</p>
              <p><strong>Health condition:</strong> Ok</p>
            </div>
            <div className="border-l-2 border-[#A888B5] h-full"></div>
            <div className="col-span-5 text-left text-xl">
              <p><strong>Breed:</strong> Bernedoodle</p>
              <p><strong>Gender:</strong> Male</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center md:w-1/2">
          <img
            src="/cookie-main.jpg"
            className="w-80 h-80 rounded-md shadow-md object-cover cursor-pointer"
            onClick={() => openModal('/cookie-main.jpg')}
          />
          <div className="flex space-x-2 mt-4">
            <img
              src="/cookie2.jpg"
              className="w-20 h-20 rounded-md shadow-md object-cover cursor-pointer"
              onClick={() => openModal('/cookie2.jpg')}
            />
            <img
              src="/cookie2.jpg"
              className="w-20 h-20 rounded-md shadow-md object-cover cursor-pointer"
              onClick={() => openModal('/cookie2.jpg')}
            />
          </div>
          <div className="mt-6 flex space-x-4">
            <button className="bg-orange-300 text-white px-6 py-2 rounded-full shadow-md hover:bg-orange-400">Do Enquire</button>
            <button className="bg-orange-300 text-white px-6 py-2 rounded-full shadow-md hover:bg-orange-400">Make Adoption</button>
          </div>
        </div>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white p-4 rounded-md shadow-md">
            <button
              className="absolute top-6 right-6 text-gray-600 hover:text-gray-800"
              onClick={closeModal}
            >
              ✕
            </button>
            <img src={selectedImage} className="max-w-full max-h-screen rounded-md" />
          </div>
        </div>
      )}

      <footer>
        <Footer />
      </footer>
    </div>
  );
}
