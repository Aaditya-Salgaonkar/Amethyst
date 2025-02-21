import React, { useRef } from "react";
import {
  Box,
  Container,
  Divider,
  Grid2,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { theme } from "../components/Theme";
import ProjectForm from "../components/ProjectForm";

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  padding: "0px",
  position: "relative",
  maxWidth: {
    x15: "1530px",
    x12: "1424px",
    x10: "1170px",
    x76: "910px",
    x64: "655px",
    x45: "530px",
    x30: "380px",
    x20: "100%",
  },
};

const demoObject = [
  {
    projectName: "E-commerce Website",
    startDate: "2023-06-15",
    endDate: "2023-12-20",
    totalBudget: "50000",
    paymentDate: "2023-12-25",
    clientName: "ABC Retail Ltd.",
    subtasks: ["Design", "Development", "Testing"],
  },
  {
    projectName: "Mobile Banking App",
    startDate: "2023-07-01",
    endDate: "2024-02-10",
    totalBudget: "75000",
    paymentDate: "2024-02-15",
    clientName: "XYZ Bank",
    subtasks: ["Backend Setup", "UI/UX", "Security Testing"],
  },
  {
    projectName: "Healthcare Portal",
    startDate: "2023-08-10",
    endDate: "2024-03-05",
    totalBudget: "60000",
    paymentDate: "2024-03-10",
    clientName: "MediCare Solutions",
    subtasks: ["Database Design", "API Integration", "User Testing"],
  },
  {
    projectName: "AI Chatbot Integration",
    startDate: "2023-09-05",
    endDate: "2024-04-01",
    totalBudget: "45000",
    paymentDate: "2024-04-05",
    clientName: "Tech Innovators Inc.",
    subtasks: ["NLP Model", "Backend Integration", "Deployment"],
  },
  {
    projectName: "Inventory Management System",
    startDate: "2023-10-12",
    endDate: "2024-05-15",
    totalBudget: "55000",
    paymentDate: "2024-05-20",
    clientName: "Global Logistics",
    subtasks: ["Requirement Analysis", "Prototype", "Final Testing"],
  },
  {
    projectName: "Online Learning Platform",
    startDate: "2023-11-20",
    endDate: "2024-06-30",
    totalBudget: "70000",
    paymentDate: "2024-07-05",
    clientName: "EduTech Academy",
    subtasks: ["Video Streaming", "Quiz System", "Progress Tracking"],
  },
  {
    projectName: "CRM Software Development",
    startDate: "2023-12-01",
    endDate: "2024-08-10",
    totalBudget: "65000",
    paymentDate: "2024-08-15",
    clientName: "NextGen Enterprises",
    subtasks: ["Lead Management", "Automation", "Reports Dashboard"],
  },
  {
    projectName: "Hotel Booking System",
    startDate: "2024-01-15",
    endDate: "2024-09-20",
    totalBudget: "80000",
    paymentDate: "2024-09-25",
    clientName: "Luxury Stays",
    subtasks: ["Room Availability", "Payment Gateway", "User Reviews"],
  },
];

const CustomCard = ({ project, change }) => {
  return (
    <Box
      onClick={() => {
        change(project);
      }}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "22.5vh",
        width: "20vw",
        ml: "auto",
        mr: "auto",
        marginTop: "15px",
        background:
          "linear-gradient(45deg, #ff7d1a 10%, #f97316 30%,  #ea580c 50%, #dc4b0c 70%, #c2410c 90%)",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(255, 115, 0, 0.3)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0px 6px 15px rgba(255, 115, 0, 0.6)",
        },
        "&:active": {
          transform: "scale(0.95)",
          boxShadow: "0px 2px 5px rgba(255, 115, 0, 0.7)",
        },
      }}
    >
      <Typography
        variant="h6"
        sx={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: "80%",
          color: "#fff",
        }}
      >
        {project.projectName}
      </Typography>
      <Divider sx={{ width: "80%", backgroundColor: "white" }} />
      <Typography
        variant="body2"
        sx={{
          marginTop: "5%",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: "90%",
          color: "#fff",
        }}
      >
        Client: {project.clientName}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          whiteSpace: "nowrap",
          marginTop: "4%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: "90%",
          color: "#fff",
        }}
      >
        Start Date: {project.startDate}
      </Typography>
    </Box>
  );
};

export default function UpdateProject() {
  const projectFormRef = useRef(null);

  const handleProjectSelect = (project) => {
    if (projectFormRef.current) {
      projectFormRef.current.updateFormData(project);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container sx={containerStyle}>
          <Grid2 container sx={{ height: "100vh", width: "100%" }}>
            <Grid2
              item
              size={3}
              sx={{
                maxHeight: "100vh",
                overflowY: "auto",
                "&::-webkit-scrollbar": {
                  width: "6px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "primary.main",
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-track": {
                  background: " #f1f1f1",
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  backgroundColor: "secondary.main",
                },
              }}
            >
              {demoObject.map((project, index) => (
                <CustomCard
                  key={index}
                  project={project}
                  change={handleProjectSelect}
                />
              ))}
            </Grid2>
            <Grid2 item size={9}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  width: "100%",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    borderRadius: "40px",
                    width: "75%",
                    height: "94%",
                    backgroundColor: "rgba(226, 107, 22, 0.5)",
                    position: "absolute",
                    top: "2.85%",
                    left: "12.5%",
                    zIndex: "0",
                  }}
                ></Box>
                <ProjectForm
                  width={"80%"}
                  ref={projectFormRef}
                  createOupdate="Update"
                />
              </Box>
            </Grid2>
          </Grid2>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
