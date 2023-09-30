import { Avatar, Grid, Link, Paper } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { styled } from "@mui/material/styles";
import BackgroundImage from "../assets/squares.jpg";
import Signup from "components/authentication/signup";
import { useState } from "react";
import Signin from "components/authentication/signin";

const RootContainer = styled(Grid)({
  height: "100vh",
});
const Image = styled(Grid)({
  backgroundImage: `url(${BackgroundImage})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
});
const Footer = styled("footer")({
  position: "fixed",
  bottom: "10px",
  color: "#000",
  paddingBottom: "5px",
  textAlign: "center",
});

const FormContainer = styled("div")(({ theme }) => ({
  margin: theme.spacing(0, 4),
  display: "flex",
  height: "100%",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));
const Lock = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
  height:'60px',
  width:'60px',
  backgroundColor: theme.palette.secondary.main,
}));
function Authenticate() {
   const [signIn, setSignIn] = useState(true);
  return (
    <RootContainer container>
      <Image item xs={false} sm={4} md={7} lg={9}/>
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        lg={3}
        component={Paper}
        elevation={6}
        square
      >
        <FormContainer>
          <Lock>
            <LockOutlinedIcon fontSize="large"/>
          </Lock>
         { signIn ? 
          <Signin goToSignIn={setSignIn}/>
          :
          <Signup goToSignIn={setSignIn}/>
         }
         <Footer>
            Image by{" "}
            <Link href="https://www.freepik.com/free-vector/background-pixel-rain-abstract_6148364.htm#page=8&query=patterns%20software&position=41&from_view=search&track=ais">
              Freepik
            </Link>
          </Footer>
        </FormContainer>
      </Grid>
    </RootContainer>
  );
}

export default Authenticate;
