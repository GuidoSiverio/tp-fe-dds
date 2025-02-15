import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

function InfoHeladera() {
  const [heladeras, setHeladeras] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [activeRow, setActiveRow] = useState(null); // Estado para fila activa
  const [descripcion, setDescripcion] = useState(""); // Estado para descripción
  const [foto, setFoto] = useState(""); // Estado para foto
  const [suscripciones, setSuscripciones] = useState([]); // Estado para suscripciones
  const localhost = "http://localhost:8080";
  const { user, colaboradorContext, isColaboradorLinked, loading } =
    useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      console.log("Usuario no encontrado, redirigiendo...");
      navigate("/");
    }
  }, [user, loading, navigate]);

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

    const formData = new FormData();
    formData.append("descripcion", descripcion);
    formData.append("colaboradorId", colaboradorContext.id);
    formData.append("imagen", foto);

    fetch(`${localhost}/heladeras/${heladeraId}/incidentes`, {
      method: "POST",
      body: formData,
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

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setFoto(file);
  };

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
                        {suscripciones.includes(heladera.id) ? (
                          <button
                            className="btn btn-warning"
                            onClick={() => handleDesuscribirse(heladera.id)}
                          >
                            Desuscribirse
                          </button>
                        ) : (
                          <button
                            className="btn btn-success"
                            onClick={() => handleSuscribirse(heladera.id)}
                          >
                            Suscribirse
                          </button>
                        )}
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
                              type="file"
                              className="form-control"
                              id="imagen"
                              accept="image/*"
                              onChange={handleImageUpload}
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
