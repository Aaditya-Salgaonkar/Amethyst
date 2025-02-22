import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import HomeNavbar from "../components/HomeNavbar";
// import Dashboard from "../components/Dashboard";
import Dashboard from "./Dashboard";


const Home = ({ token }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "#262626",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundColor: "#262626",
          paddingBottom: 20,
        }}
      >
        <Dashboard token={token} />
      </Box>
    </Box>
  );
};

export default Home;
