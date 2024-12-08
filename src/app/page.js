import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import Navbar2 from "../../components/Navbar2";
import Footer from "../../components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      <Navbar2/>
      <Hero/>
      <Footer/>
    </div>
    
  );
}
