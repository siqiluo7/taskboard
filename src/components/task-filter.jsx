import { useContext } from "react";
import { TaskContext } from "../state/taskContext";

const filters = ["all", "active", "completed"];

export const TaskFilter = () => {
  const { state, dispatch } = useContext(TaskContext);

  return (
    <div className="flex gap-4 mb-6">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => dispatch({ type: "SET_FILTER", payload: filter })}
          className={`px-4 py-2 rounded capitalize ${
            state.filter === filter
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};
