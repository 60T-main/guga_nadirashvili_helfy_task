import { useEffect, useMemo, useState } from "react";
import TaskItem from "./TaskItem";

const AUTO_SLIDE_MS = 3500;

function TaskList({ tasks, onToggle, onDelete, onUpdate }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const duplicatedTasks = useMemo(() => {
    // We duplicate tasks 3 times so the carousel can jump back seamlessly.
    if (tasks.length <= 1) return tasks;
    return [...tasks, ...tasks, ...tasks];
  }, [tasks]);

  useEffect(() => {
    // Start in the middle copy for infinite loop behavior.
    if (tasks.length > 1) {
      setCurrentIndex(tasks.length);
      return;
    }

    setCurrentIndex(0);
  }, [tasks]);

  useEffect(() => {
    if (tasks.length <= 1 || isPaused) return undefined;

    const intervalId = window.setInterval(() => {
      setCurrentIndex((previousIndex) => previousIndex + 1);
    }, AUTO_SLIDE_MS);

    return () => window.clearInterval(intervalId);
  }, [tasks.length, isPaused]);

  const handleTransitionEnd = () => {
    if (tasks.length <= 1) return;

    // If we reach edges, jump to middle copy without animation.
    if (currentIndex >= tasks.length * 2) {
      setIsTransitionEnabled(false);
      setCurrentIndex(tasks.length);
      return;
    }

    if (currentIndex < tasks.length) {
      setIsTransitionEnabled(false);
      setCurrentIndex(tasks.length * 2 - 1);
    }
  };

  useEffect(() => {
    if (isTransitionEnabled) return;

    const frame = window.requestAnimationFrame(() => {
      setIsTransitionEnabled(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [isTransitionEnabled]);

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <h3>No tasks found</h3>
        <p>Create a task or change the filter to see results.</p>
      </div>
    );
  }

  return (
    <section className="task-carousel-wrapper">
      <div className="carousel-actions">
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => setCurrentIndex((previousIndex) => previousIndex - 1)}
          disabled={tasks.length <= 1}
        >
          Prev
        </button>
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => setCurrentIndex((previousIndex) => previousIndex + 1)}
          disabled={tasks.length <= 1}
        >
          Next
        </button>
      </div>

      <div
        className="task-carousel-parent"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className={`task-carousel-track ${isTransitionEnabled ? "with-transition" : ""}`}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {duplicatedTasks.map((task, index) => (
            <div className="task-slide" key={`${task.id}-${index}`}>
              <TaskItem
                task={task}
                onToggle={onToggle}
                onDelete={onDelete}
                onUpdate={onUpdate}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TaskList;
