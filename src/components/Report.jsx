import React from "react";
import {
  Typography,
  Paper,
  Grid2,
  Stack,
  Box,
  LinearProgress,
} from "@mui/material";
import { FolderCopyRounded } from "@mui/icons-material";

//These are the Style object for there respective components
const paperStyle = {
  overflowY: "auto",
  width: "70%",
  height: "80%",
  backgroundColor: "white",
  borderTopLeftRadius: "25px",
  borderBottomLeftRadius: "25px",
  borderBottomRightRadius: "17px",
  borderTopRightRadius: "17px",
  fontFamily: "sans-serif",
  boxShadow: "0px 2px 22px rgba(61, 177, 254, 0.38)",
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
    backgroundColor: "#3db1fe",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#039be5",
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
        borderTop: "1px solid rgb(211, 209, 209)",
        color: "rgb(153, 156, 159)",
        fontWeight: "500",
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
        {"Project Name"}
      </Grid2>
      <Grid2 size={2} sx={commonListRowStyle}>
        {"Budget"}
      </Grid2>
      <Grid2 size={2} sx={commonListRowStyle}>
        {"Spent"}
      </Grid2>
      <Grid2 size={2} sx={commonListRowStyle}>
        {" "}
      </Grid2>
      <Grid2 size={2} sx={{ ...commonListRowStyle, borderRight: "none" }}>
        {"Remain"}
      </Grid2>
    </Grid2>
  );
};

const ProjectHeader = ({ projName, budget, spent, remain }) => {
  return (
    <Grid2
      container
      sx={{
        height: "10%",
        width: "100%",
        color: "#606060",
        fontWeight: "600",
        fontSize: "large",
        borderTop: "1px solid rgb(211, 209, 209)",
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
        {" "}
      </Grid2>
      <Grid2 size={2} sx={commonProjectHeaderStyle}>
        {remain}
      </Grid2>
    </Grid2>
  );
};

const ProjectItems = ({
  budget,
  spent,
  itemName = "Dummy",
  iconColor,
  progress,
}) => {
  return (
    <Grid2
      container
      sx={{
        height: "9%",
        width: "100%",
        color: " #646565",
        fontWeight: "500",
        fontSize: "medium",
        borderTop: "1px solid rgb(211, 209, 209)",
        borderBottom: "none",
        borderLeft: "none",
        borderRight: "none",
      }}
    >
      <Grid2
        size={4}
        sx={{
          ...commonProjectItemsStyle,
          paddingLeft: "4.5%",
          justifyContent: "flex-start",
          borderRight: "1px solid rgb(211, 209, 209)",
        }}
      >
        <Stack direction={"row"} spacing={1.5}>
          <Box
            sx={{
              width: "40px",
              height: "40px",
              backgroundColor: iconColor,
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
      <Grid2
        size={2}
        sx={{
          ...commonProjectItemsStyle,
          borderRight: "1px solid rgb(211, 209, 209)",
        }}
      >
        {`${budget} hr`}
      </Grid2>
      <Grid2
        size={2}
        sx={{
          ...commonProjectItemsStyle,
          borderRight: "1px solid rgb(211, 209, 209)",
        }}
      >
        {`${spent} hr`}
      </Grid2>
      <Grid2
        size={2}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRight: "1px solid rgb(211, 209, 209)",
        }}
      >
        <LinearProgress
          sx={{
            width: "90%",
            height: "7px",
            borderRadius: "2.5px",
            backgroundColor: "lightgrey",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "rgb(25, 163, 255)",
            },
          }}
          variant="determinate"
          value={progress}
        />
      </Grid2>
      <Grid2 size={2} sx={commonProjectItemsStyle}>
        {`${budget - spent} hr`}
      </Grid2>
    </Grid2>
  );
};

const Project = ({
  projItems = [],
  name = "Spuk Inc",
  budget = 111,
  spent = 0,
}) => {
  return (
    <>
      <ProjectHeader
        projName={name}
        budget={budget}
        spent={spent}
        remain={budget - spent}
      />
      {projItems.map((item, index) => (
        <ProjectItems
          itemName={item.itemName}
          key={index}
          budget={item.budget}
          spent={item.spent}
          iconColor={item.iconColor}
          progress={item.progress}
        />
      ))}
    </>
  );
};

export default function Report({ projects = [] }) {
  return (
    <>
      <Box
        sx={{
          height: "27%",
          width: "20%",
          backgroundColor: " #85c3f0",
          borderRadius: "20px",
          position: "absolute",
          top: "5.2%",
          left: "12%",
          zIndex: "1",
        }}
      ></Box>
      <Paper sx={paperStyle} elevation={12}>
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
          backgroundColor: " #85c3f0",
          borderRadius: "20px",
          position: "absolute",
          bottom: "5.2%",
          right: "12%",
          zIndex: "1",
        }}
      ></Box>
    </>
  );
}