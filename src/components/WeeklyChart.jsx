import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { useTasks } from "../context/TaskContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function WeeklyChart() {
  const { tasks } = useTasks();

  const labels = tasks.map((task) => task.title);

  const estimated = tasks.map((task) => task.estimatedTime);

  const actual = tasks.map((task) => task.actualTime);

  const data = {
    labels,

    datasets: [
      {
        label: "Estimated Time",
        data: estimated,
        backgroundColor: "#3b82f6",
      },

      {
        label: "Actual Time",
        data: actual,
        backgroundColor: "#22c55e",
      },
    ],
  };

  const options = {
    responsive: true,

    plugins: {
      legend: {
        position: "top",
      },

      title: {
        display: true,
        text: "Estimated vs Actual Time",
      },
    },
  };

  return (
    <div className="chart-container">
      <Bar data={data} options={options} />
    </div>
  );
}

export default WeeklyChart;
