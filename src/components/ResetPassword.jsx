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
      <div className=" min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="parent glass-card w-full max-w-md p-8 text-center shadow-2xl"

        >
          <div className="mx-auto w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6">
            <CheckCircle className="text-emerald-400" size={28} />
          </div>
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-white">Success</h1>
          <p className="mb-8 text-zinc-400">
            Your password has been successfully updated.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="btn-primary"
          >
            Back to Sign In
          </button>
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
        className="parent glass-card w-full max-w-md p-8 shadow-2xl"
      >
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-white">New Password</h1>
          <p className="text-zinc-400">Create a secure new password</p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center font-medium">
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
            <Form className="flex flex-col gap-y-4">
              <div className="space-y-2.5">
                <label className="text-xs font-semibold uppercase tracking-widest text-zinc-100">New Password</label>
                <Field
                  className="input-field"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                />
                <ErrorMessage name="password" component="div" className="error-text" />
              </div>

              <div className="space-y-2.5">
                <label className="text-xs font-semibold uppercase tracking-widest text-zinc-100">Confirm Password</label>
                <Field
                  className="input-field"
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                />
                <ErrorMessage name="confirmPassword" component="div" className="error-text" />
              </div>

              <button
                type="submit"
                disabled={!isValid || !dirty || resetPasswordLoading}
                className="btn-primary"
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
          <Link to="/login" className="auth-link text-sm inline-flex items-center gap-2">
            <ArrowLeft size={16} />
            Back to sign in
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default ResetPassword;
