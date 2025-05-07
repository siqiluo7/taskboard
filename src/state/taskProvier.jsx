import { useEffect, useReducer } from "react";
import { TaskReducer } from "./taskReducer";
import { TaskContext } from "./taskContext";
import {
  loadTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";

const initialState = {
  tasks: [],
  error: null,
  filter: "all", // all, active (incomplete), completed
};

/*
 * TaskProvider provides the task context to its children.
 * It uses the TaskReducer to manage the state of tasks and provides actions to manipulate tasks.
 * It talks to the taskService to load task on mounting, and to create, update, and delete tasks on every action.
 */
export const TaskProvider = ({ children }) => {
  const [taskList, dispatch] = useReducer(TaskReducer, initialState);

  // Load tasks from remote storage when the component mounts
  useEffect(() => {
    const loadTasksFromRemote = async () => {
      try {
        const tasks = await loadTasks();
        dispatch({ type: "SET_TASKS", payload: tasks });
        dispatch({ type: "CLEAR_ERROR" });
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: error.message });
      }
    };
    loadTasksFromRemote();
  }, []);

  const actions = {
    addTask: async (task) => {
      try {
        const createdTask = await createTask(task);
        dispatch({ type: "ADD_TASK", payload: createdTask });
        dispatch({ type: "CLEAR_ERROR" });
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: error.message });
      }
    },
    toggleTask: async (taskId) => {
      try {
        const task = taskList.tasks.find((t) => t.id === taskId);
        const updatedTask = await updateTask(taskId, {
          completed: !task.completed,
        });
        if (!updatedTask) {
          throw new Error(
            "Error updating task, Please try again or refresh the page"
          );
        }
        dispatch({ type: "UPDATE_TASK", payload: updatedTask });
        dispatch({ type: "CLEAR_ERROR" });
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: error.message });
      }
    },
    deleteTask: async (taskId) => {
      try {
        await deleteTask(taskId);
        dispatch({ type: "DELETE_TASK", payload: taskId });
        dispatch({ type: "CLEAR_ERROR" });
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: error.message });
      }
    },
    setFilter: (filter) => dispatch({ type: "SET_FILTER", payload: filter }),
  };

  return (
    <TaskContext.Provider value={{ state: taskList, actions }}>
      {children}
    </TaskContext.Provider>
  );
};
