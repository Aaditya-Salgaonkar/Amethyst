import * as React from "react";
import { useState } from "react";
import { supabase } from "../client";
import { Link } from "react-router-dom";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { theme } from "../components/Theme";
import { useNavigate } from "react-router-dom";
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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
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
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            fullname: formData.fullname,
          },
        },
      });

      if (error) throw error;

      const { user } = data;

      if (user) {
        const { data: freelancer, error: freelancerError } = await supabase
          .from("freelancer")
          .upsert(
            {
              id: user.id,
              email: user.email,
              name: formData.fullname || "",
            },
            { onConflict: ["email"] }
          )
          .select("id")
          .single();

        if (freelancerError) throw freelancerError;

        console.log("Freelancer ID:", freelancer.id);
      }

      alert("Check your email for a verification link!");
      navigate("/login");
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
            elevation={24}
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
              Sign up <PersonAddIcon sx={{ ml: 1 }} fontSize="large" />
            </Typography>
            <Divider sx={{ mb: 4, mt: 3 }} />
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <Stack spacing={3}>
                <TextField
                  label="Full Name"
                  name="fullname"
                  onChange={handleChange}
                  value={formData.fullname}
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
                    Sign up
                  </Button>
                </motion.div>
              </Stack>
            </form>
            <Typography
              sx={{
                mt: 5,
                textAlign: "center",
              }}
            >
              Already have an account?{" "}
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  fontWeight: "bold",
                  color: theme.palette.secondary.main,
                }}
              >
                Login
              </Link>
            </Typography>
          </Paper>
        </motion.div>
      </Box>
    </ThemeProvider>
  );
};

export default Signup;
