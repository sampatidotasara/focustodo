import { useEffect, useState } from "react";

function usePomodoro(initialMinutes = 25) {
  const [seconds, setSeconds] = useState(initialMinutes * 60);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;

    const timer = setTimeout(() => {
      setSeconds((prev) => {
        if (prev > 0) return prev - 1;

        setRunning(false);
        return 0;
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds, running]);

  useEffect(() => {
    if (!running) {
      setSeconds(initialMinutes * 60);
    }
  }, [initialMinutes]);

  const start = () => setRunning(true);

  const pause = () => setRunning(false);

  const reset = () => {
    setRunning(false);
    setSeconds(initialMinutes * 60);
  };

  const finish = () => {
    setRunning(false);
    setSeconds(initialMinutes * 60);
  };

  return {
    seconds,
    running,
    start,
    pause,
    reset,
    finish,
  };
}

export default usePomodoro;
