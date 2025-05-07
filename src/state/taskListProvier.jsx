import { useEffect, useReducer } from "react";
import { TaskReducer } from "./taskReducer";
import { loadTasks, saveTasks } from "../services/taskService";
import { TaskContext } from "./taskContext";

const initialState = {
  tasks: [],
  error: null,
  filter: "all", // all, active, incomplete
};

export const TaskListProvider = ({ children }) => {
  const [taskList, dispatch] = useReducer(TaskReducer, initialState);

  useEffect(() => {
    const loadTasksFromRemote = async () => {
      try {
        const tasks = await loadTasks();
        console.log("Loaded tasks from remote:", tasks);
        dispatch({ type: "SET_TASKS", payload: tasks });
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: error.message });
      }
    };
    loadTasksFromRemote();
  }, []);

  useEffect(() => {
    const saveToRemote = async () => {
      try {
        if (taskList.tasks.length === 0) return;
        await saveTasks(taskList.tasks);
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: error.message });
      }
    };
    saveToRemote();
  }, [taskList.tasks]);

  return (
    <TaskContext.Provider value={{ state: taskList, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};
