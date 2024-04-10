import sortByArrivalTime from "./SortByArrivalTime";

export default function sjfNonPremptive(processes, time) {
  const newProcesses = [...processes];
  const sortedProcesses = sortByArrivalTime(newProcesses);
  const eligibleProcesses = sortedProcesses.filter(
    (process) => process.arrivalTime <= time && process.remainingTime > 0
  );

  let shortestBurstTime = Infinity;
  let selectedProcess = null;

  for (const process of eligibleProcesses) {
    if (process.burstTime < shortestBurstTime) {
      shortestBurstTime = process.burstTime;
      selectedProcess = process;
    }
  }

  if (selectedProcess) {
    selectedProcess.remainingTime -= 1;
    if (selectedProcess.remainingTime === 0) {
      selectedProcess.completionTime = time + 1;
      selectedProcess.turnaroundTime =
        selectedProcess.completionTime - selectedProcess.arrivalTime;
      selectedProcess.waitingTime =
        selectedProcess.turnaroundTime - selectedProcess.burstTime;
      selectedProcess.responseTime = selectedProcess.waitingTime;
    }
  }

  return sortedProcesses;
}
