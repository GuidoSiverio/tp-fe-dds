import React, { useState, useContext, useEffect } from "react";
import Sidebar from "./Sidebar";
import MapComponent from "./MapComponent";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import "../entities-css/Heladera.css";

function Heladera() {
  const [heladera, setHeladera] = useState({
    nombre: "",
    longitud: "",
    latitud: "",
    direccion: "",
    capacidad: "",
    radio: "",
    lugarRecomendado: "",
    tempMinAceptable: "",
    tempMaxAceptable: "",
    colaboradorId: "",
  });
  const [showRecommendations, setShowRecommendations] = useState(false); // Estado para manejar las recomendaciones
  const [heladeras, setHeladeras] = useState([]);
  const [markers, setMarkers] = useState([]);
  const localhost = "http://localhost:8080";
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState([]);
  const { user, colaboradorContext, isColaboradorLinked, loading } =
    useContext(UserContext);

  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      console.log("Usuario no encontrado, redirigiendo...");
      navigate("/");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (isColaboradorLinked && colaboradorContext?.id) {
      setHeladera((prev) => ({
        ...prev,
        colaboradorId: colaboradorContext.id,
      }));
    }
  }, [isColaboradorLinked, colaboradorContext]);

  useEffect(() => {
    getHeladeras().then((data) => {
      setHeladeras(data);
    });
  }, []);

  useEffect(() => {
    if (heladeras.length > 0) {
      const newMarkers = heladeras.map((heladera) => ({
        position: [parseFloat(heladera.latitud), parseFloat(heladera.longitud)],
        popupText: heladera.nombre,
      }));
      setMarkers(newMarkers);
    }
  }, [heladeras]);

  const handleChange = (key, value) => {
    setHeladera({
      ...heladera,
      [key]: value,
    });
  };

  const fetchRecommendations = async () => {
    if (!heladera.latitud || !heladera.longitud || !heladera.radio) {
      alert("Por favor completa latitud, longitud y radio.");
      return;
    }

    try {
      const response = await fetch(localhost + "/heladeras/recomendaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          latitud: parseFloat(heladera.latitud),
          longitud: parseFloat(heladera.longitud),
          radio: parseFloat(heladera.radio),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Datos recibidos del backend:", data); // Verifica los datos aquí
        setRecommendations(data);
      } else {
        console.error("Error al obtener recomendaciones:", response.statusText);
      }
    } catch (error) {
      console.error("Error al obtener recomendaciones:", error);
      alert("Ocurrió un error al intentar obtener las recomendaciones.");
    }
  };

  if (!user) {
    return <p>Por favor, inicia sesión.</p>;
  }

  function getHeladeras() {
    return fetch(localhost + "/heladeras", {
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Error en la petición");
      }
      return response.json();
    });
  }

  const getSubstringBeforeFirstComma = (str) => {
    const index = str.indexOf(",");
    return index === -1 ? str : str.substring(0, index);
  };

  const getSubstringAfterFirstComma = (str) => {
    const index = str.indexOf(",");
    if (index === -1) {
      return "";
    }
    return str.substring(index + 1).trim();
  };

  async function addHeladera(event) {
    event.preventDefault();
    try {
      const response = await fetch(localhost + "/heladeras", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(heladera),
      });

      if (response.ok) {
        setMessage("Heladera registrada exitósamente.");
        setMessageType("success");
      } else {
        setMessage("Error al registrar la heladera.");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Error durante la solicitud: " + error.message);
      setMessageType("error");
    }
  }

  return (
    <div className="Heladera-alta">
      <Sidebar />

      <h2 className="pb-2 animated-slideIn">Alta heladeras</h2>

      <div className="content-heladera">
        <form className="needs-validation" noValidate>
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                value={heladera.nombre}
                onChange={(e) => handleChange("nombre", e.target.value)}
                required
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="longitud">Longitud</label>
              <input
                type="text"
                id="longitud"
                value={heladera.longitud}
                onChange={(e) => handleChange("longitud", e.target.value)}
                required
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="latitud">Latitud</label>
              <input
                type="text"
                id="latitud"
                value={heladera.latitud}
                onChange={(e) => handleChange("latitud", e.target.value)}
                required
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="direccion">Dirección</label>
              <input
                type="text"
                id="direccion"
                value={heladera.direccion}
                onChange={(e) => handleChange("direccion", e.target.value)}
                required
              />
            </div>

            {showRecommendations && (
              <>
                <div className="col-md-6">
                  <label htmlFor="radio">Radio</label>
                  <input
                    type="number"
                    id="radio"
                    value={heladera.radio}
                    onChange={(e) => handleChange("radio", e.target.value)}
                    required
                    onBlur={fetchRecommendations}
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="lugarRecomendado">Lugar Recomendado</label>
                  <select
                    className="select-formulario"
                    onChange={(e) => {
                      const selectedNombre = e.target.value;
                      const selectedRecomendacion = recommendations.find(
                        (recomendacion) =>
                          recomendacion.nombre === selectedNombre
                      );

                      if (selectedRecomendacion) {
                        setHeladera((prevHeladera) => ({
                          ...prevHeladera,
                          lugarRecomendado: selectedRecomendacion.nombre,
                          nombre: getSubstringBeforeFirstComma(
                            selectedRecomendacion.nombre
                          ),
                          latitud: selectedRecomendacion.latitud,
                          longitud: selectedRecomendacion.longitud,
                          direccion: getSubstringAfterFirstComma(
                            selectedRecomendacion.nombre
                          ),
                        }));
                      }
                    }}
                  >
                    <option value="">
                      {recommendations.length === 0
                        ? "No hay heladeras disponibles"
                        : "Selecciona un lugar"}
                    </option>
                    {recommendations.map((recomendacion) => (
                      <option
                        key={recomendacion.id}
                        value={recomendacion.nombre}
                      >
                        {recomendacion.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            

            <div className="col-md-12">
              <label htmlFor="capacidad">Capacidad</label>
              <input
                type="number"
                id="capacidad"
                value={heladera.capacidad}
                onChange={(e) => handleChange("capacidad", e.target.value)}
                required
              />
            </div>

            <div className="col-md-6">
              <label
                htmlFor="tempMinAceptable"
                className="form-label d-flex justify-content-start"
              >
                Temperatura Mínima Aceptable
              </label>
              <input
                type="text"
                id="tempMinAceptable"
                value={heladera.tempMinAceptable}
                required
                onChange={(e) =>
                  handleChange("tempMinAceptable", e.target.value)
                }
              />
            </div>

            <div className="col-md-6">
              <label
                htmlFor="tempMaxAceptable"
                className="form-label d-flex justify-content-start"
              >
                Temperatura Máxima Aceptable
              </label>
              <input
                type="text"
                id="tempMaxAceptable"
                required
                value={heladera.tempMaxAceptable}
                onChange={(e) =>
                  handleChange("tempMaxAceptable", e.target.value)
                }
              />
            </div>
          </div>

          <hr className="my-4" />
          <div className="col-12">
          <div className="col-6">
              <button
              className="button-recomendaciones col-md-12"
              type="button"
              onClick={() => setShowRecommendations(!showRecommendations)}
              >
              Ver Recomendaciones
              </button>
            </div>
              <div className="col-md-6">
              <button
                type="button"
                className="button-save col-md-12"
                onClick={addHeladera} 
                disabled={!heladera.nombre || !heladera.latitud || !heladera.longitud}
              >
                Guardar
              </button>

            </div>
            </div>
        </form>
        {message && (
          <div
            className={`alert ${
              messageType === "success" ? "alert-success" : "alert-danger"
            } mt-4`}
          >
            {message}
          </div>
        )}
        <MapComponent markers={markers} />
      </div>
    </div>
  );
}

export default Heladera;
