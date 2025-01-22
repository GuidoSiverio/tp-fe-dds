import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "../entities-css/Home.css";
import { UserContext } from "./UserContext";

function InfoHeladera() {
  const { user } = useContext(UserContext);
  const [heladeras, setHeladeras] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false); // Nuevo estado para controlar la actualización
  const localhost = "http://localhost:8080";

  // Función para obtener las heladeras
  const fetchHeladeras = () => {
    fetch(localhost + "/heladeras", {
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => setHeladeras(data))
      .catch((error) => console.error("Error fetching heladeras:", error));
  };

  // Cargar las heladeras al montar el componente y cada vez que cambie el flag
  useEffect(() => {
    fetchHeladeras();
  }, [refreshFlag]);

  // Control para redirigir si el usuario no ha iniciado sesión
  if (!user) {
    return <p>Por favor, inicia sesión.</p>;
  }

  return (
    <div className="infoHeladera">
      <Sidebar />
      <div className="content">
        <h1 className="display-4 fw-normal">Información de Heladeras</h1>

        {/* Botones de acción */}
        <div className="d-flex justify-content-between my-3">
          <button className="btn btn-warning">Ver alerta</button>
          <button className="btn btn-danger">Reportar incidente</button>
        </div>

        {/* Tabla de heladeras */}
        <div className="table-responsive">
          <table className="table table-striped table-bordered text-center">
            <thead className="table-dark">
              <tr>
                <th>Nombre</th>
                <th>Dirección</th>
                <th>Capacidad</th>
                <th>Fecha de funcionamiento</th>
                <th>Acciones</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {heladeras.length > 0 ? (
                heladeras.map((heladera, index) => (
                  <tr key={index}>
                    <td>{heladera.nombre}</td>
                    <td>{heladera.direccion}</td>
                    <td>{heladera.capacidad}</td>
                    <td>{heladera.fechaFuncionamiento}</td>
                    <td>
                      <button className="btn btn-success">
                        Suscribirse
                      </button>
                    </td>
                    <td>
                      ""
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No hay heladeras disponibles.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default InfoHeladera;



