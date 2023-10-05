import { EmojiObjects } from "@mui/icons-material";
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  Button,
  ListItemButton,
  TextField,
  ListItemIcon,
} from "@mui/material";
import { useAuth } from "context/auth-context";
import { useEffect, useRef, useState } from "react";
import api from "api/service";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { types } from "../assets/ticket-types";
import PieChart from "components/pie-chart";
import toast from "react-hot-toast";

const cardBGColor = "#fff";
const filterData = (query, data) => {
  if (!query) {
    return data;
  } else {
    return data?.filter((d) => d?.name.toLowerCase().includes(query));
  }
};
function Home({ title }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const projectsFiltered = filterData(searchQuery, projects);
  let isFetching = useRef(false);
  useEffect(() => {
    document.title = title;
  }, [title]);
  const fetchData = async () => {
    try {
      let endpoints = ["/api/projects", "/api/tickets"];
      const promises = endpoints.map(async (endpoint) => {
        const { data } = await api.get(endpoint);
        return data;
      });
      const result = await Promise.all(promises);
      setProjects(result[0]);
      setTickets(result[1]);
    } catch (error) {
      logout();
      navigate("/login");
      if (error.response) {
        toast.error(error.response.data.message);
        console.error(error.response.data);
      }
    }
  };

  useEffect(() => {
    if (isFetching.current) return;
    fetchData();
    isFetching.current = true;
  }, []);

  const getTicketIcon = (ticket) => {
    const iconObj = types.find((x) => x.name === ticket.type);
    return (
      <ListItemIcon sx={{ color: iconObj.color }}>{iconObj.icon}</ListItemIcon>
    );
  };
  return (
    <Box
      margin={5}
      sx={{
        display: { xs: "flex", md: "grid" },
        gridTemplateColumns: "repeat(3,1fr)",
        gridAutoRows: "minmax(100px, auto)",
        gap: 3,
        textAlign: "center",
        flexDirection: "column",
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          p: 3,
          backgroundColor: cardBGColor,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4">Total Projects</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <EmojiObjects
            sx={{ height: 100, width: 100, mr: 1, color: "#9c27b0" }}
          />
          <Typography variant="h4">{projects.length}</Typography>
        </Box>
      </Paper>
      <Paper variant="outlined" sx={{ p: 3, backgroundColor: cardBGColor }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PieChart tickets={tickets} />
        </Box>
      </Paper>
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          gridColumn: 3,
          gridRow: "1/4",
          backgroundColor: cardBGColor,
        }}
      >
        <Box>
          <Typography variant="h5">Assigned Tickets</Typography>
          <List>
            {tickets.map((ticket, i) => (
              <Box key={ticket._id}>
                <ListItem>
                  <ListItemButton
                    onClick={() =>
                      navigate(
                        `/project/${ticket.projectId}/tickets/${ticket._id}`
                      )
                    }
                  >
                    <ListItemAvatar>{getTicketIcon(ticket)}</ListItemAvatar>
                    <ListItemText
                      primary={ticket.description}
                      secondary={
                        <span
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <span>
                            <span style={{ color: "#9c27b0" }}>Priority: </span>
                            {ticket.priority}
                          </span>
                          <span>
                            {new Date(ticket.createdAt).toLocaleString(
                              "en-US",
                              { day: "numeric", month: "long", year: "numeric" }
                            )}
                          </span>
                        </span>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                {i !== projectsFiltered.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        </Box>
      </Paper>
      <Paper
        variant="outlined"
        sx={{ p: 2, gridColumn: "1/3", backgroundColor: cardBGColor }}
      >
        <Box
          m={1}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <TextField
            id="search-bar"
            className="text"
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            label="Enter a project name"
            variant="outlined"
            placeholder="Search..."
            size="small"
            sx={{ width: "500px" }}
          />

          <Button
            variant="outlined"
            color="secondary"
            startIcon={<AddIcon />}
            onClick={() => navigate("/project")}
          >
            New Project
          </Button>
        </Box>
        <List>
          {projectsFiltered.map((project, i) => (
            <Box key={project._id}>
              <ListItem>
                <ListItemButton
                  onClick={() => navigate(`/project/${project._id}`)}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: project.color }}>
                      {project.name.charAt(0)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={project.name}
                    secondary={project.description}
                  />
                </ListItemButton>
              </ListItem>
              {i !== projectsFiltered.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      </Paper>
    </Box>
  );
}

export default Home;
