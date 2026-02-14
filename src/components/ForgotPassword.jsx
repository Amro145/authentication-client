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
      <div className="min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-card w-full max-w-md p-8 md:p-12 text-center"
        >
          <div className="mx-auto w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center mb-8 ring-8 ring-emerald-500/5">
            <CheckCircle className="text-emerald-400" size={36} />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Check Your Email</h1>
          <p className="text-zinc-400 text-sm leading-relaxed mb-10">
            If an account exists for that email, we've sent a password reset link to your inbox.
          </p>
          <Link to="/login" className="btn-primary inline-flex items-center gap-2 px-8 py-4 w-full justify-center active:scale-[0.98]">
            <ArrowLeft size={18} />
            Back to Login
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-card w-full max-w-md p-8 md:p-12"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white mb-3">Forgot Password</h1>
          <p className="text-zinc-400 text-sm">Enter your email and we'll send you a link to reset your password.</p>
        </div>

        {error && (
          <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
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

              <button
                type="submit"
                disabled={!isValid || !dirty || forgotPasswordLoading}
                className="btn-primary w-full py-4 flex items-center justify-center gap-2 mt-10 active:scale-[0.98] transition-all"
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

        <div className="mt-10 text-center">
          <Link to="/login" className="text-zinc-500 hover:text-indigo-400 text-sm font-semibold flex items-center justify-center gap-2 transition-colors">
            <ArrowLeft size={16} />
            Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default ForgotPassword;
