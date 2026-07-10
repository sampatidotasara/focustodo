import {
  FaTasks,
  FaCheckCircle,
  FaClock,
  FaBullseye,
} from "react-icons/fa";

import { useTasks } from "../context/TaskContext";

function Dashboard() {
  const { tasks } = useTasks();

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = totalTasks - completedTasks;

  const totalFocus = tasks.reduce(
    (sum, task) => sum + task.actualTime,
    0
  );

  const accuracy =
    totalTasks === 0
      ? 0
      : Math.round(
          tasks.reduce((sum, task) => {
            if (task.estimatedTime === 0) return sum;

            const value =
              Math.min(task.actualTime, task.estimatedTime) /
              task.estimatedTime;

            return sum + value * 100;
          }, 0) / totalTasks
        );

  return (
    <div className="dashboard">

      <div className="card total-card">
        <FaTasks className="card-icon" />
        <h2>{totalTasks}</h2>
        <p>Total Tasks</p>
      </div>

      <div className="card complete-card">
        <FaCheckCircle className="card-icon" />
        <h2>{completedTasks}</h2>
        <p>Completed</p>
      </div>

      <div className="card focus-card">
        <FaClock className="card-icon" />
        <h2>{totalFocus}</h2>
        <p>Focus Minutes</p>
      </div>

      <div className="card accuracy-card">
        <FaBullseye className="card-icon" />
        <h2>{accuracy}%</h2>
        <p>Accuracy</p>
      </div>

    </div>
  );
}

export default Dashboard;
