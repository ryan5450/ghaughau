"use client";
import { useState, useEffect } from "react";
import PetCard from "./PetCard";
import RefineSearch from "./RefineSearch";

const RefineSearchAndPets = () => {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState([]);
  const [genderFilter, setGenderFilter] = useState("");
  const [ageFilter, setAgeFilter] = useState("");

  const speciesOptions = ["Cats", "Dogs", "Other Pets"];

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch("/api/pets");

        if (!response.ok) {
          throw new Error(`Failed to fetch pets: ${response.statusText}`);
        }

        const data = await response.json();
        setPets(data);
        setFilteredPets(data);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };

    fetchPets();
  }, []);

  const classifySpecies = (species) => {
    if (species.toLowerCase() === "cat") return "Cats";
    if (species.toLowerCase() === "dog") return "Dogs";

    return "Other Pets";
  };

  useEffect(() => {
    let filtered = pets;

    if (selectedSpecies.length > 0) {
      filtered = filtered.filter((pet) =>
        selectedSpecies.some(
          (category) => classifySpecies(pet.species) === category
        )
      );
    }

    if (genderFilter) {
      filtered = filtered.filter((pet) => pet.gender === genderFilter);
    }

    if (ageFilter) {
      if (ageFilter === "baby") {
        filtered = filtered.filter((pet) =>
          pet.age.toLowerCase().includes("months")
        );
      } else if (ageFilter === "grown") {
        filtered = filtered.filter((pet) =>
          pet.age.toLowerCase().includes("years")
        );
      }
    }

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((pet) =>
        pet.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPets(filtered);
  }, [pets, searchTerm, selectedSpecies, genderFilter, ageFilter]);

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      {/* Refine Search Sidebar */}
      <div className="md:w-1/4">
        <RefineSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedSpecies={selectedSpecies}
          setSelectedSpecies={setSelectedSpecies}
          genderFilter={genderFilter}
          setGenderFilter={setGenderFilter}
          ageFilter={ageFilter}
          setAgeFilter={setAgeFilter}
        />
      </div>

      {/* Pet Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPets.length > 0 ? (
          filteredPets.map((pet) => (
            <PetCard
              key={pet._id}
              id={pet._id} // Pass the ID
              name={pet.name}
              age={pet.age}
              species={classifySpecies(pet.species)}
              gender={pet.gender}
              breed={pet.breed}
              imageUrl={pet.imageUrl}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">
            No pets match your criteria.
          </p>
        )}
      </div>
    </div>
  );
};

export default RefineSearchAndPets;
