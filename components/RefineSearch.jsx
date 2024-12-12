"use client";
import { useState } from "react";

const RefineSearch = ({
  searchTerm,
  setSearchTerm,
  selectedSpecies,
  setSelectedSpecies,
  genderFilter,
  setGenderFilter,
  ageFilter,
  setAgeFilter,
}) => {
  const [pendingSearchTerm, setPendingSearchTerm] = useState(searchTerm); // Tracks the input field value

  // Safeguard to ensure selectedSpecies is always an array
  const speciesOptions = ["Cats", "Dogs", "Other Pets"];

  const handleSpeciesChange = (species) => {
    if (!selectedSpecies) setSelectedSpecies([]); // Initialize if undefined
    if (selectedSpecies.includes(species)) {
      // Remove species if already selected
      setSelectedSpecies(selectedSpecies.filter((item) => item !== species));
    } else {
      // Add species if not already selected
      setSelectedSpecies([...selectedSpecies, species]);
    }
  };

  // Reset function to clear all filters
  const handleReset = () => {
    setSearchTerm("");            // Reset search term
    setPendingSearchTerm("");     // Reset input field value
    setSelectedSpecies([]);       // Clear species selection
    setGenderFilter(null);        // Reset gender filter
    setAgeFilter(null);           // Reset age filter
  };

  // Update searchTerm only when the Search button is clicked
  const handleSearch = () => {
    setSearchTerm(pendingSearchTerm); // Trigger filtering logic
  };

  return (
    <div className="bg-[#8174A0] text-white p-6 rounded-md shadow-md w-full max-w-xs mx-4 md:mx-0 md:w-auto md:ml-8">
      <h2 className="text-xl font-semibold mb-4">Refine Your Search</h2>

      {/* Search Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1" htmlFor="search">
          Search for a pet
        </label>
        <div className="flex items-center flex-wrap gap-2">
          <input
            type="text"
            id="search"
            placeholder="Name"
            value={pendingSearchTerm}
            onChange={(e) => setPendingSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded-md flex-grow min-w-0 focus:outline-none focus:ring-2 focus:ring-orange-300 text-black"
          />
          <button
            onClick={handleSearch} // Update the search term on click
            className="bg-orange-300 hover:bg-orange-400 p-2 rounded-md text-white w-full sm:w-auto"
          >
            Search
          </button>
        </div>
      </div>

      {/* Species Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2">Species</h3>
        <ul className="space-y-1">
          {speciesOptions.map((species) => (
            <li key={species}>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox text-orange-300"
                  checked={selectedSpecies?.includes(species)} // Safeguard for undefined selectedSpecies
                  onChange={() => handleSpeciesChange(species)}
                />
                <span>{species}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Gender Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2">Gender</h3>
        <ul className="space-y-1">
          <li>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="gender"
                className="form-radio text-orange-300"
                checked={genderFilter === "Male"}
                onChange={() => setGenderFilter("Male")}
              />
              <span>Male</span>
            </label>
          </li>
          <li>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="gender"
                className="form-radio text-orange-300"
                checked={genderFilter === "Female"}
                onChange={() => setGenderFilter("Female")}
              />
              <span>Female</span>
            </label>
          </li>
        </ul>
      </div>

      {/* Age Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2">Age</h3>
        <ul className="space-y-1">
          <li>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="age"
                className="form-radio text-orange-300"
                checked={ageFilter === "baby"}
                onChange={() => setAgeFilter("baby")}
              />
              <span>Baby (0-24 months)</span>
            </label>
          </li>
          <li>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="age"
                className="form-radio text-orange-300"
                checked={ageFilter === "grown"}
                onChange={() => setAgeFilter("grown")}
              />
              <span>Grown (2 years+)</span>
            </label>
          </li>
        </ul>
      </div>

      {/* Reset Button */}
      <button
        onClick={handleReset}
        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md w-full"
      >
        Reset
      </button>
    </div>
  );
};

export default RefineSearch;
