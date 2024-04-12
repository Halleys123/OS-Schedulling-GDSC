import styles from "./Overlay.module.css";

import { motion } from "framer-motion";
import PropTypes from "prop-types";

import FilterInput from "../FilterInput/FilterInput";

Overlay.propTypes = {
  processDetails: PropTypes.object,
  hideOverlay: PropTypes.func,
  handleProcessDetails: PropTypes.func,
};

export default function Overlay({
  processDetails = {},
  hideOverlay = () => {},
  handleProcessDetails = () => {},
} = {}) {
  async function getBurstTime() {
    const response = await fetch("YOUR_URL_HERE", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(processDetails),
    });
    console.log(response);
    const data = await response.json();

    hideOverlay();
    handleProcessDetails({ type: "burstTimes", value: data.prediction });
  }

  function setSubmittime(value) {
    handleProcessDetails({ type: "submittime", value: value });
  }
  // function setWaittime(value) {
  //   handleProcessDetails({ type: "waittime", value: value });
  // }
  function setReqmemory(value) {
    handleProcessDetails({ type: "reqmemory", value: value });
  }
  function setNprocs(value) {
    handleProcessDetails({ type: "nprocs", value: value });
  }
  function setUsednprocs(value) {
    handleProcessDetails({ type: "usednprocs", value: value });
  }
  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={hideOverlay}
    >
      <motion.div
        className={styles.dialog}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          duration: 0.5,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <span className={styles.title}>Add Process Details</span>
        <div className={styles.filters}>
          <FilterInput
            label="Submit Time"
            setValue={setSubmittime}
            value={processDetails.submittime}
            placeholder="Enter Submit Time"
          />
          {/* 
            <FilterInput
              label="Wait Time"
              setValue={setWaittime}
              value={processDetails.waittime}
              placeholder="Enter Wait Time"
            />
          */}
          <FilterInput
            label="Memory Required"
            setValue={setReqmemory}
            value={processDetails.reqmemory}
            placeholder="Enter Memory Required"
          />
          <FilterInput
            label="Allocated Proccesses"
            setValue={setNprocs}
            value={processDetails.nprocs}
            placeholder="Enter Allocated Processes"
          />
          <FilterInput
            label="Required Allocated Processes"
            setValue={setUsednprocs}
            value={processDetails.usednprocs}
            placeholder="Enter Required Allocated Processes"
          />
        </div>
        <button
          className={styles.button}
          onClick={() => {
            getBurstTime();
          }}
        >
          Add Process
        </button>
      </motion.div>
    </motion.div>
  );
}
