import React, { useState } from "react";
import { Container, Grid, Paper, Typography, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import SideNavBar from "../components/SideNavBar"; // Assuming you have a Sidebar
import { theme } from "../components/Theme";
import { ThemeProvider,Box } from "@mui/material";
const initialPayments = [
  { id: 1, title: "Electricity Bill", amount: 120, date: "2024-02-15", category: "Utilities" },
  { id: 2, title: "Netflix Subscription", amount: 15, date: "2024-02-10", category: "Entertainment" },
  { id: 3, title: "Gym Membership", amount: 50, date: "2024-02-05", category: "Health" },
];

const Payments = () => {
  const [payments, setPayments] = useState(initialPayments);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDelete = (id) => {
    setPayments(payments.filter(payment => payment.id !== id));
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredPayments = payments.filter(payment => 
    payment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid container spacing={2} sx={{ backgroundColor: theme.palette.background.default, minHeight: "100vh" }}>
      
     
      <Grid item xs={10}>
        <Container>
          <Typography variant="h4" sx={{ marginTop: 3, fontWeight: "bold" }}>Payments</Typography>

          <TextField
            label="Search Payments"
            variant="outlined"
            fullWidth
            sx={{ my: 2 }}
            value={searchQuery}
            onChange={handleSearch}
          />

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Title</strong></TableCell>
                  <TableCell><strong>Amount ($)</strong></TableCell>
                  <TableCell><strong>Date</strong></TableCell>
                  <TableCell><strong>Category</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.title}</TableCell>
                    <TableCell>${payment.amount}</TableCell>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>{payment.category}</TableCell>
                    <TableCell>
                      <IconButton color="primary"><Edit /></IconButton>
                      <IconButton color="error" onClick={() => handleDelete(payment.id)}><Delete /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Button variant="contained" color="primary" startIcon={<Add />} sx={{ mt: 3 }}>
            Add Payment
          </Button>
        </Container>
      </Grid>
    </Grid>
      </Box>
    </ThemeProvider>
    
  );
};

export default Payments;
