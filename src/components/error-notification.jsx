import { useContext } from "react";
import { TaskContext } from "../state/taskContext";

/**
 * ErrorNotification component displays an error message if there is an error in the TaskContext.
 * */
export const ErrorNotification = () => {
  const { state } = useContext(TaskContext);

  return (
    state?.error && (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {state.error}
      </div>
    )
  );
};
