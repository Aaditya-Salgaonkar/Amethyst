import React, { useState } from "react";
import {
  Paper,
  Box,
  TextField,
  Button,
  Grid2,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { supabase } from "../client";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
export const commonGridItemStyles = {
  display: "flex",
  flexDirection: "column",
  padding: 3,
};

export const commonInputStyles = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "primary.main",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "secondary.main",
    },
  },
};

const ProjectForm = ({ uuid }) => {
  const navigate=useNavigate();
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    projectName: "",
    startDate: "",
    endDate: "",
    totalBudget: "",
    paymentDate: "",
    clientName: "",
    paymentStatus: false,
    clientEmail: '',
    subtasks: [""],
  });

  const handleChange = (e, index = null) => {
    const { name, value } = e.target;
    if (index !== null) {
      const updatedSubtasks = [...formData.subtasks];
      updatedSubtasks[index] = value;
      setFormData((prev) => ({ ...prev, subtasks: updatedSubtasks }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const addSubtask = () => {
    setFormData((prev) => ({ ...prev, subtasks: [...prev.subtasks, ""] }));
  };

  const removeSubtask = (index) => {
    const updatedSubtasks = formData.subtasks.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, subtasks: updatedSubtasks }));
  };

  const createProjectAndInvoice = async (projectData) => {
    try {
        // Create the project
        const { data: project, error: projectError } = await supabase
            .from("projects")
            .insert([projectData])
            .single();

        if (projectError) throw projectError;

        // Automatically create the invoice after the project is created
        const invoiceData = {
            project_id: project.p_id,
            issued_date: new Date(),
            due_date: new Date(new Date().setMonth(new Date().getMonth() + 1)),  // Example: Due date is next month
            status: "pending",  // Default status
            payment_method: "",  // Set this later when payment method is chosen
            payment_date: null,  // No payment date initially
        };

        const { error: invoiceError } = await supabase
            .from("invoice")
            .insert([invoiceData]);

        if (invoiceError) throw invoiceError;

        console.log("Project and Invoice created successfully");
    } catch (err) {
        setError(err.message);
    }
};

  const handleCreateProject = async () => {
    setLoading(true)
    try {
      console.log("Creating project...");

      let clientId = null;

      if (formData.clientName) {

        const { data: existingClient, error: clientError } = await supabase
          .from("clients")
          .select("id")
          .eq("name", formData.clientName)
          .single();

        if (clientError && clientError.code !== "PGRST116") {
          console.error("Error fetching client:", clientError.message);
          return;
        }

        if (existingClient) {
          clientId = existingClient.id;
        } else {

          const { data: newClient, error: newClientError } = await supabase
            .from("clients")
            .insert([
              { name: formData.clientName, email: formData.clientEmail || "" },
            ])
            .select("id")
            .single();

          if (newClientError) {
            console.error("Error creating client:", newClientError.message);
            return;
          }

          clientId = newClient.id;
          console.log("New client created with ID:", clientId);
        }
      }

      // Format subtasks (initialize all with status 0)
      const formattedSubtasks = formData.subtasks
        .filter((task) => task.trim() !== "") // Remove empty tasks
        .map((task) => ({
          name: task,
          status: 0,
        }));

      console.log("Formatted subtasks:", formattedSubtasks);

      // Prepare project payload
      const projectPayload = {
        name: formData.projectName,
        start_date: formData.startDate || null, // Directly use the date (assuming correct format)
        due_date: formData.endDate || null,
        budget_allocated: formData.totalBudget
          ? parseFloat(formData.totalBudget)
          : null, // Cast budget to number
        "paymentDate": formData.paymentDate || null,
        payment_status: !!formData.paymentStatus, // Cast to boolean
        subtasks: JSON.stringify(formattedSubtasks), // Convert subtasks to JSON string
        client_id: clientId,
        "freelancerId": uuid || null, // Use freelancerId directly
        status: false, // Initial status is false
      };

      const { data: projectData, error: projectError } = await supabase
        .from("projects")
        .insert([projectPayload])
        .select();

      if (projectError) {
        console.error("Error creating project:", projectError.message);
      } else {
        console.log("Project created successfully!", projectData);
        alert("Project created successfully!");
        navigate(-1);
        setFormData({
          projectName: "",
          startDate: "",
          endDate: "",
          totalBudget: "",
          paymentDate: "",
          clientName: "",
          clientEmail: '',
          paymentStatus: false,
          subtasks: [""],
        })
      }
    } catch (error) {
      console.error("Unexpected error:", error.message);
    }
    await createProjectAndInvoice(newProjectData);
    setLoading(false)
  };

  return (

   loading ? <Spinner top="1%"/> : <Paper
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
          x10: "70%",
          x76: "70%",
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
        Create Project
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
                  value={formData.projectName}
                  placeholder={formData.projectName}
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
                  Client Name
                </Typography>
                <TextField
                  fullWidth
                  name="clientName"
                  value={formData.clientName}
                  placeholder={formData.clientName}
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
                  Start Date
                </Typography>
                <TextField
                  fullWidth
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  placeholder={formData.startDate}
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
                  value={formData.endDate}
                  placeholder={formData.endDate}
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
                  value={formData.totalBudget}
                  placeholder={formData.totalBudget}
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
                  value={formData.paymentDate}
                  placeholder={formData.paymentDate}
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
          sx={{ display: "flex", flexDirection: "column", height: "100%" }}
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
              

              {formData.subtasks.map((subtask, index) => (
                <Grid2 container spacing={1} alignItems="center" key={index}>
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
                          backgroundColor: "rgba(249, 116, 22, 0.34)",
                          color: "white",
                          ":hover": {
                            backgroundColor: "rgba(194, 65, 12, 0.34)",
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
                  Client Email
                </Typography>
                <TextField
                  fullWidth
                  name="clientEmail"
                  value={formData.clientEmail}
                  placeholder={formData.clientEmail}
                  onChange={handleChange}
                  required
                  sx={{
                    ...commonInputStyles,
                  }}
                />
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
          onClick={handleCreateProject}
        >
          Create
        </Button>
      </Stack>
    </Paper>
  );
};

export default ProjectForm;
