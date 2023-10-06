import { useEffect, useRef, useState } from "react";
import api from "api/service";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Checkbox,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import toast from "react-hot-toast";
import { useAuth } from "context/auth-context";

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}
const Form = styled("form")(() => ({
  width: "800px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));
export default function Project(props) {
  const { projectId, mode } = props;
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    emails: [],
    color: "",
  });
  let isFetching = useRef(false);
  const getRandomNumber = (limit) => {
    return Math.floor(Math.random() * limit);
  };

  const getRandomColor = () => {
    const h = getRandomNumber(360);
    const randomColor = `hsl(${h}deg, 50%, 35%)`;
    return randomColor;
  };

  const fetchData = async () => {
    try {
      let endpoints = [`/api/users`];
      if (projectId) {
        endpoints.push(`/api/projects/${projectId}`);
      }
      const promises = endpoints.map(async (endpoint) => {
        const { data } = await api.get(endpoint);
        return data;
      });
      const result = await Promise.all(promises);
      let usersAllowed = result[0].map((user) => user.email);
      if (projectId) {
        const project = result[1];
        setProjectData({
          name: project.name,
          description: project.description,
          emails: project.emails,
          color: project.color,
        });
        setRight(project.emails);
        usersAllowed = usersAllowed.filter(
          (email) => !project.emails.includes(email)
        );
      }
      setLeft(usersAllowed);
    } catch (err) {
      if (err.response.status === 401) logout();
      toast.error(err.response.data.message);
      console.error(err);
    }
  };

  useEffect(() => {
    if (isFetching.current) return;
    fetchData();
    isFetching.current = true;
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProjectData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description } = projectData;
    if (!right.length) {
      toast.error("At least one user must be selected");
      return;
    }
    try {
      const emails = right;
      if (mode === "Add") {
        const color = getRandomColor();
        await api.post("/api/projects", {
          name,
          description,
          emails,
          color,
        });
      } else {
        const { color } = projectData;
        await api.put(`/api/projects/${projectId}`, {
          name,
          description,
          emails,
          color,
        });
      }
      navigate("/");
      toast.success(`Project ${mode === "Add" ? "created" : "updated"}!`);
    } catch (err) {
      if (err.response.status === 401) logout();
      toast.error(err.response.data.message);
      console.error(err);
    }
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title, items) => (
    <Card variant="outlined">
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            color="secondary"
            onClick={handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              "aria-label": "all items selected",
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List
        sx={{
          width: 350,
          height: 230,
          bgcolor: "background.paper",
          overflow: "auto",
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  color="secondary"
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value} />
            </ListItem>
          );
        })}
      </List>
    </Card>
  );

  return (
    <Box
      margin={2}
      display="flex"
      alignContent="center"
      alignItems="center"
      justifyContent="center"
    >
      <Form onSubmit={handleSubmit}>
        <Typography component="h1" variant="h5">
          {mode} Project
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Name"
          name="name"
          value={projectData.name}
          sx={{ backgroundColor: "#fff" }}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Description"
          name="description"
          sx={{ backgroundColor: "#fff" }}
          value={projectData.description}
          onChange={handleChange}
          multiline
          rows={4}
        />
        <Grid
          container
          spacing={2}
          margin="15px 0"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item sx={{ paddingLeft: "0 !important" }}>
            {customList("Available Users", left)}
          </Grid>
          <Grid item>
            <Grid container direction="column" alignItems="center">
              <Button
                sx={{ my: 0.5, backgroundColor: "#fff" }}
                variant="outlined"
                color="secondary"
                size="small"
                onClick={handleCheckedRight}
                disabled={leftChecked.length === 0}
                aria-label="move selected right"
              >
                &gt;
              </Button>
              <Button
                sx={{ my: 0.5, backgroundColor: "#fff" }}
                variant="outlined"
                color="secondary"
                size="small"
                onClick={handleCheckedLeft}
                disabled={rightChecked.length === 0}
                aria-label="move selected left"
              >
                &lt;
              </Button>
            </Grid>
          </Grid>
          <Grid item>{customList("Users in Project", right)}</Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          sx={{ textTransform: "none", marginTop: "5px" }}
        >
          Submit
        </Button>
      </Form>
    </Box>
  );
}
