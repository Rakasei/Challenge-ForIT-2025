import { Link } from "react-router-dom";

const TaskItem = ({ task, onDelete }) => {
  return (
    <li>
      {task.title} - {task.completed ? "✅" : "❌"}
      <Link to={`/edit/${task.id}`}>✏️</Link>
      <button onClick={() => onDelete(task.id)}>🗑</button>
    </li>
  );
};

export default TaskItem;
