import {
  Button,
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  ListItemIcon,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { types } from "../assets/ticket-types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "api/service";
import { useAuth } from "context/auth-context";

export default function Dialog(props) {
  const { open, projectId, ticketId, emails, handleClose, handleSave } = props;
  const { logout } = useAuth();
  const blankForm = {
    description: "",
    type: "",
    assignedTo: "",
    priority: 1,
    projectId: projectId,
  };
  const [form, setForm] = useState(blankForm);
  const fetchData = async () => {
    if (ticketId) {
      try {
        const { data } = await api.get(`/api/tickets/ticket/${ticketId}`);
        setForm({
          description: data.description,
          type: data.type,
          assignedTo: data.assignedTo,
          priority: data.priority,
          projectId: data.projectId,
        });
      } catch (err) {
        if (err.response.status === 401) logout();
        toast.error(err.response.data.message);
        console.error(err);
      }
    } else {
      setForm(blankForm);
    }
  };

  useEffect(() => {
    fetchData();
  }, [ticketId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleRadioChange = (event, value) => {
    const { name } = event.target;
    setForm((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <MuiDialog open={open} onClose={handleClose}>
      <form onSubmit={(e) => handleSave(e, form)}>
        <DialogTitle>Ticket</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in all the information pertaining to this ticket.
          </DialogContentText>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            multiline
            rows={4}
          />
          <FormControl fullWidth required margin="normal">
            <InputLabel id="type">Type</InputLabel>
            <Select
              variant="outlined"
              label="Type"
              name="type"
              value={form.type}
              labelId="type"
              sx={{
                "& .MuiSelect-select": {
                  display: "flex",
                  aligmItems: "center",
                  justifyContent: "flex-start",
                },
              }}
              onChange={handleChange}
            >
              {types.map((data) => (
                <MenuItem key={`${data.id}Item`} value={data.name}>
                  <ListItemIcon sx={{ color: data.color }}>
                    {data.icon}
                  </ListItemIcon>
                  {data.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth required margin="normal">
            <InputLabel id="assignedTo">Assigned To</InputLabel>
            <Select
              variant="outlined"
              label="Assigned To"
              name="assignedTo"
              labelId="assignedTo"
              value={form.assignedTo}
              onChange={handleChange}
            >
              {emails.map((email, i) => (
                <MenuItem key={`email${i}`} value={email}>
                  {email}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            fullWidth
            required
            margin="normal"
            sx={{
              "& .Mui-checked": {
                color: "#9c27b0",
              },
            }}
          >
            <FormLabel id="priority-label">Priority</FormLabel>
            <RadioGroup
              row
              aria-labelledby="priority-label"
              name="priority"
              value={form.priority}
              defaultValue={"1"}
              onChange={handleRadioChange}
            >
              {[1, 2, 3, 4, 5].map((val, i) => (
                <FormControlLabel
                  key={`priority${i}`}
                  id={`priority${i}`}
                  value={val}
                  control={<Radio />}
                  label={val}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="info" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="outlined" color="secondary" type="submit">
            Save
          </Button>
        </DialogActions>
      </form>
    </MuiDialog>
  );
}
