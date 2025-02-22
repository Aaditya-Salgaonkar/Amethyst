import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import logo from '../assets/logo.png';
import GithubLogo from '../assets/githublogo.png';
import { theme } from "./Theme";
import { ThemeProvider } from "@mui/material";

const SideNavBar = () => {
  return (
    <ThemeProvider theme={theme}>
    <div >
      <div className="absolute top-22 left-0 w-80 h-screen text-white bg-zinc-900  rounded-r-2xl shadow-lg shadow-orange-500 ">
        <div className="py-10 flex flex-col justify-between items-center w-full h-full">
          <div className="mt-8 mb-5 h-24 w-24 rounded-full bg-yellow-50 border-4 border-green-400">
            <img src={GithubLogo} alt="Profile Picture" className="h-full w-full rounded-full" />
          </div>

          <div>
            <Link to="/addexpense">
              <h1 className="text-xl bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text cursor-pointer hover:text-white">
                ADD AN EXPENSE
              </h1>
            </Link>
          </div>
          <div>
            {/*OTHER TEXT NEED TO BE CONFIGURED FOR ADDING LINKS*/ }
            <Link to="/edit-project">
              <h1 className="text-xl bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text cursor-pointer hover:text-white">
                EDIT PROJECT
              </h1>
            </Link>
          </div>
          <div>
            <Link to="/viewexpenses">
              <h1 className="text-xl bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text cursor-pointer hover:text-white">
                VIEW EXPENSES
              </h1>
            </Link>
          </div>
          <div>
            <h1 className="text-xl bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text hover:text-white">
              ABOUT US
            </h1>
          </div>

          <div className="flex flex-row justify-between gap-4 items-center">
            <div className="h-10 w-10">
              <img src={logo} alt="Logo" />
            </div>
            <h1 className="text-xl">
              WorkSphere
            </h1>
          </div>
        </div>
      </div>
    </div>
    </ThemeProvider>
  );
};

export default SideNavBar;
