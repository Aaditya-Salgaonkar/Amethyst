import React from "react";
import { Container, ThemeProvider } from "@mui/material";
import { theme } from "./Theme";
import Report from "./Report";

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: " rgb(231, 243, 253)",
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

// {
//   "projectNo": <number>,              // Unique identifier for the project
//   "projName": "<string>",              // Name of the project (e.g., "Greninja")
//   "projBudget": <number>,             // Total budget allocated for the project
//   "projSpent": <number>,              // Total amount spent on the project
//   "projItems": [                      // Array of project items within the project
//     {
//       "id": <number>,                  // Unique identifier for the item
//       "itemName": "<string>",           // Name of the project item (e.g., "Mobile App")
//       "budget": <number>,              // Budget allocated for this item
//       "spent": <number>                // Amount spent on this specific item
//       "iconColor": "<string>"        // Optional: You can specify the color for each item
//       "prgress": <number>            //Indicating progress of task
//     }
//     .
//     .
//     .
//   ]
// }

// Define color variables
const lightYellow = "#FFEB3B"; // Brighter Yellow
const lightRed = "#FF5252"; // Brighter Red
const lightGreen = "#66BB6A"; // Brighter Green
const lightGrey = "#B0BEC5"; // Brighter Grey

const demoProjects = [
  {
    projectNo: 1,
    projName: "Finance management",
    projBudget: 1200,
    projSpent: 800,
    projItems: [
      {
        id: 1,
        itemName: "Mobile App",
        budget: 200,
        spent: 50,
        iconColor: lightYellow,
        progress: Math.floor(Math.random() * 100),
      },
      {
        id: 2,
        itemName: "Website Development",
        budget: 300,
        spent: 150,
        iconColor: lightRed,
        progress: Math.floor(Math.random() * 100),
      },
      {
        id: 3,
        itemName: "Marketing",
        budget: 150,
        spent: 100,
        iconColor: lightGreen,
        progress: Math.floor(Math.random() * 100),
      },
    ],
  },

  {
    projectNo: 2,
    projName: "Tech Innovations",
    projBudget: 5000,
    projSpent: 3200,
    projItems: [
      {
        id: 1,
        itemName: "Mobile App",
        budget: 1000,
        spent: 500,
        iconColor: lightGrey,
        progress: Math.floor(Math.random() * 100),
      },
      {
        id: 2,
        itemName: "Backend Infrastructure",
        budget: 1200,
        spent: 1100,
        iconColor: lightGreen,
        progress: Math.floor(Math.random() * 100),
      },
      {
        id: 3,
        itemName: "Customer Support",
        budget: 800,
        spent: 600,
        iconColor: lightRed,
        progress: Math.floor(Math.random() * 100),
      },
      {
        id: 4,
        itemName: "QA Testing",
        budget: 1000,
        spent: 500,
        iconColor: lightYellow,
        progress: Math.floor(Math.random() * 100),
      },
    ],
  },

  {
    projectNo: 3,
    projName: "NextGen AI",
    projBudget: 7500,
    projSpent: 6200,
    projItems: [
      {
        id: 1,
        itemName: "AI Model Training",
        budget: 3000,
        spent: 2500,
        iconColor: lightGreen,
        progress: Math.floor(Math.random() * 100),
      },
      {
        id: 2,
        itemName: "Cloud Computing",
        budget: 2000,
        spent: 1700,
        iconColor: lightRed,
        progress: Math.floor(Math.random() * 100),
      },
      {
        id: 3,
        itemName: "Data Collection",
        budget: 1000,
        spent: 700,
        iconColor: lightYellow,
        progress: Math.floor(Math.random() * 100),
      },
      {
        id: 4,
        itemName: "Research & Development",
        budget: 1500,
        spent: 1300,
        iconColor: lightGrey,
        progress: Math.floor(Math.random() * 100),
      },
    ],
  },

  {
    projectNo: 4,
    projName: "Smart Home Project",
    projBudget: 2500,
    projSpent: 1400,
    projItems: [
      {
        id: 1,
        itemName: "Smart Lights",
        budget: 500,
        spent: 200,
        iconColor: lightYellow,
        progress: Math.floor(Math.random() * 100),
      },
      {
        id: 2,
        itemName: "Security System",
        budget: 1000,
        spent: 700,
        iconColor: lightRed,
        progress: Math.floor(Math.random() * 100),
      },
      {
        id: 3,
        itemName: "Smart Thermostat",
        budget: 800,
        spent: 500,
        iconColor: lightGreen,
        progress: Math.floor(Math.random() * 100),
      },
    ],
  },

  {
    projectNo: 5,
    projName: "E-commerce Platform",
    projBudget: 10000,
    projSpent: 4500,
    projItems: [
      {
        id: 1,
        itemName: "Website Development",
        budget: 3000,
        spent: 1200,
        iconColor: lightGrey,
        progress: Math.floor(Math.random() * 100),
      },
      {
        id: 2,
        itemName: "Payment Gateway Integration",
        budget: 1500,
        spent: 900,
        iconColor: lightRed,
        progress: Math.floor(Math.random() * 100),
      },
      {
        id: 3,
        itemName: "Product Database",
        budget: 2000,
        spent: 1300,
        iconColor: lightGreen,
        progress: Math.floor(Math.random() * 100),
      },
      {
        id: 4,
        itemName: "Customer Service System",
        budget: 2500,
        spent: 1100,
        iconColor: lightYellow,
        progress: Math.floor(Math.random() * 100),
      },
      {
        id: 5,
        itemName: "Marketing Campaign",
        budget: 1000,
        spent: 500,
        iconColor: lightRed,
        progress: Math.floor(Math.random() * 100),
      },
    ],
  },
];

export default function HomePage() {
  return (
    <ThemeProvider theme={theme}>
      <Container disableGutters sx={containerStyle}>
        <Report projects={demoProjects} />
      </Container>
    </ThemeProvider>
  );
}