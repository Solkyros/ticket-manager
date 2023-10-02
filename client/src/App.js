import { CircularProgress } from "@mui/material";
import "./App.css";
import { useState } from "react";
import Authenticate from "pages/authenticate";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Home from "pages/home";
function App() {
  const [loading, setLoading] = useState(false);

  return (
      <>
      <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
      {loading ? (
        <div style={{ position: "fixed", top: "50%", left: "50%" }}>
          <CircularProgress />
        </div>
      ) : (
        <Routes>
          <Route path='/login' element={<Authenticate />}/>
          <Route path='/' element={<Home />}/>
        </Routes>
      )}
      </>
  );
}

export default App;
