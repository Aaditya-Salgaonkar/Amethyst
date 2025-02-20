import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import SignUp from "./screens/signup";
import Login from "./screens/login";
import Home from "./screens/home";
import Dashboard from './components/Dashboard';
import Projects from './components/Projects';
import Report from "./components/Report";
import LandingPage from "./screens/LandingPage";

function App() {
  // Authentication state
  const [token, setToken] = useState(false);
  const location = useLocation(); // Get the current route

  // Load token from sessionStorage
  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      setToken(JSON.parse(storedToken));
    }
  }, []);

  // Save token when it changes
  useEffect(() => {
    if (token) {
      sessionStorage.setItem("token", JSON.stringify(token));
    }
  }, [token]);

  return (
    <>
      {/* Routes */}
      <Routes>
        <Route path="/" element={!token ? <LandingPage /> : <Navigate to="/home" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login setToken={setToken} />} />

        {/* Protected Routes */}
        <Route path="/home" element={token ? <Home token={token} /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/projects" element={token ? <Projects /> : <Navigate to="/login" />} />
        <Route path="/report" element={token ? <Report /> : <Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
