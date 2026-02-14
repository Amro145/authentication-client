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
          <div className="p-8 bg-zinc-900/40 border border-zinc-800 rounded-2xl space-y-6 shadow-xl backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center border border-zinc-800 shadow-inner">
                <User size={20} className="text-zinc-100" />
              </div>
              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Profile</h2>
                <p className="text-white font-semibold text-lg">{userData.name}</p>
              </div>
            </div>
            <div className="space-y-1.5 pt-2 border-t border-zinc-800/50">
              <p className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Email address</p>
              <p className="text-zinc-200 font-medium">{userData.email}</p>
            </div>
            <div className="pt-4">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 shadow-sm">
                <ShieldCheck size={14} />
                Verified Account
              </span>
            </div>
          </div>

          <div className="p-8 bg-zinc-900/40 border border-zinc-800 rounded-2xl space-y-6 flex flex-col justify-center shadow-xl backdrop-blur-md">
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Account Security</h2>
            <p className="text-zinc-200 text-sm leading-relaxed">Your account is fully secured with industry-standard multi-layer encryption.</p>
            <button className="btn-primary w-full py-2.5 flex items-center justify-center gap-2 mt-2 h-10">
              <Settings size={16} />
              Manage Security Settings
            </button>
          </div>
        </section>

        <section className="space-y-8 pb-20">
          <div className="flex justify-between items-center px-2">
            <h2 className="text-lg font-bold text-white tracking-tight">Recent Activity</h2>
            <button className="text-zinc-400 hover:text-white transition-all text-xs font-bold tracking-widest flex items-center gap-2 group uppercase">
              View all <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="p-6 bg-zinc-900/20 border border-zinc-800/40 rounded-2xl flex justify-between items-center hover:bg-zinc-900/40 transition-all cursor-default group shadow-sm">
                <div className="flex items-center gap-5">
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.4)]" />
                  <div>
                    <p className="text-white font-semibold">System login detected</p>
                    <p className="text-xs text-zinc-500 font-medium">2 hours ago • Safari on macOS</p>
                  </div>
                </div>
                <div className="text-[10px] text-zinc-400 font-bold tracking-widest uppercase bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800 group-hover:border-zinc-600 transition-colors">Success</div>
              </div>
            ))}
          </div>
        </section>
      </motion.div>
    </div>
  );
}

export default Home;
