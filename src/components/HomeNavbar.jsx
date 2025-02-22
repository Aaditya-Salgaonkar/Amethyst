import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const btnStyle = {
  borderRadius: 0,
  backgroundColor: "rgb(15, 15, 15)",
  color: "white",
  borderBottom: "3px solid #f97316",
  transition: "0.2s",
  "&:hover": {
    color: "#f97316",
    borderBottom: "3px solid rgb(254, 39, 1)",
  },
};

export default function HomeNavbar() {
  const navigate = useNavigate();
  function handleLogout() {
    sessionStorage.removeItem("token");
    navigate("/");
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: "rgb(15, 15, 15)" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 0.15 }}>
          WorkSphere
        </Typography>
        <Box sx={{ display: "flex", gap: 4 }}>
          <Button
            component={Link}
            to="/Dashboard"
            variant="contained"
            sx={btnStyle}
          >
            Dashboard
          </Button>
          <Button
            component={Link}
            to="/Report"
            variant="contained"
            sx={btnStyle}
          >
            Report
          </Button>
          <Button
            component={Link}
            to="/projectCreate"
            variant="contained"
            sx={btnStyle}
          >
            Create Project
          </Button>
          <Button
            component={Link}
            to="/projectUpdate"
            variant="contained"
            sx={btnStyle}
          >
            Update Project
          </Button>
          <Button
            component={Link}
            to="/reminders"
            variant="contained"
            sx={btnStyle}
          >
            Reminder
          </Button>
          <Button
            component={Link}
            to="/expenses"
            variant="contained"
            sx={btnStyle}
          >
            Expenses
          </Button>
          <Button
            component={Link}
            to="/addexpense"
            variant="contained"
            sx={btnStyle}
          >
            Add Expenses
          </Button>
          <Button
            component={Link}
            to="/payments"
            variant="contained"
            sx={btnStyle}
          >
            Payments
          </Button>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          sx={{ ...btnStyle, color: "#f97316" }}
          variant="contained"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
