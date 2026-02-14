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
        <div>
          <h1>Home</h1>
          <p>Welcome back, {userData.name || "User"}.</p>
          <p>Email: {userData.email}</p>
          <p>Is Verified: {userData.isVerified ? "Yes" : "No"}</p>
          <p>Is Active: {userData.isActive ? "Yes" : "No"}</p>
          <p>Created At: {userData.createdAt}</p>
          <p>Updated At: {userData.updatedAt}</p>
        </div>

      </motion.div>
    </div>
  );
}

export default Home;
