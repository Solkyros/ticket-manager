import { useContext, useState } from "react";
import { UserContext } from "context/user-context";

function Home() {
  const {user} = useContext(UserContext);
  console.log(user);
  return (
    <div>Hello {user?.user?.email} Home page</div>
  );
}

export default Home;
