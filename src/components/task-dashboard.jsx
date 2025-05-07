import { useContext } from "react";
import { TaskItem } from "./task-item";
import { TaskContext } from "../state/taskContext";
import { AddTask } from "./add-task";
import { TaskFilter } from "./task-filter";

export const TaskDashboard = () => {
  const { state } = useContext(TaskContext);
  const filteredTasks = state.tasks.filter((task) => {
    if (state.filter === "completed") {
      return task.completed;
    } else if (state.filter === "active") {
      return !task.completed;
    }
    return state.tasks;
  });

  return (
    <>
      <AddTask />
      <TaskFilter />
      <div className="min-h-screen bg-gray-100 p-4">
        {filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </>
  );
};
