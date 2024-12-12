import { notFound } from "next/navigation";

async function fetchPetDetails(id) {
  try {
    // Determine if running on server or client
    const isServer = typeof window === "undefined";

    // Construct the base URL dynamically
    const baseUrl = isServer
      ?  "http://localhost:3000" || process.env.NEXT_PUBLIC_BASE_URL 
      : ""; 

    const res = await fetch(`${baseUrl}/api/pets?id=${id}`);
    if (!res.ok) throw new Error("Failed to fetch pet details");
    return res.json();
  } catch (error) {
    console.error("Error fetching pet details:", error);
    return null;
  }
}



export default async function PetDetailsPage({ params }) {
  const { id } = params; // Destructure the dynamic route parameter
  const pet = await fetchPetDetails(id);

  if (!pet) {
    notFound(); // Render 404 page if no pet is found
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{pet.name}</h1>
      <img
        src={pet.imageUrl}
        alt={pet.name}
        className="w-full h-auto rounded-lg shadow-lg"
      />
      <div className="mt-4">
        <p><strong>Age:</strong> {pet.age}</p>
        <p><strong>Species:</strong> {pet.species}</p>
        <p><strong>Gender:</strong> {pet.gender}</p>
        <p><strong>Breed:</strong> {pet.breed}</p>
        <p><strong>Description:</strong> {pet.description}</p>
      </div>
    </div>
  );
}
