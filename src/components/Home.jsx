import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { User, ShieldCheck, Mail, Calendar, Settings, ArrowRight } from "lucide-react";

function Home() {
  const { userData } = useSelector((state) => state.auth);

  if (!userData) return null;

  return (
    <div className="main-container pt-32 pb-16 px-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-[800px] mx-auto space-y-16"
      >
        <header className="space-y-4">
          <h1 className="text-4xl">Dashboard</h1>
          <p className="text-lg">Welcome back, {userData.name || "User"}. Here's an overview of your account.</p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 border border-zinc-800 rounded-xl space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-zinc-900 flex items-center justify-center border border-zinc-800">
                <User size={20} className="text-zinc-400" />
              </div>
              <div>
                <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500">Profile</h2>
                <p className="text-zinc-100 font-medium">{userData.name}</p>
              </div>
            </div>
            <div className="space-y-1 pt-2">
              <p className="text-xs text-zinc-500 uppercase font-medium">Email address</p>
              <p className="text-zinc-300">{userData.email}</p>
            </div>
            <div className="pt-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">
                <ShieldCheck size={14} />
                Verified
              </span>
            </div>
          </div>

          <div className="p-8 border border-zinc-800 rounded-xl space-y-6 flex flex-col justify-center">
            <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-500">Account Security</h2>
            <p className="text-zinc-300">Your account is fully secured with multi-layer encryption.</p>
            <button className="btn-outline w-full py-2 flex items-center justify-center gap-2 mt-2">
              <Settings size={16} />
              Manage Settings
            </button>
          </div>
        </section>

        <section className="space-y-8">
          <div className="flex justify-between items-center">
            <h2>Recent Activity</h2>
            <button className="text-zinc-400 hover:text-zinc-100 transition-colors text-sm flex items-center gap-1 group">
              View all <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="p-6 border border-zinc-800/50 rounded-xl flex justify-between items-center hover:bg-zinc-900/50 transition-colors cursor-default">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                  <div>
                    <p className="text-zinc-100 font-medium">System login detected</p>
                    <p className="text-xs text-zinc-500">2 hours ago • Safari on macOS</p>
                  </div>
                </div>
                <div className="text-xs text-zinc-500 font-mono">Success</div>
              </div>
            ))}
          </div>
        </section>
      </motion.div>
    </div>
  );
}

export default Home;
