// This service handles the storage and retrieval of tasks from localStorage.
export const loadTasks = async () => {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
};

export const saveTasks = async (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// const mockTasks = [
//   {
//     id: 1,
//     title: "Task 1",
//     description: "Description for Task 1",
//     isCompleted: false,
//   },
//   {
//     id: 2,
//     title: "Task 2",
//     description: "Description for Task 2",
//     isCompleted: true,
//   },
// ];
