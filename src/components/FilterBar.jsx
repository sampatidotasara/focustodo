import { useTasks } from "../context/TaskContext";

function FilterBar() {
  const {
    search,
    setSearch,

    filter,
    setFilter,

    categoryFilter,
    setCategoryFilter,
  } = useTasks();

  return (
    <div className="filter-bar">
      {/* Search */}
      <input
        type="text"
        placeholder="🔍 Search task..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Status Filter */}
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="all">All Tasks</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>

      {/* Category Filter */}
      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
      >
        <option value="all">All Categories</option>
        <option value="Study">Study</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Health">Health</option>
        <option value="Finance">Finance</option>
        <option value="Shopping">Shopping</option>
      </select>
    </div>
  );
}

export default FilterBar;
