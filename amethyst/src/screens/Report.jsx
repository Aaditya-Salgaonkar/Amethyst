import React from "react";
import {
  Typography,
  Paper,
  Grid2,
  Stack,
  Box,
  LinearProgress,
  Container,
  ThemeProvider,
} from "@mui/material";
import { FolderCopyRounded } from "@mui/icons-material";
import { theme } from "../components/Theme";

//These are the Style object for there respective components

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  // backgroundColor: "background.container",
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

const paperStyle = {
  overflowY: "auto",
  width: "70%",
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
        {budget}
      </Grid2>
      <Grid2 size={2} sx={commonProjectHeaderStyle}>
        {spent}
      </Grid2>
      <Grid2 size={2} sx={commonProjectHeaderStyle}>
        {remain}
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
        <ProjectItems itemName={item.itemName} key={index} />
      ))}
    </>
  );
};

export default function Report({ projects = [] }) {
  return (
    <ThemeProvider theme={theme}>
      <Container disableGutters sx={containerStyle}>
        <button
          style={{
            height: "5%",
            width: "5%",
            backgroundColor: "rgba(213, 118, 51, 0.82)",
            borderRadius: "40px",
            position: "absolute",
            top: "4%",
            left: "2%",
            fontWeight: "bold",
            fontSize: "1.8rem",
            zIndex: "1",
          }}
          onClick={() => window.history.back()}
        >
          &larr;
        </button>
        <Box
          sx={{
            height: "27%",
            width: "20%",
            backgroundColor: "rgba(213, 118, 51, 0.82)",
            borderRadius: "20px",
            position: "absolute",
            top: "5.2%",
            left: "12%",
            zIndex: "1",
          }}
        ></Box>
        <Paper sx={paperStyle} elevation={18}>
          <TopRow />
          <ListRow />
          {projects.map((item, index) => (
            <Project
              key={index}
              name={item.projName}
              budget={item.projBudget}
              spent={item.projSpent}
              projItems={item.projItems}
            />
          ))}
        </Paper>
        <Box
          sx={{
            height: "27%",
            width: "20%",
            backgroundColor: "rgba(213, 118, 51, 0.82)",
            borderRadius: "20px",
            position: "absolute",
            bottom: "5.2%",
            right: "12%",
            zIndex: "1",
          }}
        ></Box>
      </Container>
    </ThemeProvider>
  );
}
