const FILTERS = [
  { value: "all", label: "All" },
  { value: "completed", label: "Completed" },
  { value: "pending", label: "Pending" },
];

function TaskFilter({ selectedFilter, onChange }) {
  return (
    <div className="task-filter">
      {FILTERS.map((filter) => (
        <button
          key={filter.value}
          type="button"
          className={`btn ${selectedFilter === filter.value ? "btn-primary" : "btn-secondary"}`}
          onClick={() => onChange(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

export default TaskFilter;
