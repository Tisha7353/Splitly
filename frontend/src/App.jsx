import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import GroupView from "./pages/GroupView.jsx";
import { Toaster } from "react-hot-toast";

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;

  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <>
    <Toaster
  position="bottom-right"
  toastOptions={{
    style: {
      background: "#1FAD91", // dark slate (modern SaaS feel)
      color: "#fff",
      borderRadius: "10px",
      padding: "12px 16px",
    },
    success: {
      style: {
        background: "#10b981", // green
      },
    },
    error: {
      style: {
        background: "#ef4444", // red
      },
    },
  }}
/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
<Route path="/groups/:id" element={<GroupView />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
    </>
  );
}
