import styles from "./ProcessBox.module.css";

import PropTypes from "prop-types";
import { motion } from "framer-motion";

ProcessBox.propTypes = {
  process: PropTypes.object,
};

export default function ProcessBox({ process }) {
  return (
    <motion.div
      className={styles.processBox}
      layout
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        // fill color based on completion
        style={{
          width: `${
            ((process.burstTime - process.remainingTime) * 100) /
            process.burstTime
          }%`,
          backgroundColor: process.name === "DUMMY" ? "transparent" : "#1e90ff",
        }}
      ></motion.div>
      <span className={styles.completionTime}>
        {process.name ? process.name : "-"}
      </span>
      <span className={styles.turnaroundTime}>
        {process.remainingTime ? process.remainingTime + "s Left" : "-"}
      </span>
      <span className={styles.arrivalTime}>
        {process.arrivalTime ? process.arrivalTime + " s" : "-"}
      </span>
    </motion.div>
  );
}
