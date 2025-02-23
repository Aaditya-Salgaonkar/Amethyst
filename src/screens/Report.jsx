import React from "react";
import {
  Typography,
  Paper,
  Grid2,
  Stack,
  Box,
  Button,
  Container,
  ThemeProvider,
} from "@mui/material";
import { FolderCopyRounded } from "@mui/icons-material";
import { theme } from "../components/Theme";
import { useState, useEffect } from "react";
import { supabase } from "../client";
import Spinner from "../components/Spinner";
import HomeNavbar from "../components/HomeNavbar";
//These are the Style object for there respective components

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  // backgroundColor: "background.container",
  height: "90vh",
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

const paperStyle = {
  overflowY: "auto",
  width: "60%",
  height: "80%",
  borderTopLeftRadius: "25px",
  borderBottomLeftRadius: "25px",
  borderBottomRightRadius: "17px",
  borderTopRightRadius: "17px",
  fontFamily: "sans-serif",
  boxShadow: "0px 2px 22px rgba(254, 164, 61, 0.38)",
  animation: "scaleAnimation 2s infinite alternate ease-in-out",
  "@keyframes scaleAnimation": {
    "0%": {
      transform: "scale(1)",
    },
    "100%": {
      transform: "scale(1.01)",
    },
  },
  position: "absolute",
  zIndex: "2",

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
};

const commonListRowStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderTop: "none",
  borderBottom: "none",
  borderLeft: "none",
  borderRight: "1px solid rgb(211, 209, 209)",
};

const commonProjectHeaderStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflowX: "hidden",
  borderRight: "1px solid rgb(211, 209, 209)",
};

const commonProjectItemsStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflowX: "hidden",
};

// I have written this for convenience
const TopRow = () => {
  return (
    <Stack
      sx={{
        width: "100%",
        height: "10%",
        display: "flex",
        alignItems: "center",
        borderTopLeftRadius: "inherit",
        borderTopRightRadius: "inherit",
      }}
      direction={"row"}
    >
      <Typography
        sx={{
          marginLeft: "5%",
          fontWeight: "700",
          fontSize: "1.5rem",
        }}
      >
        Projects
      </Typography>
    </Stack>
  );
};

const ListRow = () => {
  return (
    <Grid2
      container
      sx={{
        height: "8%",
        width: "100%",
        backgroundColor: "rgba(255, 143, 63, 0.62)",
        borderTop: "1px solid rgb(211, 209, 209)",
      }}
    >
      <Grid2
        size={4}
        sx={{
          ...commonListRowStyle,
          paddingLeft: "5%",
          justifyContent: "flex-start",
          borderRight: "1px solid rgb(211, 209, 209)",
        }}
      >
        <b>{"Project Name"}</b>
      </Grid2>
      <Grid2 size={2} sx={commonListRowStyle}>
        <b>{"Budget"}</b>
      </Grid2>
      <Grid2 size={2} sx={commonListRowStyle}>
        <b>{"Spent"}</b>
      </Grid2>
      <Grid2 size={2} sx={commonListRowStyle}>
        <b>{"Remaining"}</b>
      </Grid2>
      <Grid2 size={2} sx={{ ...commonListRowStyle, borderRight: "none" }}>
        <b>{"Due Date"}</b>
      </Grid2>
    </Grid2>
  );
};

const ProjectHeader = ({ projName, budget, spent, remain, duedate }) => {
  return (
    <Grid2
      container
      sx={{
        height: "10%",
        width: "100%",
        fontWeight: "600",
        fontSize: "large",
      }}
    >
      <Grid2
        size={4}
        sx={{
          ...commonProjectHeaderStyle,
          paddingLeft: "5%",
          justifyContent: "flex-start",
        }}
      >
        {projName}
      </Grid2>
      <Grid2 size={2} sx={commonProjectHeaderStyle}>
        {`${budget}$`}
      </Grid2>
      <Grid2 size={2} sx={commonProjectHeaderStyle}>
      {`${spent}$`}
      </Grid2>
      <Grid2 size={2} sx={commonProjectHeaderStyle}>
      {`${remain}$`}
      </Grid2>
      <Grid2 size={2} sx={commonProjectHeaderStyle}>
        {duedate}
      </Grid2>
    </Grid2>
  );
};

