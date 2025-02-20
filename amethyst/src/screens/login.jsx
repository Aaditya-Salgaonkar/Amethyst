import * as React from "react";
import { useState } from "react";
import { supabase } from "../client";
import { Link, useNavigate } from "react-router-dom";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import {
  Box,
  Paper,
  Stack,
  TextField,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";

const Login = ({ setToken }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;
      setToken(data);
      navigate("/home");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        background:
          "linear-gradient(135deg,rgb(240, 240, 240),rgb(255, 255, 255))",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Paper
          elevation={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: 4,
            paddingRight: 4,
            paddingTop: 10,
            paddingBottom: 10,
            borderRadius: 4,
            width: { xs: "90%", sm: "400px" },
            backgroundColor: "white",
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{
              fontWeight: "700",
              fontSize: "clamp(2rem, 10vw, 2.15rem)",
              textAlign: "center",
              color: "#1e3c72",
            }}
          >
            Login <LockOpenIcon sx={{ ml: 1 }} fontSize="large" />
          </Typography>
          <Divider sx={{ mb: 5, mt: 3 }} />
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <Stack spacing={4.5}>
              <TextField
                label="Email"
                name="email"
                onChange={handleChange}
                value={formData.email}
                fullWidth
                variant="outlined"
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                onChange={handleChange}
                value={formData.password}
                fullWidth
                variant="outlined"
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
              />
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="medium"
                  sx={{
                    borderRadius: "10px",
                    backgroundColor: " #1e3c72",
                    "&:hover": { backgroundColor: "#2a5298" },
                  }}
                  type="submit"
                  variant="contained"
                  fullWidth
                >
                  Login
                </Button>
              </motion.div>
            </Stack>
          </form>
          <Typography
            sx={{
              mt: 5.5,
              textAlign: "center",
            }}
          >
            Don't have an account?{" "}
            <Link
              to="/signup"
              style={{
                textDecoration: "none",
                fontWeight: "bold",
                color: "#1e3c72",
              }}
            >
              Sign up
            </Link>
          </Typography>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default Login;
