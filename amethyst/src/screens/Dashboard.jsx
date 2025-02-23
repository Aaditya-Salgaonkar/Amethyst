import { useEffect, useState } from "react";
import { supabase } from "../client";
import {
    Container,
    Typography,
    Grid2,
    Card,
    CardContent,
    CardActions,
    Button,
    CircularProgress,
    Alert,
    Box,
    Stack,
} from "@mui/material";
import { Refresh, AddCircleOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
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
        
        <Box sx={{
            width: '90%',
            height: 'auto',
            marginTop: "4%",
            overflowY: 'auto',
            scrollbarWidth: 'none', 
            '&::-webkit-scrollbar': {
                display: 'none' 
            }
        }}>
      <div>
        <ThemeProvider theme={theme}>
        <Container maxWidth="md" sx={{ mt: 4 }}>
     
     <Grid2 container justifyContent="flex-start" alignItems="center" sx={{ mb: 4 }}>
         <Stack direction={"column"} sx={{height: '60px'}}>
         <Typography  variant="h4" fontWeight="bold" >
             Project Dashboard
         </Typography>
         <Box height={"18%"} width={"110%"} sx={{
            background: 'linear-gradient(135deg, rgb(255, 77, 0) 5%, rgb(255, 77, 0) 35%, rgb(255, 153, 51) 60%)',
            clipPath: 'polygon(0 0, 96% 0, 100% 100%, 0 100%)'
            }}/>
         </Stack>
         <Box sx={{ flexGrow: 0.8 }} />
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
     </Grid2>

     {loading && (
         <Grid2 container justifyContent="center">
             <CircularProgress />
         </Grid2>
     )}

     {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

     {!loading && projects.length === 0 && (
         <Typography variant="body1" align="center" color="textSecondary">
             No projects found.
         </Typography>
     )}

     <Grid2 container spacing={5}>
         {projects.map((project) => (
             <Grid2 item xs={12} sm={6} key={project.p_id}>
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
             </Grid2>
         ))}
         
            </Grid2>
            </Container>
        </ThemeProvider>
      </div>
      </Box>

    );
};

export default Dashboard;
