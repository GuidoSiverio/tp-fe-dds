import React, { useState, useEffect, useContext } from "react";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

function Visita() {
  const [visita, setVisita] = useState({
    heladeraId: "",
    tecnicoId: "",
    incidenteId: "",
    comentario: "",
    imagen: "",
    solucionado: false,
  });
  const { user, tecnicoContext, isTecnicoLinked, loading } =
    useContext(UserContext);

  const [heladeras, setHeladeras] = useState([]);
  const [incidentes, setIncidentes] = useState([]);

  const navigate = useNavigate();
  const localhost = "http://localhost:8080";

  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  // Obtener heladeras desde el backend
  useEffect(() => {
    if (loading) return;
    if (!user) {
      console.log("Usuario no encontrado, redirigiendo...");
      navigate("/");
    }
    async function fetchHeladeras() {
      try {
        const response = await fetch(localhost + "/heladeras", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setHeladeras(data);
      } catch (error) {
        console.error("Error al obtener heladeras:", error);
        alert("Error al cargar las heladeras.");
      }
    }

    fetchHeladeras();
  }, [user, loading, navigate]);

  useEffect(() => {
    if (visita.heladeraId) {
      async function fetchIncidentes() {
        try {
          const response = await fetch(
            `${localhost}/heladeras/${visita.heladeraId}/incidentes`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            setIncidentes(data);
          } else {
            console.error("Error al cargar la lista de incidentes");
          }
        } catch (error) {
          console.error("Error durante la carga de incidentes:", error);
        }
      }

      fetchIncidentes();
    } else {
      setIncidentes([]);
    }
  }, [visita.heladeraId]);

  async function addVisita() {
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("heladeraId", visita.heladeraId);
    formData.append("tecnicoId", tecnicoContext.id);
    formData.append("incidenteId", visita.incidenteId);
    formData.append("comentario", visita.comentario);
    formData.append("solucionado", visita.solucionado);
    formData.append("imagen", visita.imagen);
    try {
      const response = await fetch(localhost + "/tecnicos/visitas", {
        method: "POST",

        body: formData,
      });

      if (response.ok) {
        setMessage("Visita registrada exitosamente.");
        setMessageType("success");
        setVisita({
          heladeraId: "",
          incidenteId: "",
          comentario: "",
          solucionado: false,
        });
      } else {
        setMessage("Error al registrar la visita.");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Error durante la solicitud: " + error.message);
      setMessageType("error");
    }
  }

  useEffect(() => {
    if (isTecnicoLinked && tecnicoContext?.id) {
      setVisita((prev) => ({
        ...prev,
        tecnicoId: tecnicoContext.id,
      }));
    }
  }, [isTecnicoLinked, tecnicoContext]);

  function validateForm() {
    if (!visita.heladeraId || !visita.solucionado || !visita.comentario) {
      alert("Por favor completa todos los campos obligatorios.");
      return false;
    }
    return true;
  }

  const handleChange = (field, value) => {
    setVisita({ ...visita, [field]: value });
  };

  const handleCheckboxChange = () => {
    setVisita({ ...visita, solucionado: !visita.solucionado });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setVisita({
      ...visita,
      imagen: file, // Guarda el archivo en lugar de un blob
    });
  };

  return (
    <div className="RegistrarVisita">
      <Sidebar />
      <div className="content">
        <h1 className="display-4 fw-normal">Registrar Visita</h1>
        <br />
        <form className="needs-validation" noValidate>
          <div className="row g-3">
            {/* Selección de heladeras desde el backend */}
            <div className="col-12">
              <label htmlFor="heladeraId" className="form-label">
                Heladera
              </label>
              <select
                className="form-control"
                id="heladeraId"
                value={visita.heladeraId}
                onChange={(e) => handleChange("heladeraId", e.target.value)}
              >
                <option value="">Seleccione una heladera</option>
                {heladeras.map((heladera) => (
                  <option key={heladera.id} value={heladera.id}>
                    {heladera.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Selección de incidentes vinculados a la heladera seleccionada */}
            <div className="col-12">
              <label htmlFor="incidenteId" className="form-label">
                Incidente
              </label>
              <select
                className="form-control"
                id="incidenteId"
                value={visita.incidenteId}
                onChange={(e) => handleChange("incidenteId", e.target.value)}
              >
                <option value="">Seleccione un incidente</option>
                {incidentes.map((inc) => (
                  <option key={inc.id} value={inc.id}>
                    {inc.descripcion
                      ? `Falla Tecnica - ${inc.descripcion}`
                      : `Alerta - ${inc.tipoAlerta}`}
                  </option>
                ))}
              </select>
            </div>

            {/* Comentario */}
            <div className="col-12">
              <label htmlFor="comentario" className="form-label">
                Comentario
              </label>
              <textarea
                className="form-control"
                id="comentario"
                placeholder="Describe el trabajo realizado"
                required
                value={visita.comentario}
                onChange={(e) => handleChange("comentario", e.target.value)}
              />
            </div>

            {/* Carga de imágenes*/}
            <div className="col-12">
              <label htmlFor="imagen" className="form-label">
                Subir Imagen
              </label>
              <input
                type="file"
                className="form-control"
                id="imagen"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>

            {/* Checkbox de solucionado */}
            <div className="col-12 d-flex justify-content-center">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input custom-checkbox"
                  id="solucionado"
                  checked={visita.solucionado}
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label ms-2" htmlFor="solucionado">
                  ¿Solucionado?
                </label>
              </div>
            </div>
          </div>
          <hr className="my-4" />
          <button
            className="w-100 btn btn-primary btn-lg"
            type="button"
            onClick={addVisita}
          >
            Guardar
          </button>
        </form>
        {message && (
          <div
            className={`alert ${
              messageType === "success" ? "alert-success" : "alert-danger"
            } mt-4`}
            style={{ fontSize: "1.2rem" }}
          >
            {message}
          </div>
        )}
      </div>

      <style>
        {`
          .custom-checkbox {
            transform: scale(1.5); 
            margin-right: 10px; 
          }
        `}
      </style>
    </div>
  );
}

export default Visita;
