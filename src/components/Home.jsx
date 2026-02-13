import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { User, ShieldCheck, Mail, Calendar, Settings, ArrowRight } from "lucide-react";

function Home() {
  const { userData } = useSelector((state) => state.auth);

  if (!userData) return null;

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl w-full space-y-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-8">
          <div className="space-y-2">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-white tracking-tight"
            >
              Welcome back, <span className="text-indigo-400 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">{userData.name || "User"}</span>
            </motion.h1>
            <p className="text-slate-400 text-lg">Here's your account overview.</p>
          </div>
          <div className="hidden md:block">
            <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 text-sm font-medium flex items-center gap-2">
              <Calendar size={14} className="text-indigo-400" />
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 glass-card p-8 flex flex-col md:flex-row items-center gap-8 hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-1 shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden relative">
                <User size={64} className="text-slate-700 relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10" />
              </div>
            </div>
            <div className="flex-1 space-y-6 text-center md:text-left w-full">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-white">{userData.name}</h2>
                <div className="flex items-center justify-center md:justify-start gap-2 text-slate-400">
                  <Mail size={16} className="text-indigo-400" />
                  <span>{userData.email}</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <span className="px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-300 text-sm font-medium border border-indigo-500/20 flex items-center gap-2 shadow-sm shadow-indigo-500/5">
                  <ShieldCheck size={14} />
                  Verified Account
                </span>
                <span className="px-4 py-1.5 rounded-full bg-slate-800 text-slate-400 text-sm font-medium border border-white/5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Active
                </span>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-8 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Quick Stats</h3>
              <button className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
                <Settings size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-white/5 rounded-xl p-4 border border-white/5 hover:bg-white/10 transition-colors cursor-default">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-400 text-sm font-medium">Total Logins</span>
                  <span className="text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded text-xs font-bold">+12%</span>
                </div>
                <div className="text-2xl font-bold text-white">24</div>
              </div>

              <div className="bg-white/5 rounded-xl p-4 border border-white/5 hover:bg-white/10 transition-colors cursor-default">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-400 text-sm font-medium">Security Score</span>
                  <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded text-xs font-bold">Good</span>
                </div>
                <div className="text-2xl font-bold text-white flex items-center gap-2">
                  98%
                  <div className="h-1.5 w-16 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 w-[98%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Security Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card p-8 hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-indigo-500/20"></div>

            <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-4 text-indigo-400 border border-indigo-500/20">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Security Status</h3>
            <p className="text-slate-400 mb-6 line-clamp-2">
              Your account is protected with industry-standard encryption. Two-factor authentication is recommended.
            </p>
            <button className="text-indigo-400 font-medium hover:text-indigo-300 transition-colors flex items-center gap-2 text-sm">
              View Security Settings <ArrowRight size={14} />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-card p-8 hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-purple-500/20"></div>

            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 text-purple-400 border border-purple-500/20">
              <Settings size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Account Settings</h3>
            <p className="text-slate-400 mb-6 line-clamp-2">
              Manage your profile, email preferences, and notification settings from your dashboard.
            </p>
            <button className="text-purple-400 font-medium hover:text-purple-300 transition-colors flex items-center gap-2 text-sm">
              Manage Account <ArrowRight size={14} />
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default Home;
