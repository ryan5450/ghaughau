"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // To get the `id` from the URL
import { useUser } from "@clerk/nextjs";
import Navbar from "../../../../components/Navbar";
import Navbar2 from "../../../../components/Navbar2";
import Footer from "../../../../components/Footer";
import Link from "next/link";

export default function FavoritesPage() {
  const { id } = useParams(); // Get `userId` from the URL
  const { user } = useUser();
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (id) {
        try {
          const res = await fetch(`/api/favorites?userId=${id}`);
          if (!res.ok) {
            return (
              <div>
                <p>
                  It looks like you don't have any favorites added yet.
                </p>
              </div>
            );
          }
          const { data } = await res.json();
          setFavorites(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchFavorites();
  }, [id]);

  if (!user) {
    return (
      <div className="flex flex-col bg-[#F1DBE2] min-h-screen justify-between">
        <header>
          <Navbar />
          <Navbar2 />
        </header>
        <main className="container mx-auto px-4 py-8 flex-grow">
          <div className="text-center">
            <h1 className="text-5xl font-acme text-[#8174A0] mb-4">Please Log In</h1>
            <p className="text-[#A888B5] text-xl font-acme">
              You need to be logged in to view your favorites.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Verify user ID matches URL param to prevent unauthorized access
  if (user.id !== id) {
    return (
      <div className="flex flex-col bg-[#F1DBE2] min-h-screen justify-between">
        <header>
          <Navbar />
          <Navbar2 />
        </header>
        <main className="container mx-auto px-4 py-8 flex-grow">
          <div className="text-center">
            <h1 className="text-5xl font-acme text-[#8174A0] mb-4">Unauthorized</h1>
            <p className="text-[#A888B5] text-xl font-acme">
              You are not authorized to view these favorites.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col bg-[#F1DBE2] min-h-screen justify-between">
        <header>
          <Navbar />
          <Navbar2 />
        </header>
        <main className="container mx-auto px-4 py-8 flex-grow">
          <div className="text-center">
            <p className="text-[#A888B5] text-xl font-acme">Loading your favorites...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-[#F1DBE2] min-h-screen justify-between">
      <header>
        <Navbar />
        <Navbar2 />
      </header>

      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-5xl font-acme text-[#8174A0] mb-8">Your Favorite Pets</h1>
        {error ? (
          <p className="text-red-500 text-xl font-acme">{error}</p>
        ) : favorites.length === 0 ? (
          <p className="text-[#A888B5] text-xl font-acme">
            You haven't added any pets to your favorites yet.
          </p>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {favorites.map((favorite) => (
                <Link
                  href={`/pets/${favorite.pet._id}`}
                  key={`${favorite.userId}-${favorite.pet._id}`}
                >
                  <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105">
                    <img
                      src={favorite.pet.imageUrl}
                      alt={favorite.pet.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h2 className="text-2xl font-acme text-[#8174A0] mb-2">{favorite.pet.name}</h2>
                      <p className="text-[#A888B5] font-acme">{favorite.pet.breed}</p>
                      <p className="text-[#A888B5] font-acme">{favorite.pet.age} old</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

        )}
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}
