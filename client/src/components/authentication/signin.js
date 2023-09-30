import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const Form = styled("form")(({ theme }) => ({
    width: '100%', // Fix IE 11 issue.
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
function Signin(props) {
    const { goToSignIn } = props;
  return (
    <>
    <Typography component="h1" variant="h5">
      Sign in
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
          <LinkButton variant="body2"  onClick={()=>goToSignIn(false)}>
            {"Don't have an account? Sign up"}
          </LinkButton>
        </Typography>
      </Box>
    </Form>
  </>
  );
}

export default Signin;
