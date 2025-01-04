"use client";

import { useState, useEffect } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Sidebar from "./components/Sidebar";
import PetManagement from "./components/PetManagement";
import UserManagement from "./components/UserManagement";
import QuestionManagement from "./components/QuestionManagement";
import AdoptionApplications from "./components/AdoptionApplications";
import LoadingSpinner from "../../../components/LoadingSpinner"; // Assume you have this component

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("pets");
  const { isLoaded, userId } = useAuth();
  const { user, isLoaded: isUserLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push("/sign-in"); // Redirect to sign-in page if not authenticated
    } else if (isUserLoaded && user && user.publicMetadata.role !== "admin") {
      router.push("/forbidden");
    }
  }, [isLoaded, userId, isUserLoaded, user, router]);

  // Show loading state while authentication or user data is being fetched
  if (!isLoaded || !isUserLoaded) {
    return <LoadingSpinner />;
  }

  // If there's no user or the user is not an admin, don't render the dashboard
  if (!user || user.publicMetadata.role !== "admin") {
    return null; // This will prevent the dashboard from flashing before redirect
  }

  const renderContent = () => {
    switch (activeSection) {
      case "pets":
        return <PetManagement />;
      case "users":
        return <UserManagement />;
      case "questions":
        return <QuestionManagement />;
      case "adoptions":
        return <AdoptionApplications />;
      default:
        return <PetManagement />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F1DBE2]">
      {/* Sidebar */}
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      {/* Main Content */}
      <div className="w-4/5 p-6">{renderContent()}</div>
    </div>
  );
}

