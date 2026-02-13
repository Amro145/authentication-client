import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, ArrowLeft, Loader2 } from "lucide-react";
import { resetPassword } from "../store/api";
import Swal from "sweetalert2";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { resetPasswordLoading, error } = useSelector((state) => state.auth);

  const resetPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card w-full max-w-md p-8 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Reset Password</h1>
          <p className="text-slate-400">Please enter your new password below.</p>
        </div>

        {error && (
          <div className="mb-6 px-4 py-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm text-center">
            {error.message}
          </div>
        )}

        <Formik
          initialValues={{ password: "", confirmPassword: "" }}
          validationSchema={resetPasswordSchema}
          onSubmit={async (values) => {
            try {
              await dispatch(resetPassword({ id: token, data: { password: values.password } })).unwrap();
              Swal.fire({
                icon: "success",
                title: "Success!",
                text: "Your password has been successfully reset.",
                background: "#020617",
                color: "#f8fafc",
                confirmButtonColor: "#10b981",
              });
              navigate("/login");
            } catch (err) {
              // Error handled by redux state and displayed above
            }
          }}
        >
          {({ isValid, dirty }) => (
            <Form className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">New Password</label>
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

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">Confirm New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <Field
                    className="input-field w-full pl-10 pr-4 py-3 rounded-xl outline-none"
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
                className="btn-primary w-full py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {resetPasswordLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  "Reset Password"
                )}
              </button>
            </Form>
          )}
        </Formik>

        <div className="mt-8 text-center">
          <Link to="/login" className="text-emerald-400 hover:text-emerald-300 text-sm font-medium flex items-center justify-center gap-2 transition-colors">
            <ArrowLeft size={16} />
            Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default ResetPassword;
