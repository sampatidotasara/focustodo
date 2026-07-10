import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import usePomodoro from "../hooks/usePomodoro";

function FocusTimer({ task, onClose }) {
  const { addFocusTime } = useTasks();

  const [focusMinutes, setFocusMinutes] = useState(25);

  const {
    seconds,
    running,
    start,
    pause,
    reset,
    finish,
  } = usePomodoro(focusMinutes);

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  const increaseTime = () => {
    if (!running && focusMinutes < 180) {
      setFocusMinutes((prev) => prev + 1);
    }
  };

  const decreaseTime = () => {
    if (!running && focusMinutes > 1) {
      setFocusMinutes((prev) => prev - 1);
    }
  };

  const handleFinish = () => {
    addFocusTime(task.id, focusMinutes);
    finish();
    alert(`🎉 ${focusMinutes} minutes added!`);
    onClose();
  };

  return (
    <div className="timer-overlay">
      <div className="timer-box">
        <h2>{task.title}</h2>

        <label>Focus Time</label>

        <div className="time-selector">
          <button
            type="button"
            onClick={decreaseTime}
            disabled={running}
          >
            −
          </button>

          <input
            type="number"
            value={focusMinutes}
            min="1"
            max="180"
            disabled={running}
            onChange={(e) =>
              setFocusMinutes(Number(e.target.value))
            }
          />

          <button
            type="button"
            onClick={increaseTime}
            disabled={running}
          >
            +
          </button>
        </div>

        <h1>
          {String(minutes).padStart(2, "0")}:
          {String(secs).padStart(2, "0")}
        </h1>

        <div className="buttons">
          <button
            type="button"
            onClick={running ? pause : start}
          >
            {running ? "⏸ Pause" : "▶ Start"}
          </button>

          <button
            type="button"
            onClick={reset}
          >
            🔄 Reset
          </button>

          <button
            type="button"
            onClick={handleFinish}
          >
            ✅ Finish
          </button>

          <button
            type="button"
            onClick={onClose}
          >
            ❌ Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default FocusTimer;
