import React from "react";
import { Box, ThemeProvider } from "@mui/material";
import { theme } from "../components/Theme";
import ProjectForm from "../components/ProjectForm";
import HomeNavbar from "../components/HomeNavbar";
export default function ProjectCreate({token}) {
  return (
   <div>
     <HomeNavbar token={token}/>
    <ThemeProvider theme={theme}>
      
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >

        <ProjectForm createOupdate="Create" token={token} />
      </Box>
    </ThemeProvider>
   </div>
  );
}
