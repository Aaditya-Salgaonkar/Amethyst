import React from 'react'
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";

const LandingPage = () => {
  return (
   
          <>
          <Navbar />
          <div className="max-w-7xl mx-auto pt-20 px-6">
            <HeroSection />
            <FeaturesSection />
          </div>
        </>
      
    
  )
}

export default LandingPage
