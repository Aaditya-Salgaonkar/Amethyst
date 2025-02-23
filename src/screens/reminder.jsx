import {
  Box,
  Paper,
  Chip,
  Stack,
  Typography,
  CircularProgress,
  ThemeProvider,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { theme } from "../components/Theme";
import { supabase } from "../client";
import HomeNavbar from "../components/HomeNavbar";

const calcDays = (duedate) => {
  const today = new Date();
  const due = new Date(duedate);
  const timeDiff = due - today;
  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
};

const getStatusColor = (days, isCompleted) => {
  if (isCompleted) return "#2196F3"; // Blue for completed
  if (days > 10) return "#4CAF50"; // Green for ample time
  if (days >= 4) return "#FF9800"; // Orange for approaching deadline
  return "#F44336"; // Red for urgent
};

const fetchProjectsWithClientData = async (freelancerId) => {
  try {
    const { data: projects, error } = await supabase
      .from("projects")
      .select("name, status, due_date, client_id")
      .eq("freelancerId", freelancerId);

    if (error) {
      console.error("Error fetching projects:", error.message);
      return [];
    }

    return await Promise.all(
      projects.map(async (project) => {
        let clientName = "Unknown";

        if (project.client_id) {
          const { data: client, error: clientError } = await supabase
            .from("clients")
            .select("name")
            .eq("id", project.client_id)
            .single();

          if (!clientError && client) clientName = client.name;
        }

        return {
          projectName: project.name,
          endDate: project.due_date,
          clientName,
          isCompleted: project.status, // Using boolean for status
        };
      })
    );
  } catch (error) {
    console.error("Unexpected error:", error.message);
    return [];
  }
};

export default function Reminder({ uuid, token }) {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [freelancerName, setFreelancerName] = useState("Freelancer");

  useEffect(() => {
    const fetchFreelancerName = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (user) setFreelancerName(user.email || "Freelancer");
        if (error) console.error("Error fetching freelancer name:", error.message);
      } catch (error) {
        console.error("Unexpected error fetching freelancer name:", error.message);
      }
    };
    fetchFreelancerName();
  }, []);

  useEffect(() => {
    const loadProjects = async () => {
      if (uuid) {
        setLoading(true);
        const fetchedProjects = await fetchProjectsWithClientData(uuid);
        setProjects(fetchedProjects);
        setLoading(false);
      }
    };
    loadProjects();
  }, [uuid]);

  return (
    <div>
      <HomeNavbar token={token} freelancerName={freelancerName} />
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "#121212", // Dark background
            py: 4,
          }}
        >
          <Paper
            elevation={10}
            sx={{
              width: "80%",
              maxWidth: 900,
              p: 4,
              borderRadius: "20px",
              bgcolor: "rgba(255, 255, 255, 0.1)", // Glassmorphism
              backdropFilter: "blur(10px)",
              color: "white",
              boxShadow: "0px 4px 20px rgba(255, 140, 0, 0.2)",
            }}
          >
            <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
              Project Deadlines
            </Typography>

            {loading ? (
              <Box display="flex" justifyContent="center" alignItems="center" height={200}>
                <CircularProgress color="secondary" />
              </Box>
            ) : (
              projects.map((project, index) => {
                const daysRemaining = calcDays(project.endDate);
                const statusColor = getStatusColor(daysRemaining, project.isCompleted);

                return (
                  <Paper
                    key={index}
                    elevation={4}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      my: 2,
                      p: 3,
                      borderRadius: "12px",
                      transition: "transform 0.3s ease-in-out",
                      bgcolor: "#1E1E1E",
                      "&:hover": { transform: "scale(1.02)", boxShadow: "0px 4px 10px rgba(255, 140, 0, 0.3)" },
                    }}
                  >
                    <Stack spacing={1}>
                      <Typography variant="h6" fontWeight="bold" color="white">
                        {project.projectName}
                      </Typography>
                      <Typography variant="subtitle2" color="gray">
                        Client: {project.clientName}
                      </Typography>
                      <Typography variant="body2" color="white">
                        {daysRemaining > 0
                          ? `You have ${daysRemaining} days remaining`
                          : "Deadline has passed!"}
                      </Typography>
                    </Stack>

                    <Stack alignItems="flex-end">
                      <Typography variant="body2" color="gray">
                        Due: {project.endDate}
                      </Typography>
                      <Chip
                        label={project.isCompleted ? "COMPLETED" : "PENDING"}
                        sx={{
                          fontWeight: "bold",
                          color: statusColor === "#FFC107" ? "#000" : "#FFF",
                          bgcolor: statusColor,
                          mt: 2,
                        }}
                      />
                    </Stack>
                  </Paper>
                );
              })
            )}
          </Paper>
        </Box>
      </ThemeProvider>
    </div>
  );
}
