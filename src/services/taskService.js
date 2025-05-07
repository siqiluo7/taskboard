/**
 * This service handles the storage and retrieval of tasks from localStorage.
 * */
export const loadTasks = async () => {
  try {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  } catch (error) {
    console.error("Load Error:", error);
    throw new Error("Failed to load tasks");
  }
};

export const createTask = async (task) => {
  try {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const newTasks = [...tasks, task];
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    return task;
  } catch (error) {
    console.error("Create Error:", error);
    throw new Error("Failed to create task");
  }
};

export const updateTask = async (taskId, updates) => {
  try {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = tasks.map((t) =>
      t.id === taskId ? { ...t, ...updates } : t
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    return updatedTasks.find((t) => t.id === taskId);
  } catch (error) {
    console.error("Update Error:", error);
    throw new Error("Failed to update task");
  }
};

export const deleteTask = async (taskId) => {
  try {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const filteredTasks = tasks.filter((t) => t.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(filteredTasks));
    return taskId;
  } catch (error) {
    console.error("Delete Error:", error);
    throw new Error("Failed to delete task");
  }
};
