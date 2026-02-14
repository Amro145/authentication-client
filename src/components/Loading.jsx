import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950">
      <div className="text-center space-y-6">
        <div className="relative flex justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-10 h-10 rounded-full border-2 border-zinc-800 border-t-indigo-500"
          />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-zinc-400 tracking-wide">Syncing account...</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
