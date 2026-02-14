import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { verifyEmail, resendVerification } from "../store/api";
import { MailOpen, Loader2, RefreshCw } from "lucide-react";
import Swal from "sweetalert2";

function CheckEmail() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const dispatch = useDispatch();
  const { verifyEmailLoading, resendVerificationLoading, userData, error } = useSelector((state) => state.auth);
  const [resendCooldown, setResendCooldown] = useState(0);

  const handleChange = (index, value) => {
    const char = value.slice(-1); // Only take the last character
    if (!char) {
      // Handle backspace or empty
      const newCode = [...code];
      newCode[index] = "";
      setCode(newCode);
      return;
    }

    if (/^[0-9]$/.test(char)) {
      const newCode = [...code];
      newCode[index] = char;
      setCode(newCode);
      if (index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const verificationCode = code.join("");
    if (verificationCode.length === 6) {
      dispatch(verifyEmail({ verificationToken: verificationCode }));
    }
  };

  // Auto-submit when all digits are filled
  useEffect(() => {
    if (code.every(digit => digit !== "")) {
      handleSubmit();
    }
  }, [code]);

  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleResendCode = async () => {
    if (!userData?.email) return;

    const resultAction = await dispatch(resendVerification({ email: userData.email }));
    if (resendVerification.fulfilled.match(resultAction)) {
      setResendCooldown(60); // 60 seconds cooldown
      Swal.fire({
        icon: 'success',
        title: 'Sent!',
        text: 'A new verification code has been sent to your email.',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        backgroundColor: '#1e1b4b',
        color: '#fff'
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-card w-full max-w-md p-8 md:p-12 text-center"
      >
        <div className="mx-auto w-20 h-20 bg-indigo-500/10 rounded-3xl flex items-center justify-center mb-8 ring-8 ring-indigo-500/5">
          <Mail className="text-indigo-400" size={36} />
        </div>

        <h1 className="text-3xl font-bold text-white mb-4">Verify Your Email</h1>
        <p className="text-zinc-400 text-sm leading-relaxed mb-10">
          We've sent a verification code to your email address. Please enter it below to activate your account.
        </p>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 text-rose-400 text-sm bg-rose-500/10 py-2 rounded-lg border border-rose-500/20"
          >
            {error.message || "Invalid or expired code"}
          </motion.p>
        )}

        <Formik
          initialValues={{ code: "" }}
          validationSchema={VerifySchema}
          onSubmit={(values) => dispatch(verifyEmail({ verificationToken: values.code }))} // Updated onSubmit to match API
        >
          {({ isValid, dirty }) => (
            <Form className="space-y-8">
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-zinc-400 ml-1 uppercase tracking-wider">Verification Code</label>
                <div className="relative group">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
                  <Field
                    className="input-field w-full pl-12 pr-4 tracking-[0.2em] font-mono text-lg text-center"
                    type="text"
                    name="code"
                    placeholder="000000"
                    maxLength={6}
                  />
                </div>
                <ErrorMessage name="code" component="div" className="error-text ml-1" />
              </div>

              <button
                type="submit"
                disabled={!isValid || !dirty || verifyEmailLoading}
                className="btn-primary w-full py-4 flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
              >
                {verifyEmailLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    Verify Email
                    <ChevronRight size={20} />
                  </>
                )}
              </button>
            </Form>
          )}
        </Formik>

        <div className="mt-12 pt-8 border-t border-zinc-800">
          <p className="text-zinc-500 text-xs mb-4 uppercase tracking-widest font-semibold">Didn't receive the code?</p>
          <button
            onClick={handleResend}
            disabled={resendTimer > 0 || resendVerificationLoading}
            className="flex items-center justify-center gap-2 mx-auto text-indigo-400 hover:text-indigo-300 disabled:text-zinc-600 font-bold transition-all disabled:cursor-not-allowed group"
          >
            {resendVerificationLoading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <RefreshCw className={`w-4 h-4 ${resendTimer === 0 && 'group-hover:rotate-180 transition-transform duration-500'}`} />
            )}
            {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend Code"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default CheckEmail;
