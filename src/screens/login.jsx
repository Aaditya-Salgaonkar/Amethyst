import * as React from "react";
import Button from "@mui/material/Button";
import { useState } from "react";
import { supabase } from "../client";
import { Link,useNavigate } from "react-router-dom";

const login = ({setToken}) => {
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
          setToken(data)
          navigate("/home")
        //   alert("Check your email for a verification link!");
        } catch (error) {
          alert(error.message);
        }
      }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        
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
          Login
        </Button>
      </form>
      Don't have an account? <Link to='/signup'>Signup</Link>
    </div>
  )
}

export default login