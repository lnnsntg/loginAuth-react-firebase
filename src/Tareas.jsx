import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import moment from "moment";
import "moment/locale/es";

const Tareas = (props) => {
  const [tareas, setTareas] = useState([]);
  const [tarea, setTarea] = useState("");
  const [modoEdicion, setModoEdicion] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const data = await db
          .collection(props.user.uid)
          .limit(10)
          .orderBy("fecha")
          .get();
        const arrayData = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTareas(arrayData);
      } catch (error) {
        console.log(error);
      }
    };

    obtenerDatos();
  }, [props.user.uid]);

  const agregar = async (e) => {
    e.preventDefault();

    if (!tarea.trim()) {
      console.log("Esta vacío");
      return;
    }

    try {
      const nuevaTarea = {
        name: tarea,
        fecha: Date.now(),
      };
      const data = await db.collection(props.user.uid).add(nuevaTarea);
      setTareas([...tareas, { ...nuevaTarea, id: data.id }]);
      setTarea("");
    } catch (error) {
      console.log(error);
    }

    console.log(tarea);
  };

  const eliminar = async (id) => {
    try {
      db.collection(props.user.uid).doc(id).delete();
      const arrayFiltrado = tareas.filter((item) => item.id !== id);
      setTareas(arrayFiltrado);
    } catch (error) {
      console.log(error);
    }
  };

  const activarEdicion = (item) => {
    setModoEdicion(true);
    setTarea(item.name);
    setId(item.id);
  };

  const editar = async (e) => {
    e.preventDefault();
    if (!tarea.trim()) {
      console.log("log editar: campo vacio");
      return;
    }

    try {
      await db.collection(props.user.uid).doc(id).update({
        name: tarea,
      });
      const arrayEditado = tareas.map((item) =>
        item.id === id ? { id: item.id, fecha: item.fecha, name: tarea } : item
      );
      setTareas(arrayEditado);
      setModoEdicion(false);
      setTarea("");
      setId("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <h3>{modoEdicion ? "Editar" : "Agregar una nueva tarea"}</h3>
        <form onSubmit={modoEdicion ? editar : agregar}>
          <input
            type="text"
            placeholder="Ingrese una tarea"
            className="form-control mb-2"
            onChange={(e) => setTarea(e.target.value)}
            value={tarea}
          />

          <div className="d-grid gap-2">
            <button
              className={modoEdicion ? "btn btn-primary" : "btn btn-success"}
            >
              {modoEdicion ? "Editar" : "Agregar"}
            </button>
          </div>
        </form>

        <h3 className="mt-3">Lista de Tareas</h3>

        <div className="col-12 mt-3">
          <ul className="list-group">
            {tareas.map((item) => (
              <li className="list-group-item px-2" key={item.id}>
                {item.name} - {moment(item.fecha).format("lll")}
                <div>
                  <button
                    className="btn btn-danger btn-sm float-end ms-1 "
                    onClick={() => eliminar(item.id)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="btn btn-warning btn-sm  float-end"
                    onClick={() => activarEdicion(item)}
                  >
                    Editar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Tareas;
