import React, { useState } from "react";
import logo from '../assets/logo.png'
import { Menu, X } from 'lucide-react'


const Navbar = () => {
    const[mobileDrawerOpen,setMobileDrawerOpen]=useState(false);
    const toggleNavBar = ()=>{
        setMobileDrawerOpen(!mobileDrawerOpen)

    };
  return (
    
      <nav className=" sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
        <div className="container px-4 mx-auto relative text-sm">
            <div className="flex justify-between items-center">
                <div className="flex items-center flex-shrink-0">
                    <img className="h-10 w-10 mr-2" src={logo} alt="logo" />
                    <span className="text-xl tracking-tighter">WorkSphere</span>
                </div>
                <ul className="hidden lg:flex ml-14 space-x-12">
                    <a href="">Features</a>
                    <a href="">About</a>
                    <a href="">Contact</a>
                </ul>
                <div className="hidden lg:flex justify-center space-x-12 items-center">
                    <a href="login" className="px-3 py-2 border rounded-md">
                        Log in
                    </a>
                    <a href="signup"  className="bg-gradient-to-r from-orange-500 to-orange-800 px-3 py-2 border rounded-md">
                        Create an Account
                    </a>
                </div>
                <div className="lg:hidden md:flex flex-col justify-end">
                    <button onClick={toggleNavBar}>
                        {
                            mobileDrawerOpen?<X />:<Menu />
                        }
                    </button>
                </div>
            </div>
            
        </div>
      </nav>
    
  );
};

export default Navbar;
