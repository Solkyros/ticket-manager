import {
  Button,
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export default function Delete(props) {
  const { open, handleClose, handleDelete } = props;
  return (
    <MuiDialog open={open} onClose={handleClose}>
      <DialogTitle>Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Do you really want to delete this ticket? This process cannot be
          undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="info" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="outlined" color="error" onClick={handleDelete}>
          Delete
        </Button>
      </DialogActions>
    </MuiDialog>
  );
}
