import styles from "./Visualizer.module.css";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";

import ProcessBox from "../ProcessBox/ProcessBox";

import fcfs from "./FCFS";
import sjfPremptive from "./SJF_Premptive";
import sjfNonPremptive from "./SJF_Non_Premptive";

import processesList from "./processes";
// sjf non premptive

export default function Visualizer() {
  const { algorithmId } = useParams();

  const [time, setTime] = useState(0);
  const [active, setActive] = useState(1);
  const [processes, setProcesses] = useState([...processesList]);

  useEffect(() => {
    let timer = null;
    if (active === 0) {
      let sortedProcesses;
      if (algorithmId === "first-come-first-serve") {
        sortedProcesses = fcfs(processes, time);
      } else if (algorithmId === "shortest-job-first") {
        sortedProcesses = sjfPremptive(processes, time);
      } else if (algorithmId === "shortest-job-first-non-premptive") {
        sortedProcesses = sjfNonPremptive(processes, time);
      }
      // fcfs
      if (sortedProcesses.every((process) => process.remainingTime === 0)) {
        setActive(1);
      }
      setProcesses(sortedProcesses);

      timer = setTimeout(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [time, active]);

  return (
    <div className={styles.main}>
      <div className={styles.table}>
        <div className={styles.header}>
          <span className={styles.title}>Process</span>
          <span className={styles.title}>Arrival Time</span>
          <span className={styles.title}>Burst Time</span>
          <span className={styles.title}>Remainting Time</span>
          <span className={styles.title}>Completion Time</span>
          <span className={styles.title}>Turnaround Time</span>
          <span className={styles.title}>Waiting Time</span>
          <span className={styles.title}>Response Time</span>
        </div>
        {processes
          .filter((process) => process.name !== "DUMMY")
          .map((process, index) => (
            <div key={index} className={styles.tableRow}>
              <span className={styles.rowItem}>{process.name}</span>
              <span className={styles.rowItem}>{process.arrivalTime}</span>
              <span className={styles.rowItem}>{process.burstTime}</span>
              <span className={styles.rowItem}>{process.remainingTime}</span>
              <span className={styles.rowItem}>
                {process.completionTime ? process.completionTime : "0"}
              </span>
              <span className={styles.rowItem}>
                {process.turnaroundTime ? process.turnaroundTime : "0"}
              </span>
              <span className={styles.rowItem}>
                {process.waitingTime ? process.waitingTime : "0"}
              </span>
              <span className={styles.rowItem}>
                {process.responseTime ? process.responseTime : "0"}
              </span>
            </div>
          ))}
      </div>
      <div className={styles.buttons}>
        <button
          className={styles.button}
          onClick={() => {
            // reload window
            window.location.reload();
          }}
        >
          Reset
        </button>
        <button
          className={styles.button}
          onClick={() => {
            setActive(1);
          }}
        >
          Stop Simulation
        </button>
        <button
          className={styles.button}
          onClick={() => {
            setActive(0);
          }}
        >
          Start Simulation
        </button>
      </div>
      <AnimatePresence>
        <motion.div className={styles.queue} layout>
          {processes
            .filter(
              (process) =>
                process.arrivalTime <= time &&
                process.remainingTime > 0 &&
                process != processes[0]
            )
            .map((process) => (
              <ProcessBox key={process.id} process={process} />
            ))}
        </motion.div>
      </AnimatePresence>

      <div className={styles.details}>
        <span className={styles.time}>{time} Seconds Elapsed</span>
      </div>
    </div>
  );
}
