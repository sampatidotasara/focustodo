import { useState } from "react";
import {
  FaCheck,
  FaEdit,
  FaTrash,
  FaClock,
  FaCalendarAlt,
  FaPlay,
} from "react-icons/fa";

import { useTasks } from "../context/TaskContext";
import FocusTimer from "./FocusTimer";
import calculateAccuracy from "../utils/calculateAccuracy";

function TaskCard({ task }) {
  const {
    deleteTask,
    toggleComplete,
    editTask,
  } = useTasks();

  const [editing, setEditing] = useState(false);
  const [showTimer, setShowTimer] = useState(false);

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const accuracy = calculateAccuracy(
    task.estimatedTime,
    task.actualTime
  );

  const handleSave = () => {
    editTask({
      ...task,
      title,
      description,
    });

    setEditing(false);
  };

  return (
    <>
      <div className={`task-card ${task.completed ? "completed" : ""}`}>

        <div className="task-top">

          <span className={`priority ${task.priority.toLowerCase()}`}>
            {task.priority}
          </span>

          <span className={`category ${task.category.toLowerCase()}`}>
            {task.category}
          </span>

        </div>

        {editing ? (
          <>
            <input
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
            />

            <textarea
              rows="3"
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
            />

            <div className="actions">
              <button onClick={handleSave}>Save</button>

              <button onClick={()=>setEditing(false)}>
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>

            <h2>{task.title}</h2>

            <p>{task.description}</p>

            <div className="task-details">

              <div>
                <FaClock />
                <span>{task.estimatedTime} min</span>
              </div>

              <div>
                🎯
                <span>{task.actualTime} min</span>
              </div>

              <div>
                <FaCalendarAlt />
                <span>
                  {task.dueDate || "No Due Date"}
                </span>
              </div>

            </div>

            <div className="progress">

              <div
                className="progress-fill"
                style={{
                  width: `${Math.min(accuracy,100)}%`
                }}
              />

            </div>

            <p className="accuracy">
              Accuracy {accuracy}%
            </p>

            <div className="actions">

              <button
                className="complete-btn"
                onClick={()=>toggleComplete(task.id)}
              >
                <FaCheck />
                {task.completed ? "Undo" : "Complete"}
              </button>

              <button
                className="focus-btn"
                onClick={()=>setShowTimer(true)}
              >
                <FaPlay />
                Focus
              </button>

              <button
                className="edit-btn"
                onClick={()=>setEditing(true)}
              >
                <FaEdit />
              </button>

              <button
                className="delete-btn"
                onClick={()=>deleteTask(task.id)}
              >
                <FaTrash />
              </button>

            </div>

          </>
        )}

      </div>

      {showTimer && (
        <FocusTimer
          task={task}
          onClose={()=>setShowTimer(false)}
        />
      )}
    </>
  );
}

export default TaskCard;
