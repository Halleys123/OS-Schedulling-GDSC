import styles from "./InformationPanel.module.css";

import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";

import algorithms from "../../data/algorithms";

InformationPanel.propTypes = {
  algorithmId: PropTypes.string,
};

export default function InformationPanel({ algorithmId = "None" } = {}) {
  const algorithm = algorithms.find((algorithm) => {
    console.log(algorithm.id, algorithmId);
    return algorithm.id === algorithmId;
  });
  const name = algorithm?.name;
  const definition = algorithm?.details?.definition;
  const description = algorithm?.details?.description;
  const working = algorithm?.details?.working;

  return (
    <div className={styles.panel}>
      <AnimatePresence>
        <motion.div
          id={algorithmId}
          initial={{
            opacity: 0,
            x: -100,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          exit={{
            opacity: 0,
            x: -100,
          }}
          transition={{
            duration: 0.5,
          }}
          className={`${styles.titleBox} ${styles.hoverBox}`}
        >
          <h1 className={styles.title}>{name ? name : "Nothing Selected"}</h1>
          <span className={styles.description}>
            {definition ? definition : "No Information Available"}
          </span>
          <span className={styles.detailText}>
            {description ? description : "No Information Available"}
          </span>
        </motion.div>
        <motion.div
          id={algorithmId}
          initial={{
            opacity: 0,
            x: 100,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          exit={{
            opacity: 0,
            x: 100,
          }}
          transition={{
            duration: 0.5,
          }}
          className={`${styles.contentBox} ${styles.hoverBox}`}
        >
          <span className={styles.description}>Working</span>
          <ul className={styles.list}>
            {working
              ? working?.map((characteristic) => (
                  <li key={characteristic} className={styles.listItem}>
                    {characteristic}
                  </li>
                ))
              : "No Information Available"}
          </ul>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
