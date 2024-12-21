"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from "next/link"; // Import Link for navigation
import Navbar from "../../../../components/Navbar";
import Navbar2 from "../../../../components/Navbar2";
import Footer from "../../../../components/Footer";

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

async function checkExistingSubmission(petId, userId) {
  try {
    const res = await fetch(`/api/adoption-form?petId=${petId}&userId=${userId}`);
    if (!res.ok) throw new Error("Failed to check existing submission");
    const data = await res.json();
    return data.success && data.data.length > 0;
  } catch (error) {
    console.error("Error checking existing submission:", error);
    return false;
  }
}

function AdoptionFormPage() {
  const { id } = useParams();
  const { user } = useUser();
  const [pet, setPet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    adultsInHousehold: "",
    childrenInHousehold: "",
    allergies: "",
    homeType: "",
    petExperience: "",
    reasonForAdopting: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsSubmitted(false);
      setErrorMessage("");

      const petData = await fetchPetDetails(id);
      if (petData) setPet(petData);

      if (user) {
        const exists = await checkExistingSubmission(id, user.id);
        if (exists) {
          setIsSubmitted(true);
          setErrorMessage(
            "You have already submitted an adoption request for this pet. Please wait for approval."
          );
        }
      }

      setIsLoading(false);
    };

    fetchData();
  }, [id, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitted) return;

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/adoption-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          petId: pet._id,
          userId: user.id,
          petName: pet.name,
          petSpecies: pet.species,
          petBreed: pet.breed,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit adoption form");
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage(
        error.message || "An error occurred while submitting the form. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (pet?.adoptionStatus === "adopted") {
    return (
      <div className="flex flex-col bg-[#F1DBE2] min-h-screen">
        <Navbar />
        <Navbar2 />
        <main className="container mx-auto px-4 py-8 flex-grow">
          <h1 className="text-4xl font-bold mb-6">Adopt {pet.name}</h1>
          <div className="bg-red-100 text-red-700 p-4 rounded">
            <p className="font-semibold">
              This pet has already been adopted and is no longer available for adoption.
            </p>
          </div>
          <Link href="/" className="text-blue-500 hover:underline mt-4 block">
            Return to Home
          </Link>
        </main>
        <Footer />
      </div>
    );
  }
  return (
    <div className="flex flex-col bg-[#F1DBE2] min-h-screen">
      <Navbar />
      <Navbar2 />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-4xl font-bold mb-6">Adopt {pet.name}</h1>
        <SignedIn>
          <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
          {/* Pet Details (Read-Only) */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Pet Name</label>
            <input
              type="text"
              value={pet.name}
              readOnly
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Species</label>
            <input
              type="text"
              value={pet.species}
              readOnly
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Breed</label>
            <input
              type="text"
              value={pet.breed}
              readOnly
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>

          {/* Applicant's Information */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            ></textarea>
          </div>

          {/* Household Information */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Provide Your National Id Card number
            </label>
            <input
              type="text"
              name="adultsInHousehold"
              value={formData.adultsInHousehold}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Are there children in your household? If so, what are their ages?
            </label>
            <textarea
              name="childrenInHousehold"
              value={formData.childrenInHousehold}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Does anyone in your household have allergies to pets?
            </label>
            <input
              type="text"
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Do you own or rent your home?</label>
            <input
              type="text"
              name="homeType"
              value={formData.homeType}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Adoption Intent */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">What experience do you have with pets?</label>
            <textarea
              name="petExperience"
              value={formData.petExperience}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Why do you want to adopt this pet?</label>
            <textarea
              name="reasonForAdopting"
              value={formData.reasonForAdopting}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Additional Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            ></textarea>
          </div>
          <button
              type="submit"
              className={`px-4 py-2 rounded ${
                isSubmitted
                  ? "bg-green-500 hover:bg-green-600"
                  : isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white`}
              disabled={isSubmitting || isSubmitted}
            >
              {isSubmitted
                ? "Request Submitted"
                : isSubmitting
                ? "Submitting..."
                : "Submit Adoption Request"}
            </button>

            {isSubmitted && (
              <div className="mt-4 p-4 bg-green-100 text-green-700 rounded">
                Your adoption request has been submitted successfully. We will review your
                application and get back to you soon.
              </div>
            )}
          </form>
        </SignedIn>

        <SignedOut>
          <div >
            <p className="text-gray-700 mb-4">
              Please{" "}
              <Link href="/sign-in" className="text-blue-500 hover:underline">
                sign in
              </Link>{" "}
              to submit an adoption request.
            </p>
          </div>
        </SignedOut>
      </main>
      <Footer />
    </div>
  );
}

export default AdoptionFormPage;