import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import SignUp from "./screens/signup";
import Login from "./screens/login";
import Home from "./screens/home";
import Dashboard from "./components/Dashboard";
import Projects from "./components/Projects";
import Report from "./screens/Report";
import LandingPage from "./screens/LandingPage";
import { demoObject } from "./Test/demoObject";

const App = () => {
  const [token, setToken] = useState(false);
  const location = useLocation();

  if (token) {
    sessionStorage.setItem("token", JSON.stringify(token));
  }
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      let data = JSON.parse(sessionStorage.getItem("token"));
      setToken(data);
    }
  }, []);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={!token ? <LandingPage /> : <Navigate to="/home" />}
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route
          path="/home"
          element={token ? <Home token={token} /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/projects"
          element={token ? <Projects /> : <Navigate to="/login" />}
        />
        <Route
          path="/report"
          element={
            token ? <Report projects={demoObject} /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
