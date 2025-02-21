import * as React from "react";
import Button from "@mui/material/Button";
import { useState } from "react";
import { supabase } from "../client";
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography';
const signup = () => {
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
      alert("Check your email for a verification link!");
    } catch (error) {
      alert(error.message);
    }
  }
  return (
    <div>
        <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign up
          </Typography>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Full Name"
          name="fullname"
          onChange={handleChange}
          value={formData.fullname}
        />
        <input
          placeholder="Email"
          name="email"
          onChange={handleChange}
          value={formData.email}
        />
        <input
          placeholder="Password"
          name="password"
          type="password"
          onChange={handleChange}
          value={formData.password}
        />
        <Button type="submit" variant="contained">
          Sign up
        </Button>
      </form>
      Already have an account? <Link to='/'>Login</Link>
    </div>
  );
};

export default signup;
