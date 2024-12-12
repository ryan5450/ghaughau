import Link from "next/link"; // Adjust for your routing framework


const PetCard = ({ id,name, age, imageUrl, species, gender, breed }) => {
  return (
    <Link href={`/pets/${id}`} passHref>
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-sm mx-auto">
      {/* Pet Image */}
      <div className="h-48 w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={`${name} - ${species}`}
          className="w-full h-full object-cover"
        />
      </div>
      {/* Pet Details */}
      <div className="p-4 text-[#4A4A4A] font-sans">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm">Age: {age}</p>
        <p className="text-sm capitalize">Species: {species}</p>
        <p className="text-sm capitalize">Gender: {gender}</p>
        <p className="text-sm capitalize">Breed: {breed}</p>
      </div>
    </div>
    </Link>
  );
};

export default PetCard;
