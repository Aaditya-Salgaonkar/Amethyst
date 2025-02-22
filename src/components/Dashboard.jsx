import { useEffect, useState } from "react";
import { supabase } from "../client";
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
    CircularProgress,
    Alert,
} from "@mui/material";
import { Refresh, AddCircleOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Dashboard = ({token}) => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data, error } = await supabase.from("projects").select("*").order("due_date", { ascending: true });

            if (error) throw error;
            setProjects(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
     
            <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight="bold">
                    Project Dashboard
                </Typography>
                <div>
                    <Button variant="outlined" startIcon={<Refresh />} onClick={fetchProjects} sx={{ mr: 2 }}>
                        Refresh
                    </Button>
                    <Button variant="contained" startIcon={<AddCircleOutline />} onClick={() => navigate("/projectCreate")}>
                        New Project
                    </Button>
                </div>
            </Grid>

            {loading && (
                <Grid container justifyContent="center">
                    <CircularProgress />
                </Grid>
            )}

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            {!loading && projects.length === 0 && (
                <Typography variant="body1" align="center" color="textSecondary">
                    No projects found.
                </Typography>
            )}

            <Grid container spacing={3}>
                {projects.map((project) => (
                    <Grid item xs={12} sm={6} key={project.p_id}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h6" fontWeight="bold">
                                    {project.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Status: {project.status}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Budget: ${project.budget_allocated}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Due Date: {project.due_date}
                                </Typography>
                                <Typography variant="body2" color={project.payment_status ? "green" : "red"}>
                                    Payment Status: {project.payment_status ? "Paid" : "Pending"}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary">
                                    View Details
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Dashboard;
