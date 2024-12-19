import { notFound } from "next/navigation";


async function fetchUserDetails(id) {
  try {
    // Determine if running on server or client
    const isServer = typeof window === "undefined";

    // Construct the base URL dynamically
    const baseUrl = isServer
      ? "http://localhost:3000" || process.env.NEXT_PUBLIC_BASE_URL
      : ""; // Empty string for relative paths in the browser

    const res = await fetch(`http://localhost:3000/api/user?id=${id}`);
    if (!res.ok) throw new Error("Failed to fetch user details");
    return res.json();
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null;
  }
}

export default async function UserDetailsPage({ params }) {
  const resolvedParams = await params; // params is resolved first
  const { id } = resolvedParams; // 
  const user = await fetchUserDetails(id);

  if (!user) {
    notFound(); // Render 404 page if no user is found
  }

  return (
    <div>
      <h1>User Details</h1>
      <p><strong>First Name:</strong> {user.firstName}</p>
      <p><strong>Last Name:</strong> {user.lastName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <img
        src={user.imageUrl}
        alt={`${user.firstName}'s profile`}
        width={100}
      />
      <p><strong>Clerk User ID:</strong> {user.clerkUserId}</p>
      <p><strong>Created At:</strong> {new Date(user.createdAt).toLocaleString()}</p>
      <p><strong>Updated At:</strong> {new Date(user.updatedAt).toLocaleString()}</p>
    </div>
  );
}
