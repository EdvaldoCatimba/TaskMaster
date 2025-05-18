import React from "react";
import { motion } from "framer-motion";

export default function DashboardAdmin() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ duration: 0.3 }}
    >
      <h1>Painel do Admin</h1>
      <p>Bem-vindo ao painel administrativo.</p>
    </motion.div>
  );
}
