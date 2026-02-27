import { useState } from "react";
import TaskForm from "./TaskForm";

const getPriorityClass = (priority) => {
  if (priority === "high") return "priority-high";
  if (priority === "medium") return "priority-medium";
  return "priority-low";
};

function TaskItem({ task, onToggle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      onDelete(task.id);
    }
  };

  const handleUpdate = (values) => {
    onUpdate(task.id, {
      ...task,
      ...values,
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="task-item task-item-editing">
        <TaskForm
          initialValues={task}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
          submitLabel="Update"
        />
      </div>
    );
  }

  return (
    <article className={`task-item ${task.completed ? "task-completed" : ""}`}>
      <div className="task-item-header">
        <h3>{task.title}</h3>
        <span className={`priority-badge ${getPriorityClass(task.priority)}`}>
          {task.priority}
        </span>
      </div>

      <p className="task-description">{task.description}</p>

      <p className="task-meta">
        Created: {new Date(task.createdAt).toLocaleString()}
      </p>

      <div className="task-item-actions">
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => onToggle(task.id)}
        >
          {task.completed ? "Mark Pending" : "Mark Complete"}
        </button>
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>
        <button className="btn btn-danger" type="button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </article>
  );
}

export default TaskItem;
