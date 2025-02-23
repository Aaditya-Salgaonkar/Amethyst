import React from "react";
import { Box } from "@mui/material";
import Dashboard from "./Dashboard";
import HomeNavbar from "../components/HomeNavbar";
import { useEffect, useState } from "react";
import { supabase } from "../client";

const Home = ({ token }) => {
  const [freelancerName, setFreelancerName] = useState(null);

    useEffect(() => {
      const fetchFreelancerName = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        console.log(user)
        if (user) {
          setFreelancerName(user.email || "Freelancer");
        }
      };
      fetchFreelancerName();
    }, []);


  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
       // backgroundColor: " #262626",
        display: 'flex',
        justifyContent: 'center',
        overflowX: 'hidden',
      }}
    >
        <HomeNavbar token={token} freelancerName={freelancerName}/>
        <Dashboard token={token} />
    </Box>
  );
};

export default Home;
