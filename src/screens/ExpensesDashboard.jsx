import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Add, Menu as MenuIcon } from "@mui/icons-material";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Grid,
  Button,
  Card,
  Divider,
} from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { theme } from "../components/Theme";
import { supabase } from "../client";
import CategoryWiseExpenses from "../components/CategoryWiseExpenses";
import HomeNavbar from "../components/HomeNavbar";
import Spinner from "../components/Spinner";
const ExpensesDashboard = ({ token }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [freelancerName, setFreelancerName] = useState(null);

  useEffect(() => {
    const fetchFreelancerName = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      console.log(user);
      if (user) {
        setFreelancerName(user.email || "Freelancer");
      }
    };

    fetchFreelancerName();
  }, []);

  useEffect(() => {
    const fetchExpenses = async () => {
      setLoading(true);
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        console.error("Error getting user:", authError);
        setLoading(false);
        return;
      }

      console.log("Logged-in User ID:", user.id);

      const { data: freelancerData, error: freelancerError } = await supabase
        .from("freelancer")
        .select("id")
        .eq("id", user.id)
        .single();

      if (freelancerError || !freelancerData) {
        console.error("Freelancer not found:", freelancerError);
        setLoading(false);
        return;
      }

      console.log("Freelancer ID:", freelancerData.id);

      const { data: expensesData, error: expensesError } = await supabase
        .from("expenses")
        .select("*")
        .eq("freelancer_id", freelancerData.id)
        .order("created_at", { ascending: false });

      if (expensesError) {
        console.error("Error fetching expenses:", expensesError);
      } else {
        console.log("Fetched Expenses:", expensesData);
        setExpenses(expensesData);
      }

      setLoading(false);
    };

    fetchExpenses();
  }, []);

  return (
    <div>
      <HomeNavbar token={token} freelancerName={freelancerName} />
      <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex", minHeight: "90vh",marginTop:7 }}>
          <CategoryWiseExpenses />
          <Box component="main" sx={{ flexGrow: 1, p: 3,  fontWeight:'bold' }}>
          <Typography variant="h6" gutterBottom sx={{marginBottom:5}}>
          <Link to="/addexpense" className="h-full w-1/3">
              <Button>Add an expense</Button>
            </Link>
                  </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card sx={{ p: 2, maxHeight: "70vh",width:'50vw', overflowY: "auto", boxShadow: 3, scrollbarWidth:'none',}}>
                  
                  {loading ? (
                    <Box>
                      <Spinner />
                    </Box>
                  ) : expenses.length > 0 ? (
                    <Box>
                      {expenses.map((expense) => (
                        <React.Fragment key={expense.id}>
                          <Box sx={{py:2,px:2}}>
                          <Typography variant="h6" color="textSecondary">
                            {expense.expense_title}
                          </Typography>
                          <Box 
  sx={{ 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center", 
    width: "100%", 
   
  }}
>
  <Typography variant="h8">{expense.date}</Typography>
  <Typography variant="h8">{expense.category}</Typography>
  <Typography variant="h8">${expense.amount}</Typography>
</Box>


                          </Box>
                          <Divider />
                        </React.Fragment>
                      ))}
                    </Box>
                  ) : (
                    <Typography color="textSecondary">No expenses found.</Typography>
                  )}
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default ExpensesDashboard;