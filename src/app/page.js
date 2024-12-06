
import  Hero  from "../../components/Hero";
import Navbar from "../../components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <Navbar/>

      <Hero/>
    </div>
    
  );
}
