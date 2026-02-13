import React from "react";
import { motion } from "framer-motion";

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950">
      <div className="relative flex flex-col items-center gap-6">
        <div className="relative w-20 h-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-t-2 border-emerald-500"
          ></motion.div>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 rounded-full border-b-2 border-purple-500"
          ></motion.div>
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-emerald-500/10 blur-xl"
          ></motion.div>
        </div>
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-emerald-400 font-medium tracking-widest text-sm uppercase"
        >
          Securing your session...
        </motion.div>
      </div>
    </div>
  );
}

export default Loading;
