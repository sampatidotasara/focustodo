import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import TaskForm from "../components/TaskForm";
import FilterBar from "../components/FilterBar";
import TaskList from "../components/TaskList";
import WeeklyChart from "../components/WeeklyChart";
import { useTasks } from "../context/TaskContext";

function Home() {
  const { darkMode } = useTasks();

  return (
    <div className={darkMode ? "container dark" : "container"}>
      <Navbar />

      <Dashboard />

      <TaskForm />

      <FilterBar />

      <TaskList />

      <WeeklyChart />
    </div>
  );
}

export default Home;
