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
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="glass-card w-full max-w-md p-10 text-center"
      >
        <div className="mx-auto w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mb-6 ring-4 ring-indigo-500/10">
          <MailOpen className="text-indigo-400" size={32} />
        </div>

        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Verify Email</h1>
        <p className="text-slate-400 mb-8 leading-relaxed">
          We've sent a 6-digit code to your email. Enter it below to verify your account.
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

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex justify-between gap-3 max-w-sm mx-auto">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 bg-black/20 border-b-2 border-white/10 rounded-xl text-center text-xl font-bold text-white focus:border-indigo-500 focus:bg-black/40 outline-none transition-all p-2"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={verifyEmailLoading || code.some(digit => digit === "")}
            className="btn-primary w-full py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {verifyEmailLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              "Verify Now"
            )}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-white/5">
          <p className="text-slate-400 text-sm mb-4">Didn't receive the code?</p>
          <button
            onClick={handleResendCode}
            disabled={resendVerificationLoading || resendCooldown > 0}
            className="flex items-center justify-center gap-2 mx-auto text-indigo-400 hover:text-indigo-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {resendVerificationLoading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <RefreshCw size={18} className={`${resendCooldown > 0 ? '' : 'group-hover:rotate-180'} transition-transform duration-500`} />
            )}
            <span className="font-medium">
              {resendCooldown > 0 ? `Resend Code (${resendCooldown}s)` : "Resend Code"}
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default CheckEmail;
