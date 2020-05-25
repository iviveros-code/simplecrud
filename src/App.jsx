import React, { useState } from "react";
import shortid from "shortid";

function App() {
  const [tarea, setTarea] = useState("");
  const [tareas, setTareas] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [id, setId] = useState("");
  const [error, setError] = useState(null);

  const agregarTarea = (e) => {
    e.preventDefault();
    if (!tarea.trim()) {
      setError("Campo vacío, por favor escribir algo..");
      return;
    }
    console.log(tarea);

    setTareas([...tareas, { id: shortid.generate(), nombreTarea: tarea }]);
    setTarea("");
    setError(null);
  };

  const eliminarTarea = (id) => {
    const arrayFiltrado = tareas.filter((item) => item.id !== id);
    setTareas(arrayFiltrado);
  };

  const editar = (item) => {
    setModoEdicion(true);
    setTarea(item.nombreTarea);
    setId(item.id);
  };
  const editarTarea = (e) => {
    e.preventDefault();
    if (!tarea.trim()) {
      setError("Campo vacío, por favor escribir algo..");
      return;
    }
    const arrayEditado = tareas.map((item) =>
      item.id === id ? { id: id, nombreTarea: tarea } : item
    );
    setTareas(arrayEditado);
    setModoEdicion(false);
    setTarea("");
    setId("");
    setError(null);
  };

  return (
    <div className="container mt-5" style={{ background: "#222831" }}>
      <h1
        className="text-center"
        style={{ fontFamily: "Rock Salt", color: "#fff", paddingTop: 20 }}
      >
        To do list ...
      </h1>
      <hr />
      <div className="row">
        <div className="col-8 ">
          <h4
            className="text-center "
            style={{ fontFamily: "Rock Salt", color: "#fff" }}
          >
            lista de tareas
          </h4>
          <ul className="list-group" style={{ marginBottom: 20 }}>
            {tareas.length === 0 ? (
              <li className="list-group-item">
                Por ahora sin pendientes ...🤔
              </li>
            ) : (
              tareas.map((item) => (
                <li
                  className="list-group-item"
                  style={{ marginBottom: 5 }}
                  key={item.id}
                >
                  <span className="lead">{item.nombreTarea}</span>
                  <button
                    className="btn btn-danger btn-sm float-right mx-2"
                    onClick={() => eliminarTarea(item.id)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="btn btn-warning btn-sm float-right"
                    onClick={() => editar(item)}
                  >
                    Editar
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="col-4">
          <h4
            className="text-center"
            style={{ fontFamily: "Rock Salt", color: "#fff" }}
          >
            {modoEdicion ? "Editar Tarea" : "Agregar Tarea"}
          </h4>
          <form onSubmit={modoEdicion ? editarTarea : agregarTarea}>
            {error ? <span className="text-danger">{error}</span> : null}
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingresar Tarea"
              onChange={(e) => setTarea(e.target.value)}
              value={tarea}
            />
            {modoEdicion ? (
              <button className="btn btn-warning btn-block" type="submit">
                Editar
              </button>
            ) : (
              <button
                className="btn btn-dark btn-block"
                type="submit"
                style={{ borderColor: "#fff", marginBottom: 15 }}
              >
                Agregar
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
