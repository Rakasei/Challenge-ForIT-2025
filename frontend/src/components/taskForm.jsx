import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [priority, setPriority] = useState("Media");
  const [expiration, setExpiration] = useState("")
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();



  useEffect(() => {
    fetch(`${API_URL}/api/tasks`)
      .then((res) => res.json())
      .then((data) => {
        const task = data.tasks.find((t) => t.id === parseInt(id));
        if (task) {
          setTitle(task.title);
          setDescription(task.description);
          setCompleted(task.completed);
          setExpiration(task.expiration);
          setPriority(task.priority);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener las tareas:", err);
        setLoading(false);
      });
  }, [id]);


  
  const handleSubmit = (e) => {
    e.preventDefault();
    const method = id ? "PUT" : "POST";
    const url = id ? `${API_URL}/api/tasks/${id}` : `${API_URL}/api/tasks`;

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, completed,  expiration: new Date(expiration).toISOString(), priority}),
    })
      .then(() => navigate("/"))
      .catch((err) => console.error(err));
  };

  if (loading) return <p>Cargando tarea...</p>;


     

  return (
    
    <div className="card text-center">

      <div className="card-body">

        <h5 className="card-title">{id ? "Editá tu tarea" : "Creá una nueva tarea"}</h5>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
          <label htmlFor="">Título</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título"
              required
            />
          </div>

          <div className="mb-3">
          <label htmlFor="">Descripción</label>
            <textarea
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción"
            ></textarea>
          </div>

          <div className="mb-3">
            <label>Vencimiento</label>
            <input
              type="datetime-local"
              className="form-control"
              value={expiration}
              onChange={(e) => setExpiration(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Prioridad</label>
            <select
              className="form-control"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              required
            >
              <option value="Baja">Baja</option>
              <option value="Media">Media</option>
              <option value="Alta">Alta</option>
            </select>
          </div>

          <div className="containerInputForm">

          <label className="form-check-label" htmlFor="completedCheck">
              Tarea realizada
            </label>

            <input
              type="checkbox"
              className="form-check-input"
              id="completedCheck"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />

           
          </div>

          <button type="button" className="btn btn-secondary me-2" onClick={() => navigate(-1)}>
            Volver
          </button>

          <button type="submit" className="btn btn-primary">Guardar</button>

        </form>

      </div>


    </div>
  );
};

export default TaskForm;
