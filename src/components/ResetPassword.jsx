import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, ArrowLeft, Loader2, CheckCircle, ArrowRight } from "lucide-react";
import { resetPassword } from "../store/api";
import { resetSuccess } from "../store/slice";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { resetPasswordLoading, error, success, lastAction } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(resetSuccess());
    return () => {
      dispatch(resetSuccess());
    };
  }, [dispatch]);

  const resetPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  if (success && lastAction === "resetPassword") {
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
          <h1 className="mb-2">Password reset</h1>
          <p className="mb-8">
            Your password has been successfully updated. You can now use your new credentials to log in.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="btn-primary w-full py-2.5 flex items-center justify-center gap-2"
          >
            Back to sign in
          </button>
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
          <h1 className="mb-2">New password</h1>
          <p>Create a strong new password for your account</p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center">
            {error.message || "An error occurred"}
          </div>
        )}

        <Formik
          initialValues={{ password: "", confirmPassword: "" }}
          validationSchema={resetPasswordSchema}
          onSubmit={(values) => {
            dispatch(resetPassword({ id: token, data: { password: values.password } }));
          }}
        >
          {({ isValid, dirty }) => (
            <Form className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-400 uppercase tracking-tight">New Password</label>
                <Field
                  className="input-field w-full"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                />
                <ErrorMessage name="password" component="div" className="error-text" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-400 uppercase tracking-tight">Confirm Password</label>
                <Field
                  className="input-field w-full"
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                />
                <ErrorMessage name="confirmPassword" component="div" className="error-text" />
              </div>

              <button
                type="submit"
                disabled={!isValid || !dirty || resetPasswordLoading}
                className="btn-primary w-full py-2.5 mt-4 flex items-center justify-center gap-2"
              >
                {resetPasswordLoading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  "Update Password"
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

export default ResetPassword;
