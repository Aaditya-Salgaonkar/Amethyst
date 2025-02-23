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
  Button,
  Select,
  MenuItem,
  FormControl,
  Box,
  InputLabel
} from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { theme } from "../components/Theme";
import HomeNavbar from "../components/HomeNavbar";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { validate as isUuid } from 'uuid';

const Payments = ({ token }) => {
  const [invoices, setInvoices] = useState([]);
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [freelancerId, setFreelancerId] = useState(null);
  const [freelancerName, setFreelancerName] = useState(null);
  
  // Fetch freelancer's name and ID on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setFreelancerName(user.email || "Freelancer");
        setFreelancerId(user.id);
      }
    };
    fetchUserData();
  }, []);

  // Fetch Projects and Clients based on Freelancer ID
  useEffect(() => {
    if (freelancerId) {
      fetchProjects();
      fetchClients();
    }
  }, [freelancerId]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const { data: projectData, error } = await supabase
        .from("projects")
        .select("p_id, name, budget_allocated, start_date, payment_status, paymentDate, client_id")
        .eq("freelancerId", freelancerId);

      if (error) throw error;
      setProjects(projectData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchClients = async () => {
    try {
      const { data: clientData, error } = await supabase
        .from("clients")
        .select("id, name");

      if (error) throw error;
      setClients(clientData);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchInvoices = async (projectIds) => {
    if (!projectIds.length) return;

    setLoading(true);
    try {
      const { data: invoiceData, error } = await supabase
        .from("invoice")
        .select("id, project_id, issued_date, due_date, status, payment_method, payment_date")
        .in("project_id", projectIds);

      if (error) throw error;
      setInvoices(invoiceData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const generateInvoicePDF = (invoice, project) => {
    const doc = new jsPDF();
    const margin = 15;
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    // Set background color with a gradient
    doc.setDrawColor(255, 255, 255); // White borders
    doc.setFillColor(240, 240, 240); // Light background color
    doc.rect(0, 0, pageWidth, pageHeight, 'F'); // Draw background rectangle

    // Header Section with Title
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 51, 102); // Dark blue color for title
    doc.text("Invoice Details", pageWidth / 2 - 50, 40, null, null, 'center'); // Centered title
    
    // Invoice Information Section - Stacked vertically
    const tableStartY = 70;
    const lineHeight = 12;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 50, 50);

    // Invoice Details
    const rowHeight = lineHeight * 1.5;
    doc.text(`Invoice ID: ${invoice.id}`, margin, tableStartY);
    doc.text(`Client Name: ${getClientName(project.client_id)}`, margin, tableStartY + rowHeight);
    doc.text(`Project Cost: ${project.budget_allocated} USD`, margin, tableStartY + rowHeight * 2);
    doc.text(`Payment Date: ${project.paymentDate ? new Date(project.paymentDate).toLocaleDateString() : "N/A"}`, margin, tableStartY + rowHeight * 3);
    doc.text(`Status: ${invoice.status}`, margin, tableStartY + rowHeight * 4);
    
    // Line separator between sections
    doc.setLineWidth(0.5);
    doc.line(margin, tableStartY + rowHeight * 5 + 5, pageWidth - margin, tableStartY + rowHeight * 5 + 5);

    // Project Details Section - Stacked vertically
    const projectStartY = tableStartY + rowHeight * 6;
    doc.text(`Project Name: ${project.name}`, margin, projectStartY);
    doc.text(`Start Date: ${new Date(project.start_date).toLocaleDateString()}`, margin, projectStartY + rowHeight * 1);

    // Footer Section
    const footerText = 'For inquiries, contact support@worksphere.com';
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(footerText, pageWidth / 2 - doc.getTextWidth(footerText) / 2, pageHeight - 20);

    // Save the PDF
    doc.save(`Invoice_${invoice.id}.pdf`);
  };

  const updatePaymentStatus = async (invoiceId, newStatus, projectId) => {
    try {
      const { error: invoiceError } = await supabase
        .from("invoice")
        .update({ status: newStatus, payment_date: new Date() })
        .eq("id", invoiceId);

      if (invoiceError) throw invoiceError;

      if (newStatus === "paid") {
        const { error: projectError } = await supabase
          .from("projects")
          .update({ payment_status: true })
          .eq("p_id", projectId);

        if (projectError) throw projectError;
      }

      // Update invoice status in the state
      setInvoices(prevInvoices =>
        prevInvoices.map(invoice =>
          invoice.id === invoiceId ? { ...invoice, status: newStatus } : invoice
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const getClientName = (clientId) => {
    if (!clientId || !isUuid(clientId)) return "Unknown Client";
    const client = clients.find(client => client.id === clientId);
    return client ? client.name : "Unknown Client";
  };

  const getProjectDetails = (projectId) => {
    return projects.find(project => project.p_id === projectId);
  };

  useEffect(() => {
    if (projects.length > 0) {
      const projectIds = projects.map(p => p.p_id);
      fetchInvoices(projectIds);
    }
  }, [projects]);

  return (
    <div>
      <HomeNavbar token={token} freelancerName={freelancerName} />
      <ThemeProvider theme={theme}>
        <Container maxWidth="lg" sx={{ mt: 10 }}>
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
            Payments
          </Typography>

          {loading && (
            <div style={{ textAlign: "center" }}>
              <CircularProgress />
            </div>
          )}

          {error && <Alert severity="error">{error}</Alert>}

         

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Invoice ID</b></TableCell>
                  <TableCell><b>Project Name</b></TableCell>
                  <TableCell><b>Client Name</b></TableCell>
                  <TableCell><b>Project Cost</b></TableCell>
                  <TableCell><b>Start Date</b></TableCell>
                  <TableCell><b>Payment Date</b></TableCell>
                  <TableCell><b>Status</b></TableCell>
                  <TableCell><b>Actions</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoices.map((invoice) => {
                  const project = getProjectDetails(invoice.project_id);
                  return (
                    <TableRow key={invoice.id}>
                      <TableCell>{invoice.id}</TableCell>
                      <TableCell>{project ? project.name : "N/A"}</TableCell>
                      <TableCell>{project ? getClientName(project.client_id) : "N/A"}</TableCell>
                      <TableCell>{project ? project.budget_allocated : "N/A"}</TableCell>
                      <TableCell>{project ? new Date(project.start_date).toLocaleDateString() : "N/A"}</TableCell>
                      <TableCell>{project ? new Date(project.paymentDate).toLocaleDateString() : "N/A"}</TableCell>
                      <TableCell>
                        <FormControl fullWidth>
                          <InputLabel>Status</InputLabel>
                          <Select
                            value={invoice.status}
                            onChange={(e) => updatePaymentStatus(invoice.id, e.target.value, invoice.project_id)}
                          >
                            <MenuItem value="pending">Pending</MenuItem>
                            <MenuItem value="paid">Paid</MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        {(invoice.status === "paid" || invoice.status === "Paid") && (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => generateInvoicePDF(invoice, project)}
                          >
                            Download PDF
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default Payments;
