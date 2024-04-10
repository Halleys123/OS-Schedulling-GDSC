import sjfIcon from "../assets/algo-icons/sjf.svg";
import rrIcon from "../assets/algo-icons/roundrobin.svg";
import fcfsIcon from "../assets/algo-icons/fcfs.svg";

export default [
  {
    id: "first-come-first-serve",
    name: "First Come First Serve",
    description:
      "First Come First Serve (FCFS) algorithm selects the process that arrives first.",
    icon: fcfsIcon,
    metric: "Fairness, Overhead",
    link: "/first-come-first-serve",
    details: {
      fullName: "First Come First Serve",
      definition: "Prioritizes tasks based on their arrival time.",
      description:
        "First Come First Serve (FCFS) is a non-preemptive scheduling algorithm that prioritizes tasks based on their arrival time. The task that arrives first is processed first, followed by the next task in the queue. This approach aims to provide a fair distribution of CPU resources among all tasks.",
      working: [
        "Task Arrival: New tasks arrive and are added to the ready queue.",
        "Selection: The scheduler selects the task that arrived first in the queue.",
        "Execution: The selected task is allocated CPU resources and begins execution.",
        "Completion: Once a task finishes execution, it is removed from the queue. The scheduler then selects the next task based on arrival time.",
      ],
      metrics: {
        "Average Waiting Time (AWT)": "Typically Higher compared to SJF",
        Fairness: "All tasks are processed in the order they arrive.",
      },
    },
  },
  {
    id: "shortest-job-first",
    name: "Shortest Job First",
    description:
      "Shortest Job First (SJF) algorithm selects the process that has the smallest execution time.",
    icon: sjfIcon,
    metric: "Fast, Overhead",
    link: "/shortest-job-first",
    details: {
      fullName: "Shortest Job First",
      definition: "Prioritizes tasks with the shortest execution time.",
      description:
        "Shortest Job First (SJF) is a non-preemptive scheduling algorithm that prioritizes tasks based on their execution time. The task with the shortest execution time is processed first, followed by the next shortest task, and so on. This approach aims to minimize the average waiting time for all tasks in the queue.",
      working: [
        "Task Arrival: New tasks arrive and are added to the ready queue.",
        "Selection: The scheduler continuously scans the ready queue and selects the task with the shortest execution time remaining.",
        "Execution: The selected task is allocated CPU resources and begins execution.",
        "Completion: Once a task finishes execution, it is removed from the queue. The scheduler then repeats steps 2 and 3 to select the next shortest job.",
      ],
      metrics: {
        "Average Waiting Time (AWT)": "Typically Lower compared to FCFS ",
        "Improved System Responsiveness": "overall task completion is faster",
      },
    },
  },
  {
    id: "round-robin",
    name: "Round Robin",
    description:
      "Round Robin (RR) algorithm assigns a fixed time unit per process.",
    icon: rrIcon,
    metric: "Fairness, Overhead",
    link: "/round-robin",
  },
];
