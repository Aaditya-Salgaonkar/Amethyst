import React, { useEffect, useState } from "react";
import { supabase } from "../client";
import { Card, CardContent, Typography, Grid, CardActions, Button, CircularProgress, Alert, Box, Divider } from "@mui/material";
import { Refresh, AddCircleOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import HomeNavbar from "../components/HomeNavbar";
import { ThemeProvider } from "@mui/material";
import { theme } from "../components/Theme";

const FreelancerProjects = ({ token }) => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProjects();
    }, []);

    const [freelancerName, setFreelancerName] = useState(null);

    useEffect(() => {
        const fetchFreelancerName = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setFreelancerName(user.email || "Freelancer");
            }
        };
        fetchFreelancerName();
    }, []);

    const fetchProjects = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data, error } = await supabase
                .from("projects")
                .select(`p_id, name, start_date, due_date, budget_allocated, payment_status, paymentDate, subtasks, status, clients(name) `)
                .eq("freelancerId", token.user.id)
                .order("due_date", { ascending: true });

            if (error) throw error;
            setProjects(data || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <CircularProgress sx={{ display: "block", margin: "20px auto" }} />;
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <div>
            <HomeNavbar token={token} freelancerName={freelancerName} />
        <ThemeProvider theme={theme}>
            
            <Box sx={{ p: 4 }}>
                <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                    <Typography variant="h4" fontWeight="bold">
                        Project Dashboard
                    </Typography>
                    <Box>
                        <Button variant="outlined" startIcon={<Refresh />} onClick={fetchProjects} sx={{ mr: 2 }}>
                            Refresh
                        </Button>
                        <Button variant="contained" startIcon={<AddCircleOutline />} onClick={() => navigate("/projectCreate")} sx={{ mr: 2 }}>
                            New Project
                        </Button>
                        <Button variant="contained" startIcon={<AddCircleOutline />} onClick={() => navigate("/projectUpdate")} sx={{ mr: 2 }}>
                            Update Project
                        </Button>
                    </Box>
                </Grid>
                <Grid container spacing={4} justifyContent="center">
                    {projects.length === 0 ? (
                        <Typography variant="h6" sx={{ textAlign: "center", width: "100%" }}>
                            No projects found.
                        </Typography>
                    ) : (
                        projects.map((project) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={project.p_id}>
                                <Card variant="outlined" sx={{ borderRadius: 3, boxShadow: 5, p: 2, transition: "0.3s", '&:hover': { transform: "scale(1.05)" } }}>
                                    <CardContent>
                                        <Typography variant="h6" fontWeight="bold">
                                            {project.name}
                                        </Typography>
                                        <Divider sx={{ my: 1 }} />
                                        <Typography variant="body2">
                                            <strong>Client:</strong> {project.clients?.name || "N/A"}
                                        </Typography>
                                        <Typography variant="body2">
                                            <strong>Start Date:</strong> {project.start_date}
                                        </Typography>
                                        <Typography variant="body2">
                                            <strong>Due Date:</strong> {project.due_date}
                                        </Typography>
                                        <Typography variant="body2">
                                            <strong>Budget:</strong> ${project.budget_allocated}
                                        </Typography>
                                        <Typography variant="body2" color={project.payment_status ? "success.main" : "error.main"}>
                                            <strong>Payment Status:</strong> {project.payment_status ? "Paid" : "Pending"}
                                        </Typography>
                                        <Typography variant="body2">
                                            <strong>Payment Date:</strong> {project.paymentDate || "Not Paid Yet"}
                                        </Typography>
                                        <Typography variant="body2">
                                            <strong>Subtasks:</strong> {project.subtasks ? JSON.stringify(project.subtasks) : "No Subtasks"}
                                        </Typography>
                                        <Typography variant="body2">
                                            <strong>Status:</strong> {project.status ? "Active" : "Completed"}
                                        </Typography>
                                       
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    )}
                </Grid>
            </Box>
        </ThemeProvider>
        </div>
    );
};

export default FreelancerProjects;