import sortByArrivalTime from "./SortByArrivalTime";

export default function fcfs(processes, time) {
  const newProcesses = [...processes];
  const sortedProcesses = sortByArrivalTime(newProcesses);
  const currentProcess = sortedProcesses.find(
    (process) => process.arrivalTime <= time && process.remainingTime > 0
  );
  console.log(newProcesses);
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
  console.log(sortedProcesses);
  return sortedProcesses;
}
