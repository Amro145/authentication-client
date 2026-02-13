import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { forgotPassword } from "../store/api";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, Loader2, CheckCircle } from "lucide-react";

function ForgotPassword() {
  const dispatch = useDispatch();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { forgotPasswordLoading, error } = useSelector((state) => state.auth);

  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Email is required"),
  });

  if (isSubmitted && !error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="glass-card w-full max-w-md p-10 text-center"
        >
          <div className="mx-auto w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mb-6 ring-4 ring-indigo-500/10">
            <CheckCircle className="text-indigo-400" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">Check Your Email</h1>
          <p className="text-slate-400 mb-8 leading-relaxed">
            If an account exists for that email, we've sent a password reset link.
          </p>
          <Link to="/login" className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white">
            <ArrowLeft size={18} />
            Back to Login
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="glass-card w-full max-w-md p-10 relative overflow-hidden"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Forgot Password</h1>
          <p className="text-slate-400">Enter your email and we'll send you a link to reset your password.</p>
        </div>

        {error && (
          <div className="mb-6 px-4 py-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm text-center flex items-center justify-center gap-2">
            {error.message}
          </div>
        )}

        <Formik
          initialValues={{ email: "" }}
          validationSchema={ForgotPasswordSchema}
          onSubmit={async (values) => {
            await dispatch(forgotPassword(values)).unwrap();
            setIsSubmitted(true);
          }}
        >
          {({ isValid, dirty }) => (
            <Form className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1 block mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <Field
                    className="input-field w-full pl-10 pr-4 py-3 outline-none"
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                  />
                </div>
                <ErrorMessage name="email" component="div" className="error-text ml-1" />
              </div>

              <button
                type="submit"
                disabled={!isValid || !dirty || forgotPasswordLoading}
                className="btn-primary w-full py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-50 mt-8"
              >
                {forgotPasswordLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </Form>
          )}
        </Formik>

        <div className="mt-8 text-center">
          <Link to="/login" className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center justify-center gap-2 transition-colors">
            <ArrowLeft size={16} />
            Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default ForgotPassword;
