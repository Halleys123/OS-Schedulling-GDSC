import sortByArrivalTime from "./SortByArrivalTime";

export default function sjfPremptive(processes, time) {
  const newProcesses = [...processes];
  const sortedProcesses = sortByArrivalTime(newProcesses);
  // find the process with the least remaining time
  const currentProcess = sortedProcesses
    .filter(
      (process) => process.arrivalTime <= time && process.remainingTime > 0
    )
    .sort((a, b) => a.remainingTime - b.remainingTime)[0];

  if (currentProcess) {
    currentProcess.remainingTime -= 1;
    if (currentProcess.remainingTime === 0) {
      currentProcess.completionTime = time + 1;
      currentProcess.turnaroundTime =
        currentProcess.completionTime - currentProcess.arrivalTime;
      currentProcess.waitingTime =
        currentProcess.turnaroundTime - currentProcess.burstTime;
      currentProcess.responseTime = currentProcess.waitingTime;
    }
  }
  return sortedProcesses;
}
