import React, { forwardRef, useState, useImperativeHandle } from "react";
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

const commonGridItemStyles = {
  display: "flex",
  flexDirection: "column",
  padding: 3,
};

const commonInputStyles = {
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

const ProjectForm = forwardRef((props, ref) => {
  const {
    width = "70%",
    createOupdate = "nothing",
    handleOnsubmit = () => {},
  } = props;
  const [formData, setFormData] = useState({
    projectName: "",
    startDate: "",
    endDate: "",
    totalBudget: "",
    paymentDate: "",
    clientName: "",
    subtasks: [""],
  });

  useImperativeHandle(ref, () => ({
    updateFormData(newData) {
      setFormData(newData);
    },
  }));

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

  return (
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
          x10: width,
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
        {createOupdate} Project
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
          <Box sx={{ width: "100%", height: "80%" }}>
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
          onClick={handleOnsubmit}
        >
          {createOupdate}
        </Button>
      </Stack>
    </Paper>
  );
});

export default ProjectForm;
