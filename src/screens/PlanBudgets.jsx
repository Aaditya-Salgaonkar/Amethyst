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
import HomeNavbar from "../components/HomeNavbar";
import { ThemeProvider } from "@mui/material";
import { theme } from "../components/Theme";
const Dashboard = ({token}) => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const [freelancerName, setFreelancerName] = useState(null);

  // Fetch freelancer's name on component mount
  useEffect(() => {
    const fetchFreelancerName = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      console.log(user)
      if (user) {
        // Fetch user's name (assuming it's stored in the user's profile or user table)
        setFreelancerName(user.email || "Freelancer");
      }
    };

    fetchFreelancerName();
  }, []);
    const fetchProjects = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data, error } = await supabase.from("projects").select("*").eq("freelancerId", token.user.id).order("due_date", { ascending: true });

            if (error) throw error;
            setProjects(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
      <div>
        <HomeNavbar token={token} freelancerName={freelancerName}></HomeNavbar>
        
        <ThemeProvider theme={theme}>
        <Container maxWidth="md" sx={{ mt: 4 }}>
     
     <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
         <Typography variant="h4" fontWeight="bold">
             Project Dashboard
         </Typography>
         <div className="">
             <Button variant="outlined" startIcon={<Refresh />} onClick={fetchProjects} sx={{ mr: 2 }}>
                 Refresh
             </Button>
             <Button variant="contained" startIcon={<AddCircleOutline />} onClick={() => navigate("/projectCreate")} sx={{ mr: 2 }}>
                 New Project
             </Button>
             <Button variant="contained" startIcon={<AddCircleOutline />} onClick={() => navigate("/projectUpdate")}>
                 Update Project
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

     <Grid container spacing={5}>
         {projects.map((project) => (
             <Grid item xs={12} sm={6} key={project.p_id}>
                 <Card variant="outlined" sx={{borderRadius:10}}>
                     <CardContent sx={{padding:4, }}>
                         <Typography variant="h6" fontWeight="bold" color="textSecondary">
                             {project.name}
                         </Typography>
                         <Typography variant="body2" >
                             Status: {project.status}
                         </Typography>
                         <Typography variant="body2" >
                             Budget: ${project.budget_allocated}
                         </Typography>
                         <Typography variant="body2" >
                             Due Date: {project.due_date}
                         </Typography>
                         <Typography variant="body2" color={project.payment_status ? "green" : "red"}>
                             Payment Status: {project.payment_status ? "Paid" : "Pending"}
                         </Typography>
                         <CardActions sx={{marginTop:2,}}>
                         <Button size="small" color="primary">
                             View Details
                         </Button>
                     </CardActions>
                     </CardContent>
                     
                 </Card>
             </Grid>
         ))}
     </Grid>
 </Container>
        </ThemeProvider>
      </div>
    );
};

export default Dashboard;
