import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { User, ShieldCheck, Mail, Calendar, Settings, ArrowRight } from "lucide-react";

function Home() {
  const { userData } = useSelector((state) => state.auth);

  if (!userData) return null;

  return (
    <div className="min-h-screen pt-28 pb-12 px-6 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl w-full space-y-10"
      >
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-4">
          <div className="space-y-3">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-extrabold text-white tracking-tight"
            >
              Welcome back, <span className="text-indigo-400">{userData.name || "User"}</span>
            </motion.h1>
            <p className="text-zinc-400 text-lg font-medium">Here's your account overview.</p>
          </div>
          <div className="hidden md:block">
            <span className="px-5 py-2.5 rounded-2xl bg-zinc-900/50 border border-zinc-800 text-zinc-400 text-sm font-semibold flex items-center gap-3 shadow-sm">
              <Calendar size={16} className="text-indigo-400" />
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 glass-card p-10 flex flex-col md:flex-row items-center gap-10 active:scale-[0.99] transition-all cursor-default"
          >
            <div className="w-36 h-36 rounded-[2.5rem] bg-indigo-500/10 p-1 ring-1 ring-indigo-500/20">
              <div className="w-full h-full rounded-[2.25rem] bg-zinc-900 flex items-center justify-center overflow-hidden relative border border-zinc-800">
                <User size={72} className="text-zinc-700 relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5" />
              </div>
            </div>
            <div className="flex-1 space-y-8 text-center md:text-left w-full">
              <div className="space-y-3">
                <h2 className="text-4xl font-bold text-white tracking-tight">{userData.name}</h2>
                <div className="flex items-center justify-center md:justify-start gap-3 text-zinc-400 font-medium">
                  <div className="p-1.5 bg-zinc-900 rounded-lg">
                    <Mail size={16} className="text-indigo-400" />
                  </div>
                  <span>{userData.email}</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <span className="px-5 py-2 rounded-2xl bg-emerald-500/10 text-emerald-400 text-sm font-bold border border-emerald-500/20 flex items-center gap-2">
                  <ShieldCheck size={16} />
                  Verified Account
                </span>
                <span className="px-5 py-2 rounded-2xl bg-zinc-900 text-zinc-500 text-sm font-bold border border-zinc-800 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Online Now
                </span>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-10 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-white tracking-tight">Activity</h3>
              <button className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-all hover:bg-zinc-800">
                <Settings size={20} />
              </button>
            </div>

            <div className="space-y-5">
              <div className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800 hover:border-zinc-700 transition-all cursor-default group">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-zinc-500 text-sm font-bold uppercase tracking-wider">Total Sessions</span>
                  <span className="text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-lg text-xs font-black">+14%</span>
                </div>
                <div className="text-3xl font-bold text-white group-hover:text-indigo-400 transition-colors">42</div>
              </div>

              <div className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800 hover:border-zinc-700 transition-all cursor-default group">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-zinc-500 text-sm font-bold uppercase tracking-wider">Security Score</span>
                  <span className="text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg text-xs font-black">EXCELLENT</span>
                </div>
                <div className="text-3xl font-bold text-white flex items-center gap-4">
                  98%
                  <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden max-w-[100px]">
                    <div className="h-full bg-indigo-500 w-[98%] shadow-[0_0_12px_rgba(99,102,241,0.4)]"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Security Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card p-10 hover:border-indigo-500/30 transition-all relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/5 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-indigo-500/10 transition-all"></div>

            <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 text-indigo-400 border border-indigo-500/10">
              <ShieldCheck size={28} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Security Center</h3>
            <p className="text-zinc-400 mb-8 leading-relaxed font-medium">
              Your account is secured with multi-layer encryption. We monitor active sessions to keep your data safe.
            </p>
            <button className="text-indigo-400 font-bold hover:text-indigo-300 transition-all flex items-center gap-2 text-sm group-hover:translate-x-1">
              Configure Security <ArrowRight size={16} />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-card p-10 hover:border-purple-500/30 transition-all relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-purple-500/10 transition-all"></div>

            <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 text-purple-400 border border-purple-500/10">
              <Settings size={28} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Preferences</h3>
            <p className="text-zinc-400 mb-8 leading-relaxed font-medium">
              Personalize your experience. Manage your dashboard settings, notification triggers, and user profile.
            </p>
            <button className="text-purple-400 font-bold hover:text-purple-300 transition-all flex items-center gap-2 text-sm group-hover:translate-x-1">
              Edit Preferences <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default Home;
