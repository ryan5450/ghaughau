// "use client";

// import React, { useState, useEffect } from "react";
import Navbar from "../../../../components/Navbar";
import Navbar2 from "../../../../components/Navbar2";
import Footer from "../../../../components/Footer";
import { notFound } from "next/navigation";

async function fetchPetDetails(id) {
  try {
    // Determine if running on server or client
    const isServer = typeof window === "undefined";

    // Construct the base URL dynamically
    const baseUrl = isServer
      ? "http://localhost:3000" || process.env.NEXT_PUBLIC_BASE_URL 
      : ""; // Empty string for relative paths in the browser

    const res = await fetch(`${baseUrl}/api/pets?id=${id}`);
    if (!res.ok) throw new Error("Failed to fetch pet details");
    return res.json();
  } catch (error) {
    console.error("Error fetching pet details:", error);
    return null;
  }
}

export default async function PetDetailsPage({ params }) {
  const resolvedParams = await params; //  params is resolved first
  const { id } = resolvedParams; // 
  const pet = await fetchPetDetails(id);

  if (!pet) {
    notFound(); // Render 404 page if no pet is found
  }

  return (
    <div className="flex bg-[#F1DBE2] flex-col h-screen justify-between">
      <header>
        <Navbar />
        <Navbar2 />
      </header>

      <main className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-start">
        <div className="md:w-1/2 md:pr-8">
          <h2 className="text-5xl font-acme text-[#8174A0]">{pet.name}</h2>
          <p className="text-red-500 text-l font-acme">Special home needed!</p>
          <section className="mt-4">
            <h3 className="text-5xl font-acme text-[#8174A0]">About {pet.name}:</h3>
            <p className="text-[#A888B5] text-xl mt-2 font-acme">{pet.description}</p>
          </section>
          <div className="mt-6 font-acme grid grid-cols-12 items-center text-[#A888B5]">
            <div className="col-span-5 text-right pr-14 text-xl">
              <p><strong>Age:</strong> {pet.age}</p>
              <p><strong>Vaccination Status:</strong> {pet.vaccinationStatus}</p>
            </div>
            <div className="border-l-2 border-[#A888B5] h-full"></div>
            <div className="col-span-5 text-left text-xl">
              <p><strong>Breed:</strong> {pet.breed}</p>
              <p><strong>Gender:</strong> {pet.gender}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center md:w-1/2">
          <img
            src={pet.imageUrl}
            className="w-80 h-80 rounded-md shadow-md object-cover cursor-pointer"
          />
          <div className="mt-6 flex space-x-4">
            <button className="bg-orange-300 text-white px-6 py-2 rounded-full shadow-md hover:bg-orange-400">
              Do Enquire
            </button>
            <button className="bg-orange-300 text-white px-6 py-2 rounded-full shadow-md hover:bg-orange-400">
              Make Adoption
            </button>
          </div>
        </div>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}
