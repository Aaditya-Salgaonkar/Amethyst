import { Button } from "@mui/material";
import React from "react";
import { Box } from "@mui/material";
import HomeNavbar from "../components/HomeNavbar";
import HomeSidebar from "../components/HomeSidebar";

const Home = ({ token }) => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: " #262626",
      }}
    >
      <HomeNavbar token={token}></HomeNavbar>
    </Box>
  );
};

export default Home;
