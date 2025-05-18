
import { motion } from "framer-motion";

export default function Relatorios() {
  return (
    <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 30 }}
          transition={{ duration: 0.3 }}
        >
          <h1>Relatórios do Sistema</h1>
        </motion.div>
  )
}