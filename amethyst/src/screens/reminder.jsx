import {
  Box,
  Grid2,
  Chip,
  Stack,
  Typography,
  Paper,
  ThemeProvider,
  Button,
} from "@mui/material";
import React from "react";

import { theme } from "./Theme";

function calcDays(duedate) {
  const today = new Date();
  const due = new Date(duedate);
  const timeDiff = due - today;
  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
}

function getStatusColor(days) {
  if (days > 10) return "rgb(0, 255, 13)";
  if (days >= 4) return "rgb(255, 255, 0)";
  return "rgb(255, 0, 0)";
}
const fontSizes = {
  x15: "2rem",
  x12: "1.8rem",
  x10: "1.6rem",
  x76: "1.4rem",
  x64: "1.2rem",
  x45: "1.1rem",
  x30: "1rem",
  x20: "0.9rem",
};

const demoObj = [
  {
    name: "Project 1",
    duedate: "03/7/2025",
    status: "Pending",
    client: "John Doe",
  },
  {
    name: "Project 2",
    duedate: "12/15/2024",
    status: "Pending",
    client: "John Gullingham",
  },
  {
    name: "Project 3",
    duedate: "12/18/2024",
    status: "Completed",
    client: "Sommers Doe",
  },
  {
    name: "Project 4",
    duedate: "02/27/2025",
    status: "Pending",
    client: "Anna Smith",
  },
  {
    name: "Project 5",
    duedate: "12/25/2024",
    status: "Pending",
    client: "Mike Johnson",
  },
  {
    name: "Project 5",
    duedate: "12/25/2024",
    status: "Pending",
    client: "Mike Johnson",
  },
];

export default function Dashboard() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          display: "relative",
        }}
      >
        <Button
          sx={{
            position: "absolute",
            top: "5%",
            left: "5%",
            color: "white",
            backgroundColor: "rgb(255, 164, 72)",
          }}
          onClick={() => window.history.back()}
        >
          Back
        </Button>
        <Paper
          direction="column"
          elevation={24}
          sx={{
            position: "absolute",
            top: "8%",
            left: "14.5%",
            height: "85%",
            width: "70%",
            borderRadius: "20px",
            overflowY: "auto",
            padding: 2,
            boxShadow: "0px 0px 13px #f97316",
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
            animation: "scaleAnimation 2s infinite alternate ease-in-out",
            "@keyframes scaleAnimation": {
              "0%": {
                transform: "scale(1)",
              },
              "100%": {
                transform: "scale(1.01)",
              },
            },
          }}
        >
          {demoObj.map((project, index) => {
            const daysRemaining = calcDays(project.duedate);
            return (
              <Box
                key={index}
                sx={{
                  marginTop: "20px",
                  backgroundColor: "rgb(39, 39, 39)",
                  display: "flex",
                  alignItems: "center",
                  height: "20%",
                  width: "100%",
                  borderRadius: "15px",
                  overflow: "hidden",
                }}
              >
                <Grid2
                  container
                  sx={{
                    height: "100%",
                    width: "100%",
                    borderRadius: "inherit",
                  }}
                >
                  <Grid2
                    item
                    size={7}
                    sx={{
                      borderTopLeftRadius: "inherit",
                      borderBottomLeftRadius: "inherit",
                    }}
                  >
                    <Stack
                      direction={"column"}
                      spacing={1}
                      sx={{
                        height: "100%",
                        width: "100%",
                        padding: 2,
                        pl: 6,
                      }}
                    >
                      <Typography fontWeight={"bold"} variant="h6">
                        {project.name}
                      </Typography>

                      <Typography mb={1} fontWeight={"bold"}>
                        {project.client}
                      </Typography>

                      <Typography fontWeight={500}>
                        you have {daysRemaining} days remaining
                      </Typography>
                    </Stack>
                  </Grid2>
                  <Grid2
                    item
                    size={5}
                    sx={{
                      borderTopRightRadius: "inherit",
                      borderBottomRightRadius: "inherit",
                    }}
                  >
                    <Stack
                      direction={"column"}
                      spacing={{ x45: 2, x15: 5 }}
                      sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-end",

                        pr: {
                          x76: 2,
                          x45: 4,
                          x30: 6,
                          x20: 8,
                          x15: 9,
                          x12: 9,
                          x10: 9,
                        },
                      }}
                    >
                      <Typography fontWeight="bold" color="rgb(163, 163, 163)">
                        {project.duedate}
                      </Typography>
                      <Chip
                        size="small"
                        sx={{
                          color:
                            getStatusColor(daysRemaining) ===
                              "rgb(0, 255, 13)" ||
                            getStatusColor(daysRemaining) === "rgb(255, 255, 0)"
                              ? " rgb(39, 39, 39)"
                              : "white",
                          fontWeight: "bold",
                          backgroundColor: getStatusColor(daysRemaining),
                        }}
                        label={project.status}
                      />
                    </Stack>
                  </Grid2>
                </Grid2>
              </Box>
            );
          })}
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
