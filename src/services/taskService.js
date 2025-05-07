/**
 * This service handles the storage and retrieval of tasks from localStorage.
 * */
export const loadTasks = async () => {
  try {
    return getTasksFromLocalStorage();
  } catch (error) {
    console.error("Load Error:", error);
    throw new Error("Failed to load tasks");
  }
};

export const createTask = async (task) => {
  try {
    const tasks = getTasksFromLocalStorage();
    const newTasks = [...tasks, task];
    setTasksToLocalStorage(newTasks);
    return task;
  } catch (error) {
    console.error("Create Error:", error);
    throw new Error("Failed to create task");
  }
};

export const updateTask = async (taskId, updates) => {
  try {
    const tasks = getTasksFromLocalStorage();
    const updatedTasks = tasks.map((t) =>
      t.id === taskId ? { ...t, ...updates } : t
    );
    setTasksToLocalStorage(updatedTasks);
    return updatedTasks.find((t) => t.id === taskId);
  } catch (error) {
    console.error("Update Error:", error);
    throw new Error("Failed to update task");
  }
};

export const deleteTask = async (taskId) => {
  try {
    const tasks = getTasksFromLocalStorage();
    const filteredTasks = tasks.filter((t) => t.id !== taskId);
    setTasksToLocalStorage(filteredTasks);
    return taskId;
  } catch (error) {
    console.error("Delete Error:", error);
    throw new Error("Failed to delete task");
  }
};

const getTasksFromLocalStorage = () => {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
};

const setTasksToLocalStorage = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
