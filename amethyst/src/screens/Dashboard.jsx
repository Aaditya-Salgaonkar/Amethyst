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
  Alert,
  Box,
  Stack,
  Divider,
} from "@mui/material";
import Spinner from "../components/Spinner";
import { Refresh, AddCircleOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { theme } from "../components/Theme";
const Dashboard = ({ token }) => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("freelancerId", token.user.id)
        .order("due_date", { ascending: true });

      if (error) throw error;
      setProjects(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box
      sx={{
        width: "90%",
        height: "auto",
        marginTop: "4%",
        overflowY: "auto",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {loading === true ? (
        <Spinner />
      ) : (
        <div>
          <ThemeProvider theme={theme}>
            <Container maxWidth="md" sx={{ mt: 4 }}>
              <Grid2
                container
                justifyContent="flex-start"
                alignItems="center"
                sx={{ mb: 4 }}
              >
                <Stack direction={"column"} sx={{ height: "60px" }}>
                  <Typography variant="h4" fontWeight="bold">
                    Project Dashboard
                  </Typography>
                  <Box
                    height={"18%"}
                    width={"110%"}
                    sx={{
                      background:
                        "linear-gradient(135deg, rgb(255, 77, 0) 5%, rgb(255, 77, 0) 35%, rgb(255, 153, 51) 60%)",
                      clipPath: "polygon(0 0, 96% 0, 100% 100%, 0 100%)",
                    }}
                  />
                </Stack>
                <Box sx={{ flexGrow: 0.8 }} />
                <div className="">
                  <Button
                    variant="outlined"
                    startIcon={<Refresh />}
                    onClick={fetchProjects}
                    sx={{ mr: 2 }}
                  >
                    Refresh
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<AddCircleOutline />}
                    onClick={() => navigate("/projectCreate")}
                    sx={{ mr: 2 }}
                  >
                    New Project
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<AddCircleOutline />}
                    onClick={() => navigate("/projectUpdate")}
                    sx={{ mr: 2 }}
                  >
                    Update Project
                  </Button>
                </div>
              </Grid2>
              <Grid2 container spacing={5}>
                {projects.length === 0 ? (
                  <Typography
                    variant="h6"
                    sx={{ textAlign: "center", width: "100%" }}
                  >
                    No projects found.
                  </Typography>
                ) : (
                  projects.map((project) => (
                    <Grid2 item xs={12} sm={6} key={project.p_id}>
                      <Card
                        variant="outlined"
                        sx={{
                          borderRadius: 5,
                          transition: "0.3s",
                          background:
                            "linear-gradient(135deg, rgb(15, 15, 15) 0%, rgb(26, 26, 26) 100%)",
                          boxShadow: "0 4px 10px rgba(15, 15, 15, 0.6)",
                          "&:hover": {
                            transform: "scale(1.05)",
                            boxShadow: "0 6px 15px rgba(15, 15, 15, 0.8)",
                          },
                          "&:active": {
                            transform: "scale(0.98)",
                            boxShadow: "0 2px 5px rgba(15, 15, 15, 0.4)",
                          },
                        }}
                      >
                        <CardContent sx={{ padding: 4, color: "white" }}>
                          <Typography variant="h6" fontWeight="bold">
                            {project.name}
                          </Typography>
                          <Divider sx={{ backgroundColor: "white", my: 1 }} />
                          <Typography variant="body2" mt={1}>
                            Status: {project.status ? "Active" : "Completed"}
                          </Typography>
                          <Typography variant="body2" mt={1}>
                            Budget: ${project.budget_allocated}
                          </Typography>
                          <Typography variant="body2">
                            Due Date: {project.due_date}
                          </Typography>
                          <Typography
                            variant="body2"
                            mt={1}
                            color={
                              project.payment_status ? "#4CAF50" : "#FF5252"
                            }
                          >
                            Pay Status:{" "}
                            {project.payment_status ? "Paid" : "Pending"}
                          </Typography>
                          <CardActions sx={{ marginTop: 2 }}>
                            <Button
                              size="small"
                              variant="contained"
                              sx={{
                                color: "rgb(255, 255, 255)",
                              }}
                            >
                              <b>View Details</b>
                            </Button>
                          </CardActions>
                        </CardContent>
                      </Card>
                    </Grid2>
                  ))
                )}
              </Grid2>
            </Container>
          </ThemeProvider>
        </div>
      )}
    </Box>
  );
};

export default Dashboard;
