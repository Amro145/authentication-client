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
          <h1 className="text-3xl font-bold text-white mb-4">Password Reset</h1>
          <p className="text-zinc-400 text-sm leading-relaxed mb-10">
            Your password has been successfully updated. You can now use your new credentials to log in.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="btn-primary w-full py-4 flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
          >
            Back to Login
            <ArrowRight size={18} />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="glass-card w-full max-w-md p-8 md:p-12"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white mb-3">Reset Password</h1>
          <p className="text-zinc-400 text-sm">Create a strong new password for your account</p>
        </div>

        {error && (
          <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
            {error.message}
          </div>
        )}

        <Formik
          initialValues={{ password: "", confirmPassword: "" }}
          validationSchema={resetPasswordSchema}
          onSubmit={(values) => {
            console.log("Submitting reset password with token:", token, "and password length:", values.password.length);
            dispatch(resetPassword({ id: token, data: { password: values.password } }));
          }}
        >
          {({ isValid, dirty }) => (
            <Form className="space-y-6">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400 ml-1 uppercase tracking-wider">New Password</label>
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

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400 ml-1 uppercase tracking-wider">Confirm Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
                  <Field
                    className="input-field w-full pl-12 pr-4"
                    type="password"
                    name="confirmPassword"
                    placeholder="••••••••"
                  />
                </div>
                <ErrorMessage name="confirmPassword" component="div" className="error-text ml-1" />
              </div>

              <button
                type="submit"
                disabled={!isValid || !dirty || resetPasswordLoading}
                className="btn-primary w-full py-4 flex items-center justify-center gap-2 mt-10 active:scale-[0.98] transition-all"
              >
                {resetPasswordLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  "Reset My Password"
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

export default ResetPassword;
