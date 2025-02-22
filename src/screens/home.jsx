import { Button } from "@mui/material";
import React from "react";
import { Box } from "@mui/material";
import HomeNavbar from "../components/HomeNavbar";
import HomeSidebar from "../components/HomeSidebar";
import Dashboard from "../components/Dashboard";

const Home = ({ token }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: " #262626",
        
      }}
    >
      <HomeNavbar token={token}></HomeNavbar>
      <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: " #262626",
        paddingBottom:20
      }}
      >
      <Dashboard/>
      </Box>
    </Box>
  );
};

export default Home;
