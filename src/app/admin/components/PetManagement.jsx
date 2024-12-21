import { useEffect, useState } from "react";

export default function PetManagement() {
  const [pets, setPets] = useState([]);
  const [editingPet, setEditingPet] = useState(null); // Track the pet being edited
  const [newPet, setNewPet] = useState({
    name: "",
    age: "",
    species: "",
    gender: "",
    breed: "",
    imageUrl: "",
    description: "",
    vaccinationStatus: "",
    status: "Available",
  });

  // Fetch pets from the database
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch("/api/pets");
        if (!response.ok) throw new Error("Failed to fetch pets");
        const data = await response.json();
        setPets(data);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };
    fetchPets();
  }, []);

  // Handle adding a new pet
  const handleAdd = async () => {
    if (!newPet.name || !newPet.imageUrl) {
      alert("Please fill in all required fields (Name and Image URL).");
      return;
    }

    try {
      const response = await fetch("/api/pets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPet),
      });

      if (response.ok) {
        const { pet: addedPet } = await response.json();
        setPets((prevPets) => [...prevPets, addedPet]);
        setNewPet({
          name: "",
          age: "",
          species: "",
          gender: "",
          breed: "",
          imageUrl: "",
          description: "",
          vaccinationStatus: "",
          status: "Available",
        });
      } else {
        alert("Failed to add pet.");
      }
    } catch (error) {
      console.error("Error adding pet:", error);
    }
  };

  // Handle editing an existing pet
  const handleEdit = (pet) => {
    setEditingPet({ ...pet }); // Create a copy to allow edits without mutating state
  };

  const handleSaveEdit = async () => {
    if (!editingPet) return;

    try {
      const response = await fetch(`/api/pets?id=${editingPet._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingPet),
      });

      if (response.ok) {
        setPets((prevPets) =>
          prevPets.map((pet) =>
            pet._id === editingPet._id ? editingPet : pet
          )
        );
        setEditingPet(null); // Exit editing mode
      } else {
        alert("Failed to update pet.");
      }
    } catch (error) {
      console.error("Error updating pet:", error);
    }
  };

  // Handle deleting a pet
  const handleDeletePet = async (id) => {
    try {
      // Delete the pet from the pets API
      const response = await fetch(`/api/pets?id=${id}`, { method: "DELETE" });
      if (response.ok) {
        // Update the pet state
        setPets((prevPets) => prevPets.filter((pet) => pet._id !== id));
  
        // Delete all favorites associated with this pet
        const favoritesResponse = await fetch(`/api/favorites`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ petId: id }),
        });
  
        if (!favoritesResponse.ok) {
          console.error("Failed to delete associated favorites");
        }
      } else {
        alert("Failed to delete pet.");
      }
    } catch (error) {
      console.error("Error deleting pet:", error);
    }
  };
  

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-[#8174A0]">Pet Management</h1>

      {/* Add New Pet */}
      <div className="mb-6 p-4 bg-white shadow-md rounded">
        <h2 className="text-lg font-bold mb-2 text-[#8174A0]">Add New Pet</h2>
        {Object.keys(newPet).map((key) => (
          key === "status" ? (
            <select
              key={key}
              value={newPet[key]}
              onChange={(e) => setNewPet({ ...newPet, [key]: e.target.value })}
              className="border p-2 text-black rounded mr-2 mb-2"
            >
              <option value="Available">Available</option>
              <option value="Adopted">Adopted</option>
            </select>
          ) : (
            <input
              key={key}
              type="text"
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              value={newPet[key]}
              onChange={(e) => setNewPet({ ...newPet, [key]: e.target.value })}
              className="border p-2 rounded mr-2 mb-2"
            />
          )
        ))}
        <button
          onClick={handleAdd}
          className="bg-[#FFC585] text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* Edit Pet */}
      {editingPet && (
        <div className="mb-6 p-4 bg-white shadow-md rounded">
          <h2 className="text-lg font-bold mb-2 text-[#8174A0]">Edit Pet</h2>
          {Object.keys(editingPet).map((key) => (
            key === "_id" ? (
              <input
                key={key}
                type="text"
                value={editingPet[key]}
                disabled // Make Pet ID non-editable
                className="border p-2 rounded mr-2 mb-2 bg-gray-200 cursor-not-allowed"
              />
            ) : key === "status" ? (
              <select
                key={key}
                value={editingPet[key]}
                onChange={(e) =>
                  setEditingPet({ ...editingPet, [key]: e.target.value })
                }
                className="border p-2 text-black rounded mr-2 mb-2"
              >
                <option value="Available">Available</option>
                <option value="Adopted">Adopted</option>
              </select>
            ) : (
              <input
                key={key}
                type="text"
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                value={editingPet[key]}
                onChange={(e) =>
                  setEditingPet({ ...editingPet, [key]: e.target.value })
                }
                className="border p-2 rounded mr-2 mb-2"
              />
            )
          ))}
          <button
            onClick={handleSaveEdit}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Save
          </button>
          <button
            onClick={() => setEditingPet(null)}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Pet List */}
      <table className="table-auto w-full shadow-md bg-white rounded border">
        <thead>
          <tr className="bg-[#FFC585]">
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Age</th>
            <th className="px-4 py-3">Species</th>
            <th className="px-4 py-3">Gender</th>
            <th className="px-4 py-3">Breed</th>
            <th className="px-4 py-3">Vaccination Status</th>
            <th className="px-4 py-3">Image</th>
            <th className="px-4 py-3">Adoption Status</th>
            <th className="px-4 py-3">Adoptionctions</th>
          </tr>
        </thead>
        <tbody>
          {pets.map((pet) => (
            <tr key={pet._id} className="border-t text-center">
              <td className="px-4 py-2 ">{pet.name}</td>
              <td className="px-4 py-2">{pet.age}</td>
              <td className="px-4 py-2">{pet.species}</td>
              <td className="px-4 py-2">{pet.gender}</td>
              <td className="px-4 py-2">{pet.breed}</td>
              <td className="px-4 py-2">{pet.vaccinationStatus}</td>
              <td className="px-4 py-2 items-center">
                <img src={pet.imageUrl} alt={pet.name} className="h-16 w-16 " />
              </td>
              <td className="px-4 py-2">{pet.adoptionStatus}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleEdit(pet)}
                  className="text-blue-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeletePet(pet._id)}
                  className="text-red-500 ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
