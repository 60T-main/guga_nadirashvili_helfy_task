import { useEffect, useState } from "react";

function TaskForm({ initialValues, onSubmit, onCancel, submitLabel = "Save" }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");

  useEffect(() => {
    // If values exist, edit mode.
    if (initialValues) {
      setTitle(initialValues.title || "");
      setDescription(initialValues.description || "");
      setPriority(initialValues.priority || "medium");
      return;
    }

    // If no values exist, create mode.
    setTitle("");
    setDescription("");
    setPriority("medium");
  }, [initialValues]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const cleanTitle = title.trim();
    const cleanDescription = description.trim();

    if (!cleanTitle || !cleanDescription) {
      alert("Please enter title and description.");
      return;
    }

    onSubmit({
      title: cleanTitle,
      description: cleanDescription,
      priority,
    });

    // Clear only when creating.
    if (!initialValues) {
      setTitle("");
      setDescription("");
      setPriority("medium");
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>{initialValues ? "Edit Task" : "Create Task"}</h2>

      <div className="task-form-row">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Task title"
          maxLength={120}
        />
      </div>

      <div className="task-form-row">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Task description"
          rows={3}
          maxLength={600}
        />
      </div>

      <div className="task-form-row">
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="task-form-actions">
        <button className="btn btn-primary" type="submit">
          {submitLabel}
        </button>
        {onCancel && (
          <button
            className="btn btn-secondary"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;
