import * as React from "react";
import { useState } from "react";
import { supabase } from "../client";
import { Link, useNavigate } from "react-router-dom";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { theme } from "../components/Theme";
import {
  Box,
  Paper,
  Stack,
  TextField,
  Button,
  Typography,
  Divider,
  ThemeProvider,
} from "@mui/material";
import { motion } from "framer-motion";
import { useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const Login = ({ setToken }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(JSON.parse(storedToken));
      navigate("/home");
    }
  }, []);

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
      localStorage.setItem("authToken", JSON.stringify(data)); // Store token in localStorage
      navigate("/home");
    } catch (error) {
      alert(error.message);
    }
  }

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
              paddingLeft: 6,
              paddingRight: 6,
              paddingTop: 4,
              paddingBottom: 11,
              borderRadius: 4,
              width: { xs: "90%", sm: "400px", x12: "500px" },
            }}
          >
            <div className="flex justify-left">
                <a href="/landingpage" className="bg-gradient-to-r from-orange-500 to-orange-800 p-3 -ml-5 mb-5 rounded-md"><ArrowBackIcon /></a>
            </div>
            
            <Typography
              component="h1"
              variant="h4"
              sx={{
                textAlign: "center",
              }}
            >
              Login <LockOpenIcon sx={{ ml: 1 }} fontSize="large" />
            </Typography>
            <Divider sx={{ backgroundColor: "primary.main", mb: 5, mt: 3 }} />
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
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "primary.main",
                      },
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
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "primary.main",
                      },
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
                  textAlign: "center",
                  fontWeight: "bold",
                  color: theme.palette.secondary.main,
                }}
              >
                Sign up
              </Link>
            </Typography>
          </Paper>
        </motion.div>
      </Box>
    </ThemeProvider>
  );
};

export default Login;
