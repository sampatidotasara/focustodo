import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  // Tasks
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Search
  const [search, setSearch] = useState("");

  // Status Filter
  const [filter, setFilter] = useState("all");

  // Category Filter
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Dark Mode
  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem("darkMode")) || false;
  });

  // Save Tasks
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Save Theme
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // Add Task
  const addTask = (task) => {
    const newTask = {
      id: uuid(),
      title: task.title,
      description: task.description,
      estimatedTime: Number(task.estimatedTime),
      actualTime: 0,
      priority: task.priority || "Medium",
      category: task.category || "Study",
      dueDate: task.dueDate || "",
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTasks((prev) => [...prev, newTask]);
  };

  // Delete Task
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // Toggle Complete
  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // Edit Task
  const editTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  // Add Focus Time
  const addFocusTime = (id, minutes) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              actualTime: task.actualTime + minutes,
            }
          : task
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        addTask,
        deleteTask,
        toggleComplete,
        editTask,
        addFocusTime,

        search,
        setSearch,

        filter,
        setFilter,

        categoryFilter,
        setCategoryFilter,

        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}
