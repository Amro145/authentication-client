import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { login } from "../store/api";

function Login() {
  const dispatch = useDispatch();
  const { signinLoading, error } = useSelector((state) => state.auth);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="glass-card w-full max-w-md p-8 shadow-2xl"
      >
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-white">Sign In</h1>
          <p className="text-zinc-400">Continue to your dashboard</p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center font-medium">
            {error.message || "Invalid credentials"}
          </div>
        )}

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={(values) => dispatch(login(values))}
        >
          {({ isValid, dirty }) => (
            <Form className="flex flex-col gap-y-4">
              <div className="space-y-2.5">
                <label className="text-xs font-semibold uppercase tracking-widest text-zinc-100">Email</label>
                <Field
                  className="input-field"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                />
                <ErrorMessage name="email" component="div" className="error-text" />
              </div>

              <div className="space-y-2.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold uppercase tracking-widest text-zinc-100">Password</label>
                  <Link to="/forgot-password" size="sm" className="auth-link text-xs">
                    Forgot password?
                  </Link>
                </div>
                <Field
                  className="input-field"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                />
                <ErrorMessage name="password" component="div" className="error-text" />
              </div>

              <button
                type="submit"
                disabled={!isValid || !dirty || signinLoading}
                className="btn-primary"
              >
                {signinLoading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  "Sign In"
                )}
              </button>
            </Form>
          )}
        </Formik>

        <div className="mt-8 text-center">
          <p className="text-zinc-500 text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="auth-link">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
