import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useState } from "react";
import { Button, Divider, ListItemIcon } from "@mui/material";
import { Logout } from "@mui/icons-material";
import { useAuth } from "context/auth-context";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Button
              onClick={()=>navigate("/")}
              sx={{ color: "#fff" }}
              startIcon={<AssignmentIcon />}
            >
              <Typography variant="h6">Ticket Manager</Typography>
            </Button>
          </Box>

          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem style={{ pointerEvents: "none", fontWeight: "bold" }}>
                {user.email}
              </MenuItem>
              <Divider />
              <MenuItem onClick={logout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>{" "}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
