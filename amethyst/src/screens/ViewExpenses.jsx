import { useState, useEffect } from "react";
import { supabase } from "../client";
import {
  CircularProgress,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const ExpensesList = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      const { data, error } = await supabase
        .from("expenses") // Table name
        .select("*")
        .order("date", { ascending: false });

      if (error) {
        console.error("Error fetching expenses:", error);
      } else {
        setExpenses(data);
      }
      setLoading(false);
    };

    fetchExpenses();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        All Expenses
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : expenses.length === 0 ? (
        <Typography>No expenses found.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Title</strong></TableCell>
                <TableCell><strong>Amount (₹)</strong></TableCell>
                <TableCell><strong>Category</strong></TableCell>
                <TableCell><strong>Date</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{expense.expense_title}</TableCell>
                  <TableCell>₹{expense.amount}</TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default ExpensesList;
