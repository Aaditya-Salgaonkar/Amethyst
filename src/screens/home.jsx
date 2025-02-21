import { Button } from "@mui/material";
import React from "react";
import { Box } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

const Home = ({ token }) => {
  const navigate = useNavigate();
  function handleLogout() {
    sessionStorage.removeItem("token");
    navigate("/");
  }
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "lightblue",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ flexDirection: "row", display: "flex", p: 2, gap: 5 }}>
        <Box sx={{ flexDirection: "row", display: "flex", p: 2, gap: 5 }}>
          <Button
            component={Link}
            variant="contained"
            color="primary"
            to="/Dashboard"
          >
            Dashboard
          </Button>
          <Button
            component={Link}
            variant="contained"
            color="primary"
            to="/Report"
          >
            Report
          </Button>
        </Box>
      </Box>
      <Box>Hi {token?.user?.user_metadata?.fullname || "Guest"}!</Box>

      <Box sx={{ p: 3 }}>
        <Button type="submit" variant="contained" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
