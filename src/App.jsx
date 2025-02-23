import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import SignUp from "./screens/signup";
import Login from "./screens/login";
import Home from "./screens/home";

import Projects from "./components/Projects";
import Report from "./screens/Report";
import LandingPage from "./screens/LandingPage";
import ProjectCreate from "./screens/ProjectCreate";
import ExpensesDashboard from "./screens/ExpensesDashboard";
import AddExpense from "./screens/AddExpense";
import UpdateProject from "./screens/UpdateProject";
import Reminder from "./screens/reminder";
import Payments from "./screens/Payments";
import ProductivityTracker from "./screens/Productivity";
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
        <Route path="/expenses" element={<ExpensesDashboard />} />
        <Route path="/addexpense" element={<AddExpense />} />
        <Route path="/payments" element={<Payments token={token} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route
          path="/home"
          element={token ? <Home token={token} /> : <Navigate to="/login" />}
        />
        {/* <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        /> */}
        <Route
          path="/projects"
          element={token ? <Projects /> : <Navigate to="/login" />}
        />
        <Route
          path="/report"
          element={
            token ? <Report uuid={token?.user?.id} /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/projectCreate"
          element={
            token ? <ProjectCreate token={token} /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/landingpage"
          element={ <LandingPage /> }
        />
        <Route
          path="/projectUpdate"
          element={token ? <UpdateProject uuid={token?.user?.id} /> : <Navigate to="/login" />}
        />
        <Route
          path="/reminders"
          element={token ? <Reminder uuid={token?.user?.id} /> : <Navigate to="/login" />}
        />
        <Route
          path="/productivity"
          element={token ? <ProductivityTracker token={token} /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
};

export default App;
