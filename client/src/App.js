import { CircularProgress } from "@mui/material";
import "./App.css";
import { useState } from "react";
import Authenticate from "pages/authenticate";

function App() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="Ticket-Manager">
      {loading ? (
        <div style={{ position: "fixed", top: "50%", left: "50%" }}>
          <CircularProgress />
        </div>
      ) : (
        <Authenticate/>
      )}
    </div>
  );
}

export default App;
