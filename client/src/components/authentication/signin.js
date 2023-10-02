import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import api from "api/service";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Form = styled("form")(({ theme }) => ({
  width: "100%", // Fix IE 11 issue.
  marginTop: theme.spacing(1),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));
const Submit = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));
const LinkButton = styled(Link)({
  cursor: "pointer",
});
function Signin(props) {
  const { goToSignIn } = props;
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      await api.post("/api/users/login", {
        email,
        password,
      });
      navigate('/');
      toast.success("Login Successful. Welcome Back!");
    } catch (err) {
      toast.error(err.response.data.message);
      console.error(err);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };
  return (
    <>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Form onSubmit={loginUser}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Email Address"
          name="email"
          autoFocus
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          onChange={handleChange}
        />
        <Submit
          type="submit"
          variant="contained"
          color="secondary"
          sx={{ textTransform: "none" }}
        >
          Submit
        </Submit>
        <Box mt={5}>
          <Typography variant="body2" color="textPrimary" align="center">
            <LinkButton variant="body2" onClick={() => goToSignIn(false)}>
              {"Don't have an account? Sign up"}
            </LinkButton>
          </Typography>
        </Box>
      </Form>
    </>
  );
}

export default Signin;
