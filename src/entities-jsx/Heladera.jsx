import React, { useState, useContext, useEffect } from "react";
import Sidebar from "./Sidebar";
import MapComponent from "./MapComponent";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

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
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Datos recibidos del backend:", data); // Verifica los datos aquí
          setRecommendations(data);
        })
        .catch((error) =>
          console.error("Error al obtener recomendaciones:", error)
        ); // Actualiza el estado con las recomendaciones obtenidas
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
    <div
      className="Heladera d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <Sidebar />
      <div
        className="content text-center"
        style={{ width: "80%", padding: "20px" }}
      >
        <div
          id="map"
          style={{
            width: "100%",
            marginBottom: "30px",
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <MapComponent markers={markers} />
        </div>
        <h1 className="display-4 fw-normal mb-4 w-100">Heladera</h1>

        <form className="needs-validation" noValidate>
          <div className="row g-3">
            <div className="col-12">
              <label
                htmlFor="nombre"
                className="form-label d-flex justify-content-start"
              >
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                value={heladera.nombre}
                required
                onChange={(e) => handleChange("nombre", e.target.value)}
              />
            </div>

            <div className="col-12">
              <label
                htmlFor="longitud"
                className="form-label d-flex justify-content-start"
              >
                Longitud
              </label>
              <input
                type="text"
                className="form-control"
                id="longitud"
                value={heladera.longitud}
                required
                onChange={(e) => handleChange("longitud", e.target.value)}
              />
            </div>

            <div className="col-12">
              <label
                htmlFor="latitud"
                className="form-label d-flex justify-content-start"
              >
                Latitud
              </label>
              <input
                type="text"
                className="form-control"
                id="latitud"
                value={heladera.latitud}
                required
                onChange={(e) => handleChange("latitud", e.target.value)}
              />
            </div>

            {showRecommendations && (
              <>
                <div className="col-12">
                  <label
                    htmlFor="radio"
                    className="form-label d-flex justify-content-start"
                  >
                    Radio
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="radio"
                    style={{ boxShadow: "none" }}
                    required
                    onChange={(e) => handleChange("radio", e.target.value)}
                    onBlur={fetchRecommendations} // Llama al backend al salir del campo
                  />
                  <div className="invalid-feedback">Radio requerido.</div>
                </div>

                <div className="col-12">
                  <label
                    htmlFor="lugarRecomendado"
                    className="form-label d-flex justify-content-start"
                  >
                    Lugar Recomendado
                  </label>
                  <select
                    className="form-control"
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
                    <option value="">Selecciona un lugar</option>
                    {recommendations.map((recomendacion) => (
                      <option
                        key={recomendacion.id}
                        value={recomendacion.nombre}
                      >
                        {recomendacion.nombre}
                      </option>
                    ))}
                  </select>

                  <div className="invalid-feedback">
                    Por favor selecciona un lugar recomendado.
                  </div>
                </div>
              </>
            )}

            <div className="col-12">
              <label
                htmlFor="direccion"
                className="form-label d-flex justify-content-start"
              >
                Dirección
              </label>
              <input
                type="text"
                className="form-control"
                id="direccion"
                value={heladera.direccion}
                required
                onChange={(e) => handleChange("direccion", e.target.value)}
              />
            </div>

            <div className="col-12">
              <label
                htmlFor="capacidad"
                className="form-label d-flex justify-content-start"
              >
                Capacidad
              </label>
              <input
                type="text"
                className="form-control"
                id="capacidad"
                required
                onChange={(e) => handleChange("capacidad", e.target.value)}
              />
            </div>

            <div className="col-12">
              <label
                htmlFor="tempMinAceptable"
                className="form-label d-flex justify-content-start"
              >
                Temperatura Mínima Aceptable
              </label>
              <input
                type="text"
                className="form-control"
                id="tempMinAceptable"
                required
                onChange={(e) =>
                  handleChange("tempMinAceptable", e.target.value)
                }
              />
            </div>

            <div className="col-12">
              <label
                htmlFor="tempMaxAceptable"
                className="form-label d-flex justify-content-start"
              >
                Temperatura Máxima Aceptable
              </label>
              <input
                type="text"
                className="form-control"
                id="tempMaxAceptable"
                required
                onChange={(e) =>
                  handleChange("tempMaxAceptable", e.target.value)
                }
              />
            </div>
          </div>

          <hr className="my-4" />

          <div className="d-flex justify-content-between">
            <button
              className="btn btn-secondary btn-lg"
              type="button"
              onClick={() => setShowRecommendations(!showRecommendations)}
              style={{
                backgroundColor: "#6c757d",
                border: "none",
              }}
            >
              Ver Recomendaciones
            </button>
            <button
              className="btn btn-primary btn-lg"
              type="submit"
              onClick={addHeladera}
              style={{
                backgroundColor: "#2f4f4f",
                border: "none",
              }}
            >
              Save
            </button>
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
      </div>
    </div>
  );
}

export default Heladera;
