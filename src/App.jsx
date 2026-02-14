import React, { useEffect } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
import { checkAuth, logout } from "./store/api";
import { clearError } from "./store/slice";
import { ProtectedRoute, PublicRoute } from "./components/AuthRoutes";

// Components
import Login from "./components/Login";
import Home from "./components/Home";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import CheckEmail from "./components/CheckEmail";
import Loading from "./components/Loading";
import { LogOut } from "lucide-react";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { userData, checkLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    dispatch(clearError());
  }, [location.pathname, dispatch]);

  if (checkLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-indigo-500/30">
      {/* Header / Navbar */}
      {userData && (
        <nav className="fixed top-0 left-0 right-0 p-6 flex justify-end z-50 pointer-events-none">
          <button
            onClick={() => dispatch(logout())}
            className="p-2.5 px-4 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-100 hover:text-white hover:border-zinc-400 transition-all flex items-center gap-2 text-xs font-semibold tracking-wide shadow-xl pointer-events-auto"
            title="Logout"
          >
            <LogOut size={14} />
            <span>SIGN OUT</span>
          </button>
        </nav>
      )}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          {/* Public Routes */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            }
          />

          {/* Logic-based routes */}
          <Route
            path="/reset-password/:token"
            element={
              <PublicRoute>
                <ResetPassword />
              </PublicRoute>
            }
          />

          <Route
            path="/check-email"
            element={
              userData && !userData.isVerified ? (
                <CheckEmail />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
