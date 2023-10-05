import { useEffect, useMemo, useRef, useState } from "react";
import api from "api/service";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  IconButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import toast from "react-hot-toast";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "components/dialog";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { types } from "../assets/ticket-types";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Delete from "components/delete";
import { useAuth } from "context/auth-context";
const Container = styled("div")(() => ({
  width: "800px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));
export default function Tickets(props) {
  const { projectId, ticketId } = props;
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [emails, setEmails] = useState([]);
  let isFetching = useRef(false);
  const columns = useMemo(
    () => [
      {
        field: "icon",
        headerName: "",
        width: 60,
        renderCell: (params) => {
          const iconObj = types.find((x) => x.name === params.row.type);
          return (
            <ListItemIcon sx={{ color: iconObj.color }}>
              {iconObj.icon}
            </ListItemIcon>
          );
        },
        sortable: false,
        filterable: false,
      },
      { field: "description", headerName: "Description", width: 400 },
      { field: "type", headerName: "Type" },
      { field: "assignedTo", headerName: "Assigned To", width: 250 },
      { field: "priority", headerName: "Priority" },
      {
        field: "edit",
        headerName: "Edit",
        type: "actions",
        getActions: (params) => [
          <IconButton
            color="secondary"
            aria-label="edit"
            onClick={() =>
              navigate(`/project/${projectId}/tickets/${params.row._id}`)
            }
          >
            <EditNoteIcon />
          </IconButton>,
        ],
      },
      {
        field: "delete",
        headerName: "Delete",
        type: "actions",
        getActions: (params) => [
          <IconButton
            color="error"
            aria-label="delete"
            onClick={() => {
              setDeleteItem(params.row);
              setOpenDelete(true);
            }}
          >
            <DeleteForeverIcon />
          </IconButton>,
        ],
      },
    ],
    []
  );

  const fetchData = async () => {
    try {
      let endpoints = [`/api/tickets/project/${projectId}`, `/api/projects/${projectId}`];
      const promises = endpoints.map(async (endpoint) => {
        const { data } = await api.get(endpoint);
        return data;
      });
      const result = await Promise.all(promises);
      setTickets(result[0]);
      setEmails(result[1].emails);
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

  const handleClose = (event, reason) => {
    if (reason && reason === "backdropClick") return;
    setOpen(false);
    navigate(`/project/${projectId}/tickets`);
  };
  const handleSave = async (event, form) => {
    event.preventDefault();
    const { description, type, assignedTo, priority, projectId } = form;
    try {
      const data = {
        description,
        type,
        assignedTo,
        priority,
        projectId,
      };
      ticketId
        ? await api.put(`/api/tickets/ticket/${ticketId}`, data)
        : await api.post("/api/tickets", data);
      toast.success(`Ticket ${ticketId ? "updated" : "created"}!`);
    } catch (err) {
      if (err.response.status === 401) logout();
      toast.error(err.response.data.message);
      console.error(err);
    }
    setOpen(false);
    navigate(`/project/${projectId}/tickets`);
    fetchData();
  };
  const handleDeleteClose = (event, reason) => {
    if (reason && reason === "backdropClick") return;
    setOpenDelete(false);
    setDeleteItem(null);
  };
  const handleDelete = async () => {
    try {
      await api.delete(`/api/tickets/ticket/${deleteItem._id}`);
      toast.success(`Ticket deleted!`);
    } catch (err) {
      if (err.response.status === 401) logout();
      toast.error(err.response.data.message);
      console.error(err);
    }
    setOpenDelete(false);
    setDeleteItem(null);
    fetchData();
  };

  useEffect(() => {
    if (ticketId) setOpen(true);
  }, [ticketId]);
  return (
    <Box
      margin={2}
      display="flex"
      alignContent="center"
      alignItems="center"
      justifyContent="center"
      overflow="auto"
    >
      <Container>
        <Typography component="h1" variant="h5">
          Tickets
        </Typography>
        <Box
          m={1}
          width="100%"
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
          >
            Add Ticket
          </Button>
        </Box>
        <DataGrid
          columns={columns}
          rows={tickets}
          getRowId={(row) => row._id}
          getRowSpacing={(params) => ({
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 0 : 5,
          })}
          sx={{
            [`& .${gridClasses.row}`]: {
              bgcolor: (theme) => theme.palette.grey,
            },
            backgroundColor: "#fff",
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: 600,
            },
            "& .MuiDataGrid-cell:hover": {
              color: "primary.secondary",
            },
          }}
        />
      </Container>
      <Dialog
        open={open}
        emails={emails}
        projectId={projectId}
        ticketId={ticketId}
        handleClose={handleClose}
        handleSave={handleSave}
      />
      <Delete
        open={openDelete}
        handleClose={handleDeleteClose}
        handleDelete={handleDelete}
      />
    </Box>
  );
}
