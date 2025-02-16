import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { UserContext } from "./UserContext";
import "../entities-css/InfoHeladera.css";

function InfoHeladera() {
  const { user } = useContext(UserContext);
  const [heladeras, setHeladeras] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [activeRow, setActiveRow] = useState(null); // Estado para fila activa
  const [descripcion, setDescripcion] = useState(""); // Estado para descripción
  const [foto, setFoto] = useState(""); // Estado para foto
  const [suscripciones, setSuscripciones] = useState([]); // Estado para suscripciones
  const localhost = "http://localhost:8080";
  const { colaboradorContext, isColaboradorLinked } = useContext(UserContext);

  async function getSuscripciones() {
    try {
      const response = await fetch(
        `${localhost}/suscripciones/${colaboradorContext.id}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("Error en la petición");
      }
      const data = await response.json();
      setSuscripciones(data);
    } catch (error) {
      console.error("Error al obtener las suscripciones:", error);
    }
  }

  useEffect(() => {
    getSuscripciones();
  }, []);

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
    if (suscripciones.includes(heladeraId)) {
      alert("Ya estás suscrito a esta heladera.");
      return;
    }

    fetch(
      `${localhost}/heladeras/${heladeraId}/suscribirse/${colaboradorContext.id}`,
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
          setSuscripciones([...suscripciones, heladeraId]);
          setRefreshFlag(!refreshFlag);
        } else {
          alert("Error al suscribirse. Por favor, intenta nuevamente.");
        }
      })
      .catch((error) => console.error("Error al suscribirse:", error));
  };

  // Función para desuscribirse
  const handleDesuscribirse = (heladeraId) => {
    fetch(
      `${localhost}/heladeras/${heladeraId}/desuscribirse/${colaboradorContext.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          alert("Te has desuscrito correctamente de la heladera.");
          setSuscripciones(suscripciones.filter((id) => id !== heladeraId));
          setRefreshFlag(!refreshFlag);
        } else {
          alert("Error al desuscribirse. Por favor, intenta nuevamente.");
        }
      })
      .catch((error) => console.error("Error al desuscribirse:", error));
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
        colaboradorId: colaboradorContext.id,
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
        <h2 className="pb-2">Información de Heladeras</h2>

        {/* Tabla de heladeras */}
        <div className="table-responsive">
          <table className="table table-striped table-bordered text-center ">
            <thead className="table-dark align-middle ">
              <tr>
                <th>Nombre</th>
                <th>Dirección</th>
                <th>Capacidad</th>
                <th>Estado</th>
                <th>Acciones</th>
                <th>Reportar Incidente</th>
              </tr>
            </thead>
            <tbody class="text-center">
              {heladeras.length > 0 ? (
                heladeras.map((heladera, index) => (
                  <>
                    {/* Fila principal */}
                    <tr key={index}>
                      <td class="py-3">{heladera.nombre}</td>
                      <td class="py-3">{heladera.direccion}</td>
                      <td class="py-3">{heladera.capacidad}</td>
                      <td class="py-3">{heladera.activa ? "Activa" : "Inactiva"}</td>
                      <td >
                        {suscripciones.includes(heladera.id) ? (
                          <button
                            className="btn-warning"
                            onClick={() => handleDesuscribirse(heladera.id)}
                          >
                            Desuscribirse
                          </button>
                        ) : (
                          <button
                            className="btn-suscribirse"
                            onClick={() => handleSuscribirse(heladera.id)}
                          >
                            Suscribirse
                          </button>
                        )}
                      </td>
                      <td>
                        <button
                          className="btn-reportar"
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
                      <tr className={`slide-row ${activeRow === index ? "show" : ""}`}>
                        <td colSpan="6">
                          <div className="d-flex flex-column align-items-center">
                        
                          <textarea
                            className="textarea-2 my-2"
                            style={{
                              borderRadius: "10px",
                              padding: "10px",
                              border: "1px solid #ccc",
                              backgroundColor: "#f8f9fa",
                              transition: "border-color 0.3s ease-in-out",
                            }}
                            placeholder="Descripción del incidente"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            rows={4}
                          />
                          <input
                            type="text"
                            className="input-2 my-2"
                            style={{
                              borderRadius: "10px",
                              padding: "10px",
                              border: "1px solid #ccc",
                              backgroundColor: "#f8f9fa",
                              transition: "border-color 0.3s ease-in-out",

                            }}
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
