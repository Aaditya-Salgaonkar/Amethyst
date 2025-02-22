import React from "react";
import { Box, ThemeProvider } from "@mui/material";
import { theme } from "../components/Theme";
import ProjectForm from "../components/ProjectForm";
export default function ProjectCreate() {
  return (
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
        <ProjectForm createOupdate="Create" />
      </Box>
    </ThemeProvider>
  );
}
