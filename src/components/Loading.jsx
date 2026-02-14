import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 overflow-hidden relative">
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      <div className="text-center space-y-8 relative z-10">
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 rounded-[2rem] border-4 border-zinc-800 border-t-indigo-500"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-3 h-3 bg-indigo-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.6)]" />
          </motion.div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white tracking-[0.2em] uppercase opacity-80">Authenticating</h2>
          <div className="flex justify-center gap-1.5">
            <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0 }} className="w-2 h-2 bg-indigo-500 rounded-full" />
            <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }} className="w-2 h-2 bg-indigo-500 rounded-full" />
            <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.6 }} className="w-2 h-2 bg-indigo-500 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
