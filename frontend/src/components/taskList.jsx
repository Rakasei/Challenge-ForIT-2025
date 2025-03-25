import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [hideCompleted, setHideCompleted] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    fetch(`${API_URL}/api/tasks`)
      .then((res) => res.json())
      .then((data) => {
        setTasks(Array.isArray(data.tasks) ? data.tasks : []);
      })
      .catch((err) => console.error("Error al obtener tareas:", err));
  }, []);

  const inputTaskEditStatus = (task) => {
    const updatedTask = { ...task, completed: !task.completed };

    fetch(`${API_URL}/api/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    })
      .then(() => {
        setTasks((prevTasks) =>
          prevTasks.map((t) => (t.id === task.id ? updatedTask : t))
        );
      })
      .catch((err) => console.error("Error al actualizar tarea:", err));
  };

  const deleteTask = (id) => {
    fetch(`${API_URL}/api/tasks/${id}`, { method: "DELETE" })
      .then(() => setTasks(tasks.filter((task) => task.id !== id)))
      .catch((err) => console.error(err));
  };

  const today = new Date();
  const endOfWeek = new Date();
  endOfWeek.setDate(today.getDate() + (7 - today.getDay()));

  const tasksThisWeek = tasks.filter((task) => {
    const taskDate = task.expiration ? new Date(task.expiration) : null;
    return taskDate && taskDate >= today && taskDate <= endOfWeek;
  });

  const totalTasks = tasksThisWeek.length;
  const completedTasks = tasksThisWeek.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  const filteredTasks = tasks.filter(
    (task) =>
      (task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!hideCompleted || !task.completed)
  );




  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div>
      <div className="containerSubtitle">   <h3 className="containerSubtitle" >Estadísticas de esta semana</h3>
        <div className="addButton">
          <Link to="/new" className=" containerAddTask">
            <svg width="1em" height="1.2em" fill="#53b937" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 45.402 45.402" xml:space="preserve" stroke="#53b937"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141 c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27 c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435 c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"></path> </g> </g></svg>
            Agregar Tarea
          </Link></div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card text-white bg-primary py-0 ">
              <div className="card-body">
                <h5 className="card-title fs-1">{totalTasks}</h5>
                <p className="card-text fs-6">Total de Tareas</p>
              </div>
            </div>
          </div>
          <div className="col ">
            <div className="card text-white bg-success py-0">
              <div className="card-body">
                <h5 className="card-title fs-1">{completedTasks}</h5>
                <p className="card-text fs-6">Tareas Completadas</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card text-white bg-warning py-0">
              <div className="card-body">
                <h5 className="card-title fs-1">{pendingTasks}</h5>
                <p className="card-text fs-6">Tareas Pendientes</p>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className="container mt-4">
        <div className="containerSubtitle">
          <h3>Lista de Tareas</h3>
        </div>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Buscar tarea..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="form-check mb-3 tableFilter">
          <input
            className="form-check-input"
            type="checkbox"
            id="hideCompleted"
            checked={hideCompleted}
            onChange={() => setHideCompleted(!hideCompleted)}
          />
          <label className="form-check-label" htmlFor="hideCompleted">
            Ocultar tareas completadas
          </label>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="alert alert-info text-center" role="alert">
            No se encontraron tareas.
          </div>
        ) : (
          <table className="table">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Título</th>
                <th scope="col">Descripción</th>
                <th scope="col">Estado</th>
                <th scope="col">Prioridad</th>
                <th scope="col">Vencimiento</th>
                <th scope="col">Marcar como completada</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task, index) => (
                <tr key={task.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{task.title}</td>
                  <td className="truncate-text">{task.description}</td>
                  <td>{task.completed ? "Completada" : "Por hacer"}</td>
                  <td>{task.priority}</td>
                  <td>
                    {task.completed
                      ? "Completada"
                      : (() => {
                        if (!task.expiration) return "Sin fecha";

                        const expirationDate = new Date(task.expiration);
                        const now = new Date();
                        const diffTime = expirationDate - now;
                        const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
                        const diffDays = Math.floor(diffHours / 24);

                        if (diffDays > 2) {
                          return `Faltan ${diffDays} días`;
                        } else if (diffHours > 0) {
                          return `Faltan ${diffHours} horas`;
                        } else if (diffDays === 0) {
                          return "Vence hoy";
                        } else {
                          return `Venció hace ${Math.abs(diffDays)} días`;
                        }
                      })()}
                  </td>

                  <td>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => inputTaskEditStatus(task)}
                    />
                  </td>

                  <td>
                    <button
                      className="btn btn-danger btn-sm buttons"
                      onClick={() => deleteTask(task.id)}
                    >
                      Eliminar
                    </button>
                    <button
                      className="btn btn-warning btn-sm buttons"
                      onClick={() => handleEdit(task.id)}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TaskList;