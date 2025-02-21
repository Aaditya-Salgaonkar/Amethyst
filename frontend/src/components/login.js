import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const GoogleLogin = () => {
  const navigate = useNavigate();

  // Redirect to Google OAuth
  const handleLogin = () => {
    window.location.href = "http://localhost:5002/auth/google";
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:5002/auth/user", { withCredentials: true });
        // Adjust the condition based on your backend response
        console.log(res);
        if (res.data && res.data.email) {
          navigate("/invoice");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <button onClick={handleLogin} style={buttonStyle}>Sign in with Google</button>
    </div>
  );
};

// Simple button styling
const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
  backgroundColor: "#4285F4",
  color: "white",
  border: "none",
  borderRadius: "5px"
};

export default GoogleLogin;
