import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import api from "api/service";
import toast from "react-hot-toast";
const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const Form = styled("form")(({ theme }) => ({
  width: "100%",
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
function Signup(props) {
  const { goToSignIn } = props;
  const [submitClicked, setSubmitClicked] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    password2: "",
  });
  const registerUser = async (e) => {
    e.preventDefault();
    setSubmitClicked(true);
    const { email, password, password2 } = data;
    if (
      !emailRegex.test(email) ||
      (password !== password2 && password !== "" && password2 !== "")
    ) {
      return;
    }
    try {
      await api.post("/api/users/register", {
        email,
        password,
      });
      toast.success("Account created. Welcome!");
    } catch (err) {
      toast.error(err.response.data.message);
      console.error(err);
    }
  };
  const checkPasswords = () => {
    return (
      data.password !== data.password2 &&
      data.password !== "" &&
      data.password2 !== ""
    );
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };
  return (
    <>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Form onSubmit={registerUser}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Email Address"
          name="email"
          autoFocus
          onChange={handleChange}
          error={submitClicked && !emailRegex.test(data.email)}
          helperText={
            submitClicked && !emailRegex.test(data.email) ? "Invalid email" : ""
          }
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
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password2"
          label="Re-enter Password"
          type="password"
          onChange={handleChange}
          error={submitClicked && checkPasswords()}
          helperText={
            submitClicked && checkPasswords() ? "Passwords do not match" : ""
          }
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
            <LinkButton variant="body2" onClick={() => goToSignIn(true)}>
              {"Already have an account? Sign in"}
            </LinkButton>
          </Typography>
        </Box>
      </Form>
    </>
  );
}

export default Signup;
