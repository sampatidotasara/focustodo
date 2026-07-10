import { useTasks } from "../context/TaskContext";
import TaskCard from "./TaskCard";

function TaskList() {
  const {
    tasks,
    search,
    filter,
    categoryFilter,
  } = useTasks();

  let filteredTasks = [...tasks];

  // Search
  if (search) {
    filteredTasks = filteredTasks.filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Status Filter
  if (filter === "active") {
    filteredTasks = filteredTasks.filter(
      (task) => !task.completed
    );
  }

  if (filter === "completed") {
    filteredTasks = filteredTasks.filter(
      (task) => task.completed
    );
  }

  // Category Filter
  if (categoryFilter !== "all") {
    filteredTasks = filteredTasks.filter(
      (task) => task.category === categoryFilter
    );
  }

  return (
    <div className="task-list">
      <h2>Your Tasks</h2>

      {filteredTasks.length === 0 ? (
        <div className="empty-state">
          <h3>No Tasks Found</h3>
          <p>Add a new task to get started.</p>
        </div>
      ) : (
        filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
          />
        ))
      )}
    </div>
  );
}

export default TaskList;
