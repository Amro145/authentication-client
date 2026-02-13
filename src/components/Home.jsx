import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { User, ShieldCheck, Mail, Calendar, Settings } from "lucide-react";

function Home() {
  const { userData } = useSelector((state) => state.auth);

  if (!userData) return null;

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full space-y-8"
      >
        <div className="text-center space-y-2">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-white tracking-tight"
          >
            Welcome back, <span className="text-emerald-400">{userData.name || "User"}</span>!
          </motion.h1>
          <p className="text-slate-400">Here's what's happening with your account today.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 glass-card p-8 flex flex-col md:flex-row items-center gap-8"
          >
            <div className="w-24 h-24 rounded-3xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
              <User size={48} className="text-emerald-400" />
            </div>
            <div className="flex-1 space-y-4 text-center md:text-left">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-white">{userData.name}</h2>
                <div className="flex items-center justify-center md:justify-start gap-2 text-slate-400">
                  <Mail size={16} />
                  <span>{userData.email}</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20 flex items-center gap-1">
                  <ShieldCheck size={12} />
                  Verified Account
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20 flex items-center gap-1">
                  <Calendar size={12} />
                  Last login: {userData.lastLogin ? new Date(userData.lastLogin).toLocaleString() : 'Just now'}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions / Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-8 flex flex-col justify-between"
          >
            <h3 className="text-lg font-bold text-white mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-slate-400 text-sm">Logins</span>
                <span className="text-white font-bold">12</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-slate-400 text-sm">Security Score</span>
                <span className="text-emerald-400 font-bold">98%</span>
              </div>
              <button className="w-full flex items-center justify-center gap-2 mt-2 px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-all border border-emerald-500/20 text-sm font-medium">
                <Settings size={16} />
                Manage Settings
              </button>
            </div>
          </motion.div>
        </div>

        {/* Placeholder for More Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-12 text-center space-y-4"
        >
          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10">
            <ShieldCheck className="text-slate-500" size={24} />
          </div>
          <h3 className="text-xl font-bold text-white">Your data is secure</h3>
          <p className="max-w-md mx-auto text-slate-400">
            We use industry-standard encryption and security practices to ensure your information stays safe and private.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Home;
