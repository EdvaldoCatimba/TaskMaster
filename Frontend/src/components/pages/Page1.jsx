import React from 'react';
import { motion } from 'framer-motion';

export default function Page1() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ duration: 0.3 }}
    >
      <h2>Página 1</h2>
      <p>Conteúdo da Página 1.</p>
    </motion.div>
  );
}
