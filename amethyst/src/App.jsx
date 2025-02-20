import React, { useEffect, useState } from "react";
import SignUp from "./screens/signup";
import Login from "./screens/login";
import Home from "./screens/home";
import { Routes, Route } from "react-router-dom";
import Dashboard from './components/Dashboard';
import Projects from './components/Projects'
import Report from "./components/Report";
const App = () => {
  const [token, setToken] = useState(false);
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
        <Route path={"/signup"} element={<SignUp />} />
        <Route path={"/"} element={<Login setToken={setToken} />} />
        {token ? <Route path={"/home"} element={<Home token={token} />} /> : ""}
        {token ? <Route path={"/Dashboard"} element={<Dashboard />} /> : ""}
        {token ? <Route path={"/Report"} element={<Report />} /> : ""}
        {token ? <Route path={"/Projects"} element={<Projects />} /> : ""}

        
      </Routes>
    </div>
  );
};

export default App;
