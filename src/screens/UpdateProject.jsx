import React, { useState, useEffect } from "react";
import { Select, MenuItem, FormControl } from "@mui/material";
import Spinner from "../components/Spinner";
import {
  Paper,
  TextField,
  Button,
  IconButton,
  Stack,
  Box,
  Container,
  Divider,
  Grid2,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { theme } from "../components/Theme";
import { Add, Remove } from "@mui/icons-material";
import {
  commonGridItemStyles,
  commonInputStyles,
} from "../components/ProjectForm";
import { supabase } from "../client";

import { useNavigate } from "react-router-dom";
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



const fetchProjectsWithClientData = async (freelancerId) => {
  try {
    const { data: projects, error: projectError } = await supabase
      .from("projects")
      .select(
        "p_id, name, start_date, status, due_date, budget_allocated, paymentDate, payment_status, subtasks, client_id"
      )
      .eq("freelancerId", freelancerId);

    if (projectError) {
      console.error("Error fetching projects:", projectError.message);
      return [];
    }

    const projectsWithClientData = await Promise.all(
      projects.map(async (project) => {
        let clientName = "";

        if (project.client_id) {
          const { data: client, error: clientError } = await supabase
            .from("clients")
            .select("name")
            .eq("id", project.client_id)
            .single();

          if (clientError) {
            console.error(
              `Error fetching client for project ${project.p_id}:`,
              clientError.message
            );
          } else {
            clientName = client.name;
          }
        }

        return {
          projectId: project.p_id,
          projectName: project.name,
          startDate: project.start_date,
          endDate: project.due_date,
          totalBudget: project.budget_allocated?.toString() || "0",
          paymentDate: project.paymentDate,
          clientName: clientName || "Unknown",
          paymentStatus: project.payment_status,
          status: project.status,
          subtasks: Array.isArray(project.subtasks) 
  ? project.subtasks.map((task) => task.name) 
  : typeof project.subtasks === "string" 
  ? JSON.parse(project.subtasks).map((task) => task.name) 
  : [],

        };
      })
    );

    return projectsWithClientData;
  } catch (error) {
    console.error("Unexpected error:", error.message);
    return [];
  }
};

// const demoObject = [
//   {
//     projectId: "",
//     projectName: "E-commerce Website",
//     startDate: "2023-06-15",
//     endDate: "2023-12-20",
//     totalBudget: "50000",
//     paymentDate: "2023-12-25",
//     clientName: "ABC Retail Ltd.",
//     paymentStatus: true,
//     subtasks: ["Design", "Development", "Testing"],
//   },
//   {
//     projectId: "",
//     projectName: "Mobile Banking App",
//     startDate: "2023-07-01",
//     endDate: "2024-02-10",
//     totalBudget: "75000",
//     paymentDate: "2024-02-15",
//     clientName: "XYZ Bank",
//     paymentStatus: true,
//     subtasks: ["Backend Setup", "UI/UX", "Security Testing"],
//   },
//   {
//     projectId: "",
//     projectName: "Healthcare Portal",
//     startDate: "2023-08-10",
//     endDate: "2024-03-05",
//     totalBudget: "60000",
//     paymentDate: "2024-03-10",
//     clientName: "MediCare Solutions",
//     paymentStatus: true,
//     subtasks: ["Database Design", "API Integration", "User Testing"],
//   },
//   {
//     projectId: "",
//     projectName: "AI Chatbot Integration",
//     startDate: "2023-09-05",
//     endDate: "2024-04-01",
//     totalBudget: "45000",
//     paymentDate: "2024-04-05",
//     clientName: "Tech Innovators Inc.",
//     paymentStatus: true,
//     subtasks: ["NLP Model", "Backend Integration", "Deployment"],
//   },
//   {
//     projectId: "",
//     projectName: "Inventory Management System",
//     startDate: "2023-10-12",
//     endDate: "2024-05-15",
//     totalBudget: "55000",
//     paymentDate: "2024-05-20",
//     clientName: "Global Logistics",
//     paymentStatus: true,
//     subtasks: ["Requirement Analysis", "Prototype", "Final Testing"],
//   },
//   {
//     projectId: "",
//     projectName: "Online Learning Platform",
//     startDate: "2023-11-20",
//     endDate: "2024-06-30",
//     totalBudget: "70000",
//     paymentDate: "2024-07-05",
//     clientName: "EduTech Academy",
//     paymentStatus: true,
//     subtasks: ["Video Streaming", "Quiz System", "Progress Tracking"],
//   },
//   {
//     projectId: "",
//     projectName: "CRM Software Development",
//     startDate: "2023-12-01",
//     endDate: "2024-08-10",
//     totalBudget: "65000",
//     paymentDate: "2024-08-15",
//     clientName: "NextGen Enterprises",
//     paymentStatus: true,
//     subtasks: ["Lead Management", "Automation", "Reports Dashboard"],
//   },
//   {
//     projectId: "",
//     projectName: "Hotel Booking System",
//     startDate: "2024-01-15",
//     endDate: "2024-09-20",
//     totalBudget: "80000",
//     paymentDate: "2024-09-25",
//     clientName: "Luxury Stays",
//     paymentStatus: true,
//     subtasks: ["Room Availability", "Payment Gateway", "User Reviews"],
//   },
// ];

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

export default function UpdateProject({uuid}) {
const navigate=useNavigate();
  const [loading, setLoading] = useState(false)
  const [projects, setProjects] = useState([])
  const [project, setProject] = useState({
    projectId: "",
    projectName: "",
    startDate: "",
    endDate: "",
    totalBudget: "",
    paymentDate: "",
    clientName: "",
    status: false,
    paymentStatus: false,
    subtasks: [""],
  });

  const loadProjects = async () => {
    if (uuid) {
      setLoading(true)
      const fetchedProjects = await fetchProjectsWithClientData(uuid);
      setProjects(fetchedProjects);
      setLoading(false)
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);


  const handleUpdateProject = async () => {
    try {
      const updatedProjectPayload = {
        name: project.projectName,
        start_date: project.startDate || null,
        due_date: project.endDate || null,
        budget_allocated: project.totalBudget ? parseFloat(project.totalBudget) : null,
        "paymentDate": project.paymentDate || null,
        payment_status: !!project.paymentStatus,
        status: project.status,
        subtasks: JSON.stringify(project.subtasks.map((task) => ({ name: task, status: 0 }))),
      };
      {
        console.log(project)
      }
      const { error } = await supabase
        .from("projects")
        .update(updatedProjectPayload)
        .eq("p_id", project.projectId);
  
      if (error) {
        alert("Error updating project: " + error.message);
      } else {
        alert("Project updated successfully!");
        navigate(-1)
        setProject({
          projectId: "",
          projectName: "",
          startDate: "",
          endDate: "",
          totalBudget: "",
          paymentDate: "",
          clientName: "",
          paymentStatus: false,
          status: false,
          subtasks: [""],
        })
        loadProjects();
      }
    } catch (error) {
      alert("Unexpected error: " + error.message);
    }
  };
  


  const handleChange = (e, index = null) => {
    const { name, value } = e.target;
    if (index !== null) {
      const updatedSubtasks = [...project.subtasks];
      updatedSubtasks[index] = value;
      setProject((prev) => ({ ...prev, subtasks: updatedSubtasks }));
    } else {
      setProject((prev) => ({ ...prev, [name]: value }));
    }
  };

  const addSubtask = () => {
    setProject((prev) => ({ ...prev, subtasks: [...prev.subtasks, ""] }));
  };

  const removeSubtask = (index) => {
    const updatedSubtasks = project.subtasks.filter((_, i) => i !== index);
    setProject((prev) => ({ ...prev, subtasks: updatedSubtasks }));
  };

  const handleProjectSelect = (project) => {
    setProject(project);
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
              {loading ? <Spinner/> : projects.map((project, index) => (
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

                <Paper
                  elevation={18}
                  sx={{
                    position: "absolute",
                    zIndex: 5,
                    boxShadow: "0px 0px 13px #f97316",
                    height: {
                      x15: "85%",
                      x12: "85%",
                      x10: "87%",
                      x76: "87%",
                      x64: "87%",
                      x45: "90%",
                      x30: "90%",
                      x20: "95%",
                    },
                    width: {
                      x10: "85%",
                      x76: "85%",
                      x64: "80%",
                      x45: "90%",
                      x30: "95%",
                      x20: "95%",
                    },
                    borderRadius: 5,
                    overflowY: "auto",
                  }}
                >
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      textAlign: "start",
                      borderTopLeftRadius: "inherit",
                      borderTopRightRadius: "inherit",
                      width: "100%",
                      height: "10%",
                      paddingLeft: "5%",
                      fontWeight: "bold",
                      borderBottom: "1px solid rgb(224, 224, 224)",
                    }}
                    variant="h5"
                  >
                    Update Project
                  </Typography>

                  <Grid2 container sx={{ width: "100%", height: "80%" }}>
                    <Grid2
                      item
                      size={{
                        x15: 8,
                        x12: 8,
                        x10: 8,
                        x76: 12,
                        x64: 12,
                        x45: 12,
                        x30: 12,
                        x20: 12,
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          height: "80%",
                        }}
                      >
                        <Grid2 container sx={{ height: "100%", width: "100%" }}>
                          <Grid2
                            item
                            size={6}
                            sx={{
                              ...commonGridItemStyles,
                            }}
                          >
                            <Typography
                              variant="subtitle1"
                              sx={{ fontSize: "1rem", ml: 1, mb: 1 }}
                            >
                              Project Name
                            </Typography>
                            <TextField
                              fullWidth
                              name="projectName"
                              value={project.projectName}
                              placeholder={project.projectName}
                              onChange={handleChange}
                              required
                              sx={{
                                ...commonInputStyles,
                              }}
                            />
                          </Grid2>

                          <Grid2
                            item
                            size={6}
                            sx={{
                              ...commonGridItemStyles,
                            }}
                          >
                            


                            <Typography
                              variant="subtitle1"
                              sx={{ fontSize: "1rem", ml: 1, mb: 1 }}
                            >
                              Payment Status
                            </Typography>
                            <FormControl
                              fullWidth
                              sx={{ ...commonInputStyles }}
                            >
                              <Select
                                name="paymentStatus"
                                value={project.paymentStatus}
                                onChange={(e) =>
                                  setProject((prev) => ({
                                    ...prev,
                                    paymentStatus: e.target.value,
                                  }))
                                }
                                required
                              >
                                <MenuItem value={true}>True</MenuItem>
                                <MenuItem value={false}>False</MenuItem>
                              </Select>
                            </FormControl>








                          </Grid2>

                          <Grid2
                            item
                            size={6}
                            sx={{
                              ...commonGridItemStyles,
                            }}
                          >
                            <Typography
                              variant="subtitle1"
                              sx={{ fontSize: "1rem", ml: 1, mb: 1 }}
                            >
                              Start Date
                            </Typography>
                            <TextField
                              fullWidth
                              type="date"
                              name="startDate"
                              value={project.startDate}
                              placeholder={project.startDate}
                              onChange={handleChange}
                              required
                              sx={{
                                ...commonInputStyles,
                              }}
                            />
                          </Grid2>

                          <Grid2
                            item
                            size={6}
                            sx={{
                              ...commonGridItemStyles,
                            }}
                          >
                            <Typography
                              variant="subtitle1"
                              sx={{ fontSize: "1rem", ml: 1, mb: 1 }}
                            >
                              End Date
                            </Typography>
                            <TextField
                              fullWidth
                              type="date"
                              name="endDate"
                              value={project.endDate}
                              placeholder={project.endDate}
                              onChange={handleChange}
                              required
                              sx={{
                                ...commonInputStyles,
                              }}
                            />
                          </Grid2>

                          <Grid2
                            item
                            size={6}
                            sx={{
                              ...commonGridItemStyles,
                            }}
                          >
                            <Typography
                              variant="subtitle1"
                              sx={{ fontSize: "1rem", ml: 1, mb: 1 }}
                            >
                              Total Budget
                            </Typography>
                            <TextField
                              fullWidth
                              type="number"
                              name="totalBudget"
                              value={project.totalBudget}
                              placeholder={project.totalBudget}
                              onChange={handleChange}
                              required
                              sx={{
                                ...commonInputStyles,
                              }}
                            />
                          </Grid2>

                          <Grid2
                            item
                            size={6}
                            sx={{
                              ...commonGridItemStyles,
                            }}
                          >
                            <Typography
                              variant="subtitle1"
                              sx={{ fontSize: "1rem", ml: 1, mb: 1 }}
                            >
                              Payment Date
                            </Typography>
                            <TextField
                              fullWidth
                              type="date"
                              name="paymentDate"
                              value={project.paymentDate}
                              placeholder={project.paymentDate}
                              onChange={handleChange}
                              required
                              sx={{
                                ...commonInputStyles,
                              }}
                            />
                          </Grid2>

                          <Grid2
                            item
                            size={6}
                            sx={{
                              ...commonGridItemStyles,
                            }}
                          >
                           
                          </Grid2>
                          <Grid2 item size={6}></Grid2>
                        </Grid2>
                      </Box>
                    </Grid2>

                    <Grid2
                      item
                      size={{
                        x15: 4,
                        x12: 4,
                        x10: 4,
                        x76: 12,
                        x64: 12,
                        x45: 12,
                        x30: 12,
                        x20: 12,
                      }}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          flexGrow: 1,
                          minHeight: 0,
                          borderLeft: "1px solid #f97316",
                          overflowY: "auto",
                          padding: 5,
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Stack direction={"column"} spacing={2}>
                          <Typography
                            ml={2}
                            variant="subtitle1"
                            fontWeight={700}
                            sx={{
                              backgroundImage:
                                "linear-gradient(to right,rgb(183, 46, 0), rgb(255, 38, 0), rgb(255, 255, 255),rgb(255, 255, 255))",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                            }}
                          >
                            Subtasks
                          </Typography>

                          {project.subtasks.map((subtask, index) => (
                            <Grid2
                              container
                              spacing={1}
                              alignItems="center"
                              key={index}
                            >
                              <Grid2 item size={10}>
                                <TextField
                                  fullWidth
                                  label={`Subtask ${index + 1}`}
                                  value={subtask}
                                  onChange={(e) => handleChange(e, index)}
                                  required
                                  sx={{ ...commonInputStyles }}
                                />
                              </Grid2>
                              <Grid2 item size={2}>
                                {index > 0 && (
                                  <IconButton
                                    size="small"
                                    color="error"
                                    onClick={() => removeSubtask(index)}
                                    sx={{
                                      backgroundColor:
                                        "rgba(249, 116, 22, 0.34)",
                                      color: "white",
                                      ":hover": {
                                        backgroundColor:
                                          "rgba(194, 65, 12, 0.34)",
                                      },
                                    }}
                                  >
                                    <Remove />
                                  </IconButton>
                                )}
                              </Grid2>
                            </Grid2>
                          ))}
                          <Button
                            startIcon={<Add />}
                            onClick={addSubtask}
                            sx={{
                              mt: 1,
                              fontSize: {
                                x15: "1rem",
                                x12: "0.9rem",
                                x10: "0.8rem",
                                x76: "0.7rem",
                                x64: "0.6rem",
                                x45: "0.5rem",
                                x30: "0.4rem",
                                x20: "0.3rem",
                              },
                            }}
                          >
                            Add
                          </Button>
                        </Stack>
                        <Typography
                              variant="subtitle1"
                              sx={{ fontSize: "1rem", ml: 1, mb: 1,mt:5 }}
                            >
                              Project Status
                            </Typography>
                            <FormControl
                              fullWidth
                              sx={{ ...commonInputStyles }}
                            >
                              <Select
                                name="status"
                                value={project.status}
                                onChange={(e) =>
                                  setProject((prev) => ({
                                    ...prev,
                                    status: e.target.value,
                                  }))
                                }
                                required
                              >
                                <MenuItem value={true}>Completed</MenuItem>
                                <MenuItem value={false}>Pending</MenuItem>
                              </Select>
                            </FormControl>
                      </Box>
                    </Grid2>
                  </Grid2>

                  <Stack
                    direction={"row"}
                    sx={{
                      width: "100%",
                      height: "10%",
                      borderTop: "1px solid rgb(224, 224, 224)",
                      borderBottomLeftRadius: "inherit",
                      borderBottomRightRadius: "inherit",
                      paddingTop: 2,
                      paddingBottom: 2,
                    }}
                  >
                    <Button
                      sx={{ ml: "auto" }}
                      variant="outlined"
                      onClick={() => window.history.back()}
                    >
                      Cancel
                    </Button>
                    <Button
                      sx={{ ml: 4, mr: 10 }}
                      variant="contained"
                      onClick={handleUpdateProject}
                    >
                      Update
                    </Button>
                  </Stack>
                </Paper>
              </Box>
            </Grid2>
          </Grid2>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
