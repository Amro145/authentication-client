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
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="glass-card w-full max-w-[400px] p-8"
      >
        <div className="mb-8">
          <h1 className="mb-2">Sign in</h1>
          <p>Enter your details to access your account</p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center">
            {error.message || "An error occurred"}
          </div>
        )}

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={(values) => dispatch(login(values))}
        >
          {({ isValid, dirty }) => (
            <Form className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-400 uppercase tracking-tight">Email</label>
                <Field
                  className="input-field w-full"
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                />
                <ErrorMessage name="email" component="div" className="error-text" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-medium text-zinc-400 uppercase tracking-tight">Password</label>
                  <Link to="/forgot-password" size="sm" className="text-indigo-400 hover:text-indigo-300 text-xs transition-colors">
                    Forgot?
                  </Link>
                </div>
                <Field
                  className="input-field w-full"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                />
                <ErrorMessage name="password" component="div" className="error-text" />
              </div>

              <button
                type="submit"
                disabled={!isValid || !dirty || signinLoading}
                className="btn-primary w-full py-2.5 mt-4 flex items-center justify-center gap-2"
              >
                {signinLoading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  "Continue"
                )}
              </button>
            </Form>
          )}
        </Formik>

        <div className="mt-8 text-center">
          <p className="text-zinc-500">
            New here?{" "}
            <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
              Create an account
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
