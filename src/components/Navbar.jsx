import { FaTasks, FaMoon, FaSun } from "react-icons/fa";
import { useTasks } from "../context/TaskContext";

function Navbar() {
  const { darkMode, setDarkMode } = useTasks();

  return (
    <nav className="navbar">
      <div className="logo">
        <FaTasks size={28} />
        <div>
          <h1>FocusDo</h1>
          <p>Stay Focused. Stay Productive.</p>
        </div>
      </div>

      <button
        className="theme-btn"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? <FaSun /> : <FaMoon />}
        {darkMode ? " Light" : " Dark"}
      </button>
    </nav>
  );
}

export default Navbar;
