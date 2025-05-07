import { TaskContext } from "../state/taskContext";
import { useContext } from "react";

export const TaskItem = ({ task }) => {
  const { actions } = useContext(TaskContext);

  return (
    <div className="flex items-center p-4 bg-white rounded shadow">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => actions.toggleTask(task.id)}
        className="mr-4"
      />
      <div className="flex-1">
        <h3
          className={`text-lg ${
            task.completed ? "line-through text-gray-400" : "text-gray-800"
          }`}
        >
          {task.title}
        </h3>
        {task.description && (
          <p className="text-gray-600">{task.description}</p>
        )}
      </div>
      <button
        onClick={() => actions.deleteTask(task.id)}
        className="text-red-500 hover:text-red-700"
      >
        Delete
      </button>
    </div>
  );
};
