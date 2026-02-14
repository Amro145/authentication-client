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
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="glass-card w-full max-w-[400px] p-8 text-center"
        >
          <div className="mx-auto w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6">
            <CheckCircle className="text-emerald-400" size={24} />
          </div>
          <h1 className="mb-2">Check your email</h1>
          <p className="mb-8">
            If an account exists, we've sent a password reset link to your inbox.
          </p>
          <Link to="/login" className="btn-primary w-full py-2.5 flex items-center justify-center gap-2">
            Back to sign in
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="glass-card w-full max-w-[400px] p-8"
      >
        <div className="mb-8">
          <h1 className="mb-2">Reset password</h1>
          <p>Enter your email address to receive a recovery link</p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center">
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

              <button
                type="submit"
                disabled={!isValid || !dirty || forgotPasswordLoading}
                className="btn-primary w-full py-2.5 mt-4 flex items-center justify-center gap-2"
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
          <Link to="/login" className="text-zinc-500 hover:text-indigo-400 font-medium flex items-center justify-center gap-2 transition-colors">
            <ArrowLeft size={16} />
            Back to sign in
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default ForgotPassword;
