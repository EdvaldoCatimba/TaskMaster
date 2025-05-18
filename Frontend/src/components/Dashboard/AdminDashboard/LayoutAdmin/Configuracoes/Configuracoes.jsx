
import { motion } from "framer-motion";

export default function Configuracoes() {
  return (
    <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 30 }}
          transition={{ duration: 0.3 }}
        >
          <h1>Configurações do Sistema</h1>
        </motion.div>
  )
}