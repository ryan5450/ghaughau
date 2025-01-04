"use client";


import React, { useState, useEffect } from "react";
import { AiFillHeart } from "react-icons/ai";
import Navbar from "../../../../components/Navbar";
import Navbar2 from "../../../../components/Navbar2";
import Footer from "../../../../components/Footer";
import { notFound } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { use } from "react"; // New hook for handling async params
import Link from "next/link";
import LoadingSpinner from "../../../../components/LoadingSpinner";
async function fetchPetDetails(id) {
  try {
    const res = await fetch(`/api/pets?id=${id}`);
    if (!res.ok) throw new Error("Failed to fetch pet details");
    return await res.json();
  } catch (error) {
    console.error("Error fetching pet details:", error);
    return null;
  }
}

async function checkFavoriteStatus(userId, petId) {
  try {
    const res = await fetch(`/api/favorites?userId=${userId}`);
    const data = await res.json();
    return data.data.some((favorite) => favorite.pet._id === petId);
  } catch (error) {
    return false;
  }
}

export default function PetDetailsPage({ params }) {
  const { user } = useUser();

  const [pet, setPet] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [id, setId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedPet, setUpdatedPet] = useState({});

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    };

    fetchParams();
  }, [params]);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      const petData = await fetchPetDetails(id);
      if (petData) {
        setPet(petData);
        if (user) {
          const favoriteStatus = await checkFavoriteStatus(user.id, id);
          setIsFavorite(favoriteStatus);
        }
      } else {
        notFound();
      }
    };

    fetchData();
  }, [id, user]);

  const toggleFavorite = async () => {
    if (!user) {
      console.error("Please log in to add favorites");
      return;
    }

    setIsUpdating(true);
    try {
      const method = isFavorite ? "DELETE" : "POST";
      const res = await fetch("/api/favorites", {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, petId: id }),
      });

      const data = await res.json();

      if (res.ok) {
        setIsFavorite(!isFavorite);
        console.log(data.message);
      } else {
        throw new Error(data.error || "Failed to update favorites");
      }
    } catch (error) {
      console.error("Error updating favorites:", error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPet({ ...updatedPet, [name]: value });
  };

  const updatePet = async () => {
    try {
      const res = await fetch(`/api/pets?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPet),
      });

      if (!res.ok) throw new Error("Failed to update pet");
      const data = await res.json();
      setPet(data);
      setEditMode(false);
      console.log("Pet updated successfully");
    } catch (error) {
      console.error("Error updating pet:", error.message);
    }
  };

  const deletePet = async () => {
    try {
      const res = await fetch(`/api/pets?id=${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete pet");
      console.log("Pet deleted successfully");
      // Redirect or handle deletion
    } catch (error) {
      console.error("Error deleting pet:", error.message);
    }
  };

  if (!id || !pet)  {
      return <LoadingSpinner />;
    }


  return (
    <div className="flex flex-col bg-[#F1DBE2] min-h-screen justify-between">
      <header>
        <Navbar />
        <Navbar2 />
      </header>

      <main className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-start flex-grow">
        <div className="md:w-1/2 md:pr-8">
          <h2 className="text-5xl font-acme text-[#8174A0]">{pet.name}</h2>
          <p className="text-orange-500 text-l font-acme">
            {pet.adoptionStatus === "Available" ? "Special home needed!" : "Adopted"}
          </p>
          <section className="mt-4">
            <h3 className="text-5xl font-acme text-[#A888B5]">About {pet.name}:</h3>
            <p className="text-[#A888B5] text-xl mt-2 font-acme">{pet.description}</p>
          </section>
          <div className="mt-6 font-acme grid grid-cols-12 items-center text-[#A888B5]">
            <div className="col-span-5 text-right pr-14 text-xl">
              <p>
                <strong>Age:</strong> {pet.age}
              </p>
              <p>
                <strong>Vaccination Status:</strong> {pet.vaccinationStatus}
              </p>
            </div>
            <div className="border-l-2 border-[#A888B5] h-full"></div>
            <div className="col-span-5 text-left text-xl">
              <p>  
                <strong>Breed:</strong> {pet.breed}
              </p> 
              <p> 
                <strong>Gender:</strong> {pet.gender}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center md:w-1/2">
          <img
            src={pet.imageUrl}
            alt={pet.name}
            className="w-80 h-80 rounded-md shadow-md object-cover cursor-pointer"
          />
          <div className="mt-6 flex space-x-4">
            <Link href="/contact">
              <button className="bg-[#FFC585] text-white px-6 py-2 rounded-full shadow-md hover:bg-orange-500">
                Do Enquire
              </button>
            </Link>

            <Link href={`/adopt-form/${id}`}>
              <button className="bg-[#FFC585] text-white px-6 py-2 rounded-full shadow-md hover:bg-orange-500">
                Make Adoption
              </button>
            </Link>
          </div>

          {user && (
            <div className="mt-6 relative">
              <button
                onClick={toggleFavorite}
                className="text-4xl hover:text-orange-500 relative group"
                aria-label={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                disabled={isUpdating}
              >
                <AiFillHeart
                  className={`${
                    isFavorite ? "text-orange-500" : "text-[#FFC585]"
                  } hover:text-orange-500 transition-colors duration-300`}
                />
                <span className="absolute left-1/2 transform -translate-x-1/2 bottom-[-30px] text-sm text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                </span>
              </button>
            </div>
          )}
        </div>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

