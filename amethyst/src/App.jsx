import React, { useEffect, useState } from "react";
import Signup from "./screens/signup";
import Login from "./screens/login";
import Home from "./screens/home";
import Report from "./screens/Report";
import { demoObject } from "./Test/demoObject";
import { Routes, Route } from "react-router-dom";

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
        <Route path={"/signup"} element={<Signup />} />
        <Route path={"/"} element={<Login setToken={setToken} />} />
        {token ? <Route path={"/home"} element={<Home token={token} />} /> : ""}
        {token ? <Route path={"/Dashboard"} element={<Dashboard />} /> : ""}
        {token ? (
          <Route path={"/Report"} element={<Report projects={demoObject} />} />
        ) : (
          ""
        )}
      </Routes>
    </div>
  );
};

export default App;
