import { Routes, Route } from "react-router-dom";
import TaskList from "../components/taskList";
import TaskForm from "../components/taskForm";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<TaskList />} />
      <Route path="/new" element={<TaskForm />} />
      <Route path="/edit/:id" element={<TaskForm />} />
    </Routes>
  );
};

export default AppRoutes;