const ProjectItems = ({ itemName = "Dummy" }) => {
  return (
    <Grid2
      container
      sx={{
        height: "9%",
        width: "100%",
        fontWeight: "500",
        fontSize: "medium",
        borderTop: "1px solid rgb(211, 209, 209)",
        borderBottom: "none",
        borderLeft: "none",
        borderRight: "none",
      }}
    >
      <Grid2
        size={12}
        sx={{
          ...commonProjectItemsStyle,
          paddingLeft: "6%",
          justifyContent: "flex-start",
          borderRight: "none",
        }}
      >
        <Stack direction={"row"} spacing={2}>
          <Box
            sx={{
              width: "40px",
              height: "40px",
              backgroundColor: "rgba(255, 143, 63, 0.79)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "20px",
            }}
          >
            <FolderCopyRounded sx={{ color: "white" }} />
          </Box>
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {itemName}
          </Typography>
        </Stack>
      </Grid2>
    </Grid2>
  );
};

const fetchProjectsWithClientData = async (freelancerId) => {
  try {
    const { data: projects, error: projectError } = await supabase
      .from("projects")
      .select(" name, due_date, budget_allocated, spent, subtasks")
      .eq("freelancerId", freelancerId);

    if (projectError) {
      console.error("Error fetching projects:", projectError.message);
      return [];
    }

    const projectsWithClientData = await Promise.all(
      projects.map(async (project) => {
        return {
          projectName: project.name,
          endDate: project.due_date,
          totalBudget: project.budget_allocated?.toString() || "0",
          spent: project.spent || 0,
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

const Project = ({
  projItems = [],
  name = "Spuk Inc",
  budget = 111,
  spent = 0,
  duedate = "12/12/2022",
}) => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "2%",
          backgroundColor: "rgba(255, 143, 63, 0.44)",
        }}
      />

      <ProjectHeader
        projName={name}
        budget={budget}
        spent={spent}
        remain={budget - spent}
        duedate={duedate}
      />
      {projItems.map((item, index) => (
        <ProjectItems itemName={item} key={index} />
      ))}
    </>
  );
};

export default function Report({ uuid, token }) {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);

  const loadProjects = async () => {
    if (uuid) {
      setLoading(true);
      const fetchedProjects = await fetchProjectsWithClientData(uuid);
      setProjects(fetchedProjects);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const [freelancerName, setFreelancerName] = useState(null);

  useEffect(() => {
    const fetchFreelancerName = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log(user);
      if (user) {
        setFreelancerName(user.email || "Freelancer");
      }
    };
    fetchFreelancerName();
  }, []);

  return (
    <div>
      <HomeNavbar token={token} freelancerName={freelancerName} />
      <ThemeProvider theme={theme}>
        <Box sx={{ marginTop: 7 }}></Box>
        <Container disableGutters sx={containerStyle}>
          {/* <Button
          style={{
            height: "4%",
            width: "4%",
            borderRadius: "10px",
            position: "absolute",
            top: "4%",
            left: "2%",
            zIndex: "1",
          }}
          onClick={() => window.history.back()}
        >
          BACK
        </Button> */}
          <Box
            sx={{
              height: "27%",
              width: "15%",
              backgroundColor: "rgba(213, 118, 51, 0.82)",
              borderRadius: "20px",
              position: "absolute",
              top: "4.5%",
              left: "15%",
              zIndex: "1",
            }}
          ></Box>

          <Paper sx={paperStyle} elevation={18}>
            <TopRow />
            <ListRow />
            {loading ? (
              <Spinner />
            ) : (
              projects.map((item, index) => (
                <Project
                  key={index}
                  name={item.projectName}
                  duedate={item.endDate}
                  budget={item.totalBudget}
                  spent={item.spent}
                  projItems={item.subtasks}
                />
              ))
            )}
          </Paper>

          <Box
            sx={{
              height: "27%",
              width: "15%",
              backgroundColor: "rgba(213, 118, 51, 0.82)",
              borderRadius: "20px",
              position: "absolute",
              bottom: "4.5%",
              right: "15%",
              zIndex: "1",
            }}
          ></Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
