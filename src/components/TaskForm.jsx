import { useState } from "react";
import { useTasks } from "../context/TaskContext";

function TaskForm() {
  const { addTask } = useTasks();

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("Study");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Task title is required!");
      return;
    }

    if (!estimatedTime || estimatedTime <= 0) {
      alert("Enter a valid estimated time.");
      return;
    }

    addTask({
      title,
      description,
      estimatedTime,
      priority,
      category,
      dueDate,
    });

    // Reset Form
    setTitle("");
    setDescription("");
    setEstimatedTime("");
    setPriority("Medium");
    setCategory("Study");
    setDueDate("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>➕ Add New Task</h2>

      <div className="form-group">
        <label>Task Title</label>
        <input
          type="text"
          placeholder="Enter task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          rows="4"
          placeholder="Describe your task..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Estimated Time (minutes)</label>
          <input
            type="number"
            placeholder="60"
            value={estimatedTime}
            onChange={(e) => setEstimatedTime(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Study</option>
            <option>Work</option>
            <option>Personal</option>
            <option>Health</option>
            <option>Finance</option>
            <option>Shopping</option>
          </select>
        </div>

        <div className="form-group">
          <label>Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
      </div>

      <button type="submit" className="add-btn">
        ➕ Add Task
      </button>
    </form>
  );
}

export default TaskForm;
