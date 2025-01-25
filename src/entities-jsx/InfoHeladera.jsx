import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { UserContext } from "./UserContext";

function InfoHeladera() {
  const { user } = useContext(UserContext);
  const [heladeras, setHeladeras] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [activeRow, setActiveRow] = useState(null); // Estado para fila activa
  const [descripcion, setDescripcion] = useState(""); // Estado para descripción
  const [foto, setFoto] = useState(""); // Estado para foto
  const localhost = "http://localhost:8080";
  const {
    collaborator: colaborador,
    isCollaboratorLinked: isColaboradorLinked,
  } = useContext(UserContext);

  // Función para obtener las heladeras
  const fetchHeladeras = () => {
    fetch(localhost + "/heladeras", {
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => setHeladeras(data))
      .catch((error) => console.error("Error fetching heladeras:", error));
  };

  // Función para suscribirse
  const handleSuscribirse = (heladeraId) => {
    fetch(
      `${localhost}/heladeras/${heladeraId}/suscribirse/${colaborador.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          alert("Te has suscrito correctamente a la heladera.");
          setRefreshFlag(!refreshFlag);
        } else {
          alert("Error al suscribirse. Por favor, intenta nuevamente.");
        }
      })
      .catch((error) => console.error("Error al suscribirse:", error));
  };

  // Función para reportar alerta
  const handleReportarAlerta = (heladeraId) => {
    if (!descripcion) {
      alert("Por favor, completa la descripción.");
      return;
    }
    fetch(`${localhost}/heladeras/${heladeraId}/incidentes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        descripcion,
        foto: foto || "",
        heladeraId,
        colaboradorId: colaborador.id,
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Alerta reportada correctamente.");
          setDescripcion(""); // Limpiar campos
          setFoto(""); // Limpiar campos
          setActiveRow(null); // Cerrar formulario
          setRefreshFlag(!refreshFlag);
        } else {
          alert("Error al reportar la alerta. Intenta nuevamente.");
        }
      })
      .catch((error) => console.error("Error al reportar la alerta:", error));
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

        {/* Tabla de heladeras */}
        <div className="table-responsive">
          <table className="table table-striped table-bordered text-center">
            <thead className="table-dark">
              <tr>
                <th>Nombre</th>
                <th>Dirección</th>
                <th>Capacidad</th>
                <th>Estado</th>
                <th>Acciones</th>
                <th>Reportar Incidente</th>
              </tr>
            </thead>
            <tbody>
              {heladeras.length > 0 ? (
                heladeras.map((heladera, index) => (
                  <>
                    {/* Fila principal */}
                    <tr key={index}>
                      <td>{heladera.nombre}</td>
                      <td>{heladera.direccion}</td>
                      <td>{heladera.capacidad}</td>
                      <td>{heladera.activa ? "Activa" : "Inactiva"}</td>
                      <td>
                        <button
                          className="btn btn-success"
                          onClick={() => handleSuscribirse(heladera.id)}
                          disabled={!heladera.activa}
                        >
                          Suscribirse
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() =>
                            setActiveRow(
                              activeRow === index ? null : index // Alternar fila activa
                            )
                          }
                          disabled={!heladera.activa}
                        >
                          {activeRow === index ? "Cerrar" : "Reportar"}
                        </button>
                      </td>
                    </tr>
                    {/* Fila dinámica para el formulario */}
                    {activeRow === index && (
                      <tr>
                        <td colSpan="6">
                          <div className="d-flex flex-column align-items-center">
                            <textarea
                              className="form-control my-2"
                              placeholder="Descripción del incidente"
                              value={descripcion}
                              onChange={(e) => setDescripcion(e.target.value)}
                            />
                            <input
                              type="text"
                              className="form-control my-2"
                              placeholder="URL de la foto (opcional)"
                              value={foto}
                              onChange={(e) => setFoto(e.target.value)}
                            />
                            <button
                              className="btn btn-primary"
                              onClick={() => handleReportarAlerta(heladera.id)}
                            >
                              Enviar
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No hay heladeras disponibles.</td>
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
