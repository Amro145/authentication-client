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
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="glass-card w-full max-w-md p-8 text-center shadow-2xl"
        >
          <div className="mx-auto w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6">
            <CheckCircle className="text-emerald-400" size={28} />
          </div>
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-white">Check Email</h1>
          <p className="mb-8 text-zinc-400">
            If an account exists, we've sent a recovery link to your inbox.
          </p>
          <Link to="/login" className="btn-primary">
            Back to Sign In
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="glass-card w-full max-w-md p-8 shadow-2xl"
      >
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-white">Recovery</h1>
          <p className="text-zinc-400">Enter your email to reset your password</p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center font-medium">
            {error.message || "An error occurred"}
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

              <button
                type="submit"
                disabled={!isValid || !dirty || forgotPasswordLoading}
                className="btn-primary"
              >
                {forgotPasswordLoading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  "Send Link"
                )}
              </button>
            </Form>
          )}
        </Formik>

        <div className="mt-8 text-center">
          <Link to="/login" className="auth-link text-sm inline-flex items-center gap-2">
            <ArrowLeft size={16} />
            Back to sign in
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default ForgotPassword;
