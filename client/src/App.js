import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import Authenticate from "pages/authenticate";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "pages/home";
import { NotFound } from "pages/notfound";
import { useAuth } from "context/auth-context";
import { ProtectedRoute } from "components/protected-route";
import Navbar from "components/navbar";
import api from "api/service";
import Tabs from "components/tabs";
const appTitle = "Ticket Manager";
function App() {
  const [loading, setLoading] = useState(true);
  const auth = useAuth();
  const fetchCurrentUser = async () => {
    try {
      const data = await api.get("/api/users/current");
      auth.login(data);
    } catch (error) {
      if (error.response) {
        console.error(error.response.data);
      }
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchCurrentUser();
  }, []);
  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
      {loading ? (
        <div style={{ position: "fixed", top: "50%", left: "50%" }}>
          <CircularProgress />
        </div>
      ) : (
        <>
          {auth.user ? <Navbar /> : <></>}
          <Routes>
            <Route
              path="/login"
              element={
                !auth.user ? (
                  <Authenticate title={`${appTitle} - Login`} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/project/:projectId?"
              element={
                <ProtectedRoute>
                  <Tabs tab="project" title={`${appTitle} - Project`} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/project/:projectId?/tickets/:ticketId?"
              element={
                <ProtectedRoute>
                  <Tabs tab="tickets" title={`${appTitle} - Tickets`} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home title={`${appTitle} - Home`} />
                </ProtectedRoute>
              }
            />
            <Route
              path="*"
              element={<NotFound title={`${appTitle} - Not Found`} />}
            />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
