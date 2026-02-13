import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { User, Mail, Lock, UserPlus, Loader2 } from "lucide-react";
import { signup } from "../store/api";

function Signup() {
  const dispatch = useDispatch();
  const { signupLoading, error } = useSelector((state) => state.auth);

  const signupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Email is required"),
    name: Yup.string().min(2, "Name is too short").required("Full Name is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="glass-card w-full max-w-md p-8 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Join Us</h1>
          <p className="text-slate-400">Create your account and start your journey</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-6 px-4 py-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm text-center"
          >
            {error.message || "An error occurred during signup"}
          </motion.div>
        )}

        <Formik
          initialValues={{ email: "", password: "", name: "" }}
          validationSchema={signupSchema}
          onSubmit={(values) => dispatch(signup(values))}
        >
          {({ isValid, dirty }) => (
            <Form className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <Field
                    className="input-field w-full pl-10 pr-4 py-3 rounded-xl outline-none"
                    type="text"
                    name="name"
                    placeholder="John Doe"
                  />
                </div>
                <ErrorMessage name="name" component="div" className="error-text ml-1" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <Field
                    className="input-field w-full pl-10 pr-4 py-3 rounded-xl outline-none"
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                  />
                </div>
                <ErrorMessage name="email" component="div" className="error-text ml-1" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <Field
                    className="input-field w-full pl-10 pr-4 py-3 rounded-xl outline-none"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                  />
                </div>
                <ErrorMessage name="password" component="div" className="error-text ml-1" />
              </div>

              <button
                type="submit"
                disabled={!isValid || !dirty || signupLoading}
                className="btn-primary w-full py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2 group mt-4 disabled:opacity-50"
              >
                {signupLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    <UserPlus size={20} />
                    Create Account
                  </>
                )}
              </button>
            </Form>
          )}
        </Formik>

        <div className="mt-8 text-center text-slate-400 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
            Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default Signup;
