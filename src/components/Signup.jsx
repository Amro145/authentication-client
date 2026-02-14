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
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="glass-card w-full max-w-md p-8 md:p-12"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white mb-3">Join Us</h1>
          <p className="text-zinc-400 text-sm">Create your account and start your journey</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center"
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
            <Form className="space-y-6">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400 ml-1 uppercase tracking-wider">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
                  <Field
                    className="input-field w-full pl-12 pr-4"
                    type="text"
                    name="name"
                    placeholder="John Doe"
                  />
                </div>
                <ErrorMessage name="name" component="div" className="error-text ml-1" />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400 ml-1 uppercase tracking-wider">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
                  <Field
                    className="input-field w-full pl-12 pr-4"
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                  />
                </div>
                <ErrorMessage name="email" component="div" className="error-text ml-1" />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400 ml-1 uppercase tracking-wider">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
                  <Field
                    className="input-field w-full pl-12 pr-4"
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
                className="btn-primary w-full py-4 flex items-center justify-center gap-3 mt-10 active:scale-[0.98] transition-all"
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

        <div className="mt-10 text-center">
          <p className="text-zinc-500 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Signup;
