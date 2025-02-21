import { Button } from "@mui/material";
import React from "react";
import { Box } from "@mui/material";
import { useNavigate,Link } from "react-router-dom";
import Home from "../components/Projects";

import { Padding } from "@mui/icons-material";
const home = ({ token }) => {
  const navigate = useNavigate();
  function handleLogout() {
    sessionStorage.removeItem("token");
    navigate("/");
  }
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "lightblue", 
        display: "flex",
        flexDirection:"column",
        alignItems: "center",
        
      }}
    >
      <Box sx={{flexDirection:'row', display:'flex', p:2, gap:5}}>
      <Box sx={{flexDirection:'row', display:'flex', p:2, gap:5}}>
      <Button 
      variant="contained" 
      color="primary" 
      href="/Dashboard" 
    >
      Dashboard
    </Button>
    <Button 
      variant="contained" 
      color="primary" 
      href="/Report" 
    >
      Report
    </Button>
    <Button 
      variant="contained" 
      color="primary" 
      href="/Projects" 
    >
      Projects
    </Button>
      
      </Box>
      </Box>
      <Box>
        Hi {token.user.user_metadata.fullname} !
      </Box>
      

      <Box sx={{p:3}}>
      <Button type="submit" variant="contained" onClick={handleLogout}>Logout</Button>
      </Box>
    </Box>
  );
};

export default home;
