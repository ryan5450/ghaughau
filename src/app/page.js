import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar2 from "../../components/Navbar2";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Navbar2/>
      <Hero/>
    </div>
    
  );
}
