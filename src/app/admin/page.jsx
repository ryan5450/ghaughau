"use client";

import { useState, useEffect } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Sidebar from "../admin/components/Sidebar";
import PetManagement from "../admin/components/PetManagement";
import UserManagement from "../admin/components/UserManagement";
import QuestionManagement from "./components/QuestionManagement";
import AdoptionApplications from "../admin/components/AdoptionApplications";

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("pets");
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {


    if (user && user.publicMetadata.role !== "admin") {
      router.push("/forbidden");
    }
  }, [isSignedIn, user, router]);

  // Loading state while user data is fetched
  if (!user) {
    return <p>Loading...</p>;
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
