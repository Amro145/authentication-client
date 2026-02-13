import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import CheckEmail from "./components/CheckEmail";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth, logout } from "./store/api";
import Loading from "./components/Loading";
import Swal from "sweetalert2";

function App() {
  const dispatch = useDispatch();
  const { userData, checkLoading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (error && error.message !== "Unauthorized! No user found.") {
      Swal.fire({
        icon: "error",
        title: error.message || "An error occurred",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        // If it's a critical error, we might want to logout
        if (error.statusCode === 401) {
          localStorage.removeItem("userData");
          dispatch(logout());
        }
      });
    }
  }, [error, dispatch]);

  if (checkLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-800 text-amber-50">
      <div className="flex justify-center items-center py-4">
        {userData ? (
          <button
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors"
            onClick={() => dispatch(logout())}
          >
            Logout
          </button>
        ) : null}
      </div>

      <Routes>
        <Route
          path="/"
          element={
            userData ? (
              userData?.resetPasswordToken ? (
                <Navigate
                  to={`/reset-password/${userData.resetPasswordToken}`}
                />
              ) : userData?.verificationToken ? (
                <Navigate to="/check-email" />
              ) : (
                <Home />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={
            userData ? (
              userData?.verificationToken ? (
                <Navigate to="/check-email" />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/signup"
          element={userData ? <Navigate to="/" /> : <Signup />}
        />
        <Route
          path="/forgot-password"
          element={userData ? <Navigate to="/" /> : <ForgotPassword />}
        />
        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        />
        <Route
          path="/check-email"
          element={
            userData && userData.verificationToken ? (
              <CheckEmail />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/loading" element={<Loading />} />
      </Routes>
    </div>
  );
}

export default App;
