import "./App.css";
import { ErrorNotification } from "./components/error-notification";
import { TaskDashboard } from "./components/task-dashboard";
import { TaskProvider } from "./state/taskProvier";

function App() {
  return (
    <TaskProvider>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Task Dashboard</h1>
        <ErrorNotification />
        <TaskDashboard />
      </div>
    </TaskProvider>
  );
}

export default App;
