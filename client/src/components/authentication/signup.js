import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const Form = styled("form")(({ theme }) => ({
    width: '100%',
    marginTop: theme.spacing(1),
    display:'flex',
    flexDirection:'column',
    alignItems:'center'
}));
const Submit = styled(Button)(({ theme }) => ({
    margin: theme.spacing(3, 0, 2)
}));
const LinkButton = styled(Link)({
    cursor: 'pointer'
});
function Signup(props) {
    const {goToSignIn} = props;
  return (
    <>
    <Typography component="h1" variant="h5">
      Sign up
      </Typography>
    <Form noValidate >
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Email Address"
        name="email"
        autoFocus
       />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
       />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="reenterPassword"
        label="Re-enter Password"
        type="password"
        />
      <Submit
        type="submit"
        variant="contained"
        color="secondary"
        sx={{textTransform: "none"}}
      >
        Submit
        </Submit>
      <Box mt={5}>
        <Typography variant="body2" color="textPrimary" align="center">
          <LinkButton variant="body2" onClick={()=>goToSignIn(true)}>
            {"Already have an account? Sign in"}
          </LinkButton>
        </Typography>
      </Box>
    </Form>
  </>
  );
}

export default Signup;
