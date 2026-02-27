import { useEffect, useMemo, useState } from "react";
import TaskFilter from "./components/TaskFilter";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import {
  createTask,
  deleteTask,
  getTasks,
  toggleTask,
  updateTask,
} from "./services/api";
import "./index.css";

function App() {
  // States
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // fetch tasks on page load
  useEffect(() => {
    const loadTasks = async () => {
      try {
        setIsLoading(true);
        setError("");

        const result = await getTasks();
        setTasks(result);
      } catch (loadError) {
        setError(loadError.message || "Could not load tasks.");
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, []);

  // useMemo to remember filtered results
  const filteredTasks = useMemo(() => {
    if (filter === "completed") {
      return tasks.filter((task) => task.completed);
    }

    if (filter === "pending") {
      return tasks.filter((task) => !task.completed);
    }

    return tasks;
  }, [tasks, filter]);

  // create task api call
  const handleCreateTask = async (values) => {
    try {
      setError("");
      const result = await createTask({
        ...values,
        completed: false,
      });

      setTasks((previous) => [...previous, result.data]);
    } catch (createError) {
      setError(createError.message || "Could not create task.");
    }
  };

  // toggle task api call
  const handleToggleTask = async (taskId) => {
    try {
      setError("");
      const result = await toggleTask(taskId);

      setTasks((previous) =>
        previous.map((task) => (task.id === taskId ? result.data : task)),
      );
    } catch (toggleError) {
      setError(toggleError.message || "Could not toggle task.");
    }
  };

  // delete task api call
  const handleDeleteTask = async (taskId) => {
    try {
      setError("");
      await deleteTask(taskId);

      setTasks((previous) => previous.filter((task) => task.id !== taskId));
    } catch (deleteError) {
      setError(deleteError.message || "Could not delete task.");
    }
  };

  // update task api call
  const handleUpdateTask = async (taskId, values) => {
    try {
      setError("");

      const payload = {
        title: values.title,
        description: values.description,
        completed: values.completed,
        priority: values.priority,
      };

      const result = await updateTask(taskId, payload);

      setTasks((previous) =>
        previous.map((task) => (task.id === taskId ? result.data : task)),
      );
    } catch (updateError) {
      setError(updateError.message || "Could not update task.");
    }
  };

  return (
    <main className="app-container">
      <header className="app-header">
        <h1>Task Manager</h1>
      </header>

      <section className="panel">
        <TaskForm onSubmit={handleCreateTask} submitLabel="Add Task" />
      </section>

      <section className="panel">
        <div className="panel-header">
          <h2>Tasks</h2>
          <TaskFilter selectedFilter={filter} onChange={setFilter} />
        </div>

        {isLoading && <p className="state-info">Loading tasks...</p>}

        {!!error && <p className="state-error">{error}</p>}

        {!isLoading && (
          <TaskList
            tasks={filteredTasks}
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
            onUpdate={handleUpdateTask}
          />
        )}
      </section>
    </main>
  );
}

export default App;
