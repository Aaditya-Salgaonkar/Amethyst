import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import About from "../components/About";
import Contact from "../components/Contact";

const LandingPage = () => {
  const tokenauth=false;
  return (
    <>
      <Navbar token={tokenauth} />
      <div className="max-w-7xl mx-auto pt-20 px-6 my-5">
        <div>
          <HeroSection />
        </div>
        <div id="features">
          <FeaturesSection />
        </div>
        <div id="about">
        <About />
        </div>
        <div id="contact">
        <Contact />
        </div>
        
     
        
      </div>
    </>
  );
};

export default LandingPage;
