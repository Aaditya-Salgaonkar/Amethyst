import { useEffect, useState } from "react";
import { supabase } from "../client";
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Alert,
} from "@mui/material";
import HomeNavbar from "../components/HomeNavbar";
const Payments = ({token}) => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data, error } = await supabase
                .from("transactions")
                .select("id, invoice_id, amount_paid, payment_method, transaction_date, expense_title")
                .order("transaction_date", { ascending: false });

            if (error) throw error;
            setTransactions(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <HomeNavbar token={token} />
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
                Payments & Transactions
            </Typography>

            {loading && (
                <div style={{ textAlign: "center" }}>
                    <CircularProgress />
                </div>
            )}

            {error && <Alert severity="error">{error}</Alert>}

            {!loading && transactions.length === 0 && (
                <Typography variant="body1" color="textSecondary">
                    No transactions found.
                </Typography>
            )}

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Transaction ID</b></TableCell>
                            <TableCell><b>Invoice ID</b></TableCell>
                            <TableCell><b>Amount Paid</b></TableCell>
                            <TableCell><b>Payment Method</b></TableCell>
                            <TableCell><b>Date</b></TableCell>
                            <TableCell><b>Expense Title</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.map((txn) => (
                            <TableRow key={txn.id}>
                                <TableCell>{txn.id}</TableCell>
                                <TableCell>{txn.invoice_id}</TableCell>
                                <TableCell>${txn.amount_paid}</TableCell>
                                <TableCell>{txn.payment_method}</TableCell>
                                <TableCell>{new Date(txn.transaction_date).toLocaleDateString()}</TableCell>
                                <TableCell>{txn.expense_title}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
        </div>
    );
};

export default Payments;
