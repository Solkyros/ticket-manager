import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import api from "api/service";
import toast from "react-hot-toast";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useAuth } from "context/auth-context";
import { useNavigate } from "react-router-dom";
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
  const { login } = useAuth();
  const navigate = useNavigate();
  const [submitClicked, setSubmitClicked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    password2: "",
  });
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
      await api.post("/api/users/login", {
        email,
        password,
      });
      login({ data: data });
      navigate("/");
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
        <FormControl
          variant="outlined"
          fullWidth
          required
          margin="normal"
          onChange={handleChange}
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl
          variant="outlined"
          fullWidth
          required
          margin="normal"
          onChange={handleChange}
          error={submitClicked && checkPasswords()}
        >
          <InputLabel htmlFor="outlined-adornment-password2">
            Re-enter Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password2"
            name="password2"
            label="Re-enter Password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText>
            {submitClicked && checkPasswords() ? "Passwords do not match" : ""}
          </FormHelperText>
        </FormControl>
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
