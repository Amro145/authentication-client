import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Mail, Key, ChevronRight, Loader2, RefreshCw } from "lucide-react";
import { verifyEmail, resendVerification } from "../store/api";
import Swal from "sweetalert2";

function CheckEmail() {
  const dispatch = useDispatch();
  const { verifyEmailLoading, resendVerificationLoading, userData, error } = useSelector((state) => state.auth);
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleResend = async () => {
    const email = userData?.email || localStorage.getItem("email_for_verification");
    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "User email not found. Please try signing up again.",
      });
      return;
    }

    try {
      await dispatch(resendVerification({ email })).unwrap();
      setResendTimer(60);
      Swal.fire({
        icon: "success",
        title: "Sent!",
        text: "A new verification code has been sent to your email.",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: err.message || "Could not resend code.",
      });
    }
  };

  const VerifySchema = Yup.object().shape({
    code: Yup.string()
      .length(6, "Code must be exactly 6 digits")
      .matches(/^\d+$/, "Code must contain only numbers")
      .required("Verification code is required"),
  });

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="glass-card w-full max-w-md p-8 shadow-2xl text-center"
      >
        <div className="mb-8">
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-white">Verify Email</h1>
          <p className="text-zinc-400">Enter the 6-digit code sent to your inbox</p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center font-medium">
            {error.message || "Invalid or expired code"}
          </div>
        )}

        <Formik
          initialValues={{ code: "" }}
          validationSchema={VerifySchema}
          onSubmit={(values) => dispatch(verifyEmail({ verificationToken: values.code }))}
        >
          {({ isValid, dirty }) => (
            <Form className="flex flex-col gap-y-4">
              <div className="space-y-2.5">
                <label className="text-xs font-semibold uppercase tracking-widest text-zinc-100 text-left">Security Code</label>
                <Field
                  className="input-field tracking-[0.6em] font-mono text-xl text-center"
                  type="text"
                  name="code"
                  placeholder="000000"
                  maxLength={6}
                />
                <ErrorMessage name="code" component="div" className="error-text text-left" />
              </div>

              <button
                type="submit"
                disabled={!isValid || !dirty || verifyEmailLoading}
                className="btn-primary"
              >
                {verifyEmailLoading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  "Verify Account"
                )}
              </button>
            </Form>
          )}
        </Formik>

        <div className="mt-8 pt-8 border-t border-zinc-900/80">
          <p className="text-zinc-500 text-sm mb-3">Didn't receive the code?</p>
          <button
            onClick={handleResend}
            disabled={resendTimer > 0 || resendVerificationLoading}
            className="text-xs text-indigo-400 hover:text-indigo-300 disabled:text-zinc-700 font-bold transition-all px-4 py-2 rounded-full hover:bg-indigo-500/5 disabled:hover:bg-transparent"
          >
            {resendVerificationLoading ? (
              <Loader2 className="animate-spin inline-block mr-2" size={14} />
            ) : null}
            {resendTimer > 0 ? `Wait ${resendTimer}s` : "Resend Code"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default CheckEmail;
