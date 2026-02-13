import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { verifyEmail } from "../store/api";
import { MailOpen, Loader2 } from "lucide-react";

function CheckEmail() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const dispatch = useDispatch();
  const { verifyEmailLoading, error } = useSelector((state) => state.auth);

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

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="glass-card w-full max-w-md p-8 text-center"
      >
        <div className="mx-auto w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-6">
          <MailOpen className="text-emerald-400" size={32} />
        </div>

        <h1 className="text-3xl font-bold text-white mb-2">Verify Email</h1>
        <p className="text-slate-400 mb-8">
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
          <div className="flex justify-between gap-2 max-w-sm mx-auto">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 bg-slate-800/50 border border-slate-700/50 rounded-xl text-center text-xl font-bold text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={verifyEmailLoading || code.some(digit => digit === "")}
            className="btn-primary w-full py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {verifyEmailLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              "Verify Now"
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default CheckEmail;
