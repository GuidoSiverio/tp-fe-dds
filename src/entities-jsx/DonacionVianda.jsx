import React, { useEffect, useState, useContext } from "react";
import Sidebar from "./Sidebar";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

function DonacionVianda() {
  const { user, colaboradorContext, isColaboradorLinked, loading } =
    useContext(UserContext);
  const [vianda, setVianda] = useState({
    comida: "",
    fechaCaducidad: "",
    calorias: "",
    peso: "",
    colaboradorId: "",
    heladeraId: "",
  });
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);
  const localhost = "http://localhost:8080";
  const [heladeras, setHeladeras] = useState([]);
  const [showRecommendationsForm, setShowRecommendationsForm] = useState(false);
  const [recommendationsData, setRecommendationsData] = useState({
    longitud: "",
    latitud: "",
  });
  const [recommendedHeladeras, setRecommendedHeladeras] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      console.log("Usuario no encontrado, redirigiendo...");
      navigate("/");
    }
  }, [user, loading, navigate]);

  function getHeladeras() {
    return fetch(localhost + "/heladeras", {
      headers: { "Content-Type": "application/json" },
    }).then((response) => response.json());
  }

  useEffect(() => {
    getHeladeras().then((data) => {
      setHeladeras(data);
    });
  }, []);

  useEffect(() => {
    if (isColaboradorLinked && colaboradorContext?.id) {
      setVianda((prev) => ({ ...prev, colaboradorId: colaboradorContext.id }));
    }
  }, [isColaboradorLinked, colaboradorContext]);

  async function addVianda(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        localhost + "/contribuciones/donacion-vianda",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(vianda),
        }
      );

      if (response.ok) {
        setMessage("Donación registrada exitósamente.");
        setMessageType("success");
        // Limpiar los campos del formulario
        setVianda({
          comida: "",
          fechaCaducidad: "",
          calorias: "",
          peso: "",
          colaboradorId: colaboradorContext?.id || "",
          heladeraId: "",
        });
      } else {
        setMessage("Error al registrar la donación.");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Error durante la solicitud: " + error.message);
      setMessageType("error");
    }
  }

  const handleChange = (key, value) => {
    setVianda({
      ...vianda,
      [key]: value,
    });
  };

  const handleDateChange = (field, value) => {
    handleChange(field, value);
  };

  const handleRecommendationChange = (e) => {
    const { name, value } = e.target;
    setRecommendationsData({
      ...recommendationsData,
      [name]: value,
    });
  };

  async function handleRecommendationsSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        `${localhost}/contribuciones/donacion-vianda/recomendaciones?longitud=${recommendationsData.longitud}&latitud=${recommendationsData.latitud}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setRecommendedHeladeras(data);
        setMessage("Recomendaciones obtenidas exitósamente.");
        setMessageType("success");
      } else {
        setMessage("Error al obtener las recomendaciones.");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Error durante la solicitud: " + error.message);
      setMessageType("error");
    }
  }

  return (
    <div className="Vianda">
      <Sidebar />
      <h2 className="pb-2 animated-slideIn">Donacion de Vianda</h2>
      <div className="content-heladeras">
        
        
        {!isColaboradorLinked ? (
          <h1>Debes ser colaborador para realizar una donacion de vianda.</h1>
        ) : (
          <>
            <form className="needs-validation" noValidate onSubmit={addVianda}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="comida" className="form-label">
                    Comida
                  </label>
                  <input
                    type="text"
                    
                    id="comida"
                    placeholder="Comida"
                    required
                    value={vianda.comida}
                    onChange={(e) => handleChange("comida", e.target.value)}
                  />
                  <div className="invalid-feedback">
                    Nombre de la comida requerida.
                  </div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="date" className="form-label">
                    Fecha de caducidad
                  </label>
                  <input
                    type="date"
                    
                    id="date"
                    required
                    value={vianda.fechaCaducidad}
                    onChange={(e) =>
                      handleDateChange("fechaCaducidad", e.target.value)
                    }
                  />
                  <div className="invalid-feedback">
                    Fecha de caducidad requerida.
                  </div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="calorias" className="form-label">
                    Calorias
                  </label>
                  <div className="input-group has-validation">
                    <input
                      type="text"
                      
                      id="calorias"
                      placeholder="Calorias"
                      required
                      value={vianda.calorias}
                      onChange={(e) => handleChange("calorias", e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="peso" className="form-label">
                    Peso
                  </label>
                  <input
                    type="peso"
                    
                    id="peso"
                    placeholder="Peso"
                    required
                    value={vianda.peso}
                    onChange={(e) => handleChange("peso", e.target.value)}
                  />
                </div>

                {recommendedHeladeras.length === 0 && (
                  <div className="col-md-6">
                    <label htmlFor="heladera" className="form-label">
                      Heladera
                    </label>
                    <select
                      className="select-formulario"
                      id="heladera"
                      required
                      value={vianda.heladeraId}
                      onChange={(e) =>
                        handleChange("heladeraId", e.target.value)
                      }
                    >
                      <option value="">
                        {heladeras.filter((h) => h.activa).length === 0
                          ? "No hay heladeras disponibles"
                          : "Seleccione una heladera"}
                      </option>
                      {heladeras
                        .filter((h) => h.activa)
                        .map((heladera) => (
                          <option key={heladera.id} value={heladera.id}>
                            {heladera.nombre}
                          </option>
                        ))}
                    </select>
                    <div className="invalid-feedback">Heladera requerida.</div>
                  </div>
                )}

                {recommendedHeladeras.length > 0 && (
                  <div className="col-md-6">
                    <label htmlFor="recommendedHeladera" className="form-label">
                      Heladeras Recomendadas
                    </label>
                    <select
                      className="select-formulario"
                      id="recommendedHeladera"
                      onChange={(e) =>
                        handleChange("heladeraId", e.target.value)
                      }
                    >
                      <option value="">
                        Seleccione una heladera recomendada
                      </option>
                      {recommendedHeladeras.map((heladera) => (
                        <option key={heladera.id} value={heladera.id}>
                          {heladera.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <hr className="my-4" />

              <div className="d-flex justify-content-between">
                {/* Botón "Ver Recomendaciones" a la izquierda */}
                <button
                  className="w-45 btn btn-success btn-lg"
                  onClick={() => setShowRecommendationsForm(true)}
                  type="button"
                >
                  Ver Recomendaciones
                </button>

                {/* Botón "Registrar Donación" a la derecha */}
                <button className="w-45 btn btn-primary btn-lg" type="submit">
                  Guardar
                </button>
              </div>
            </form>

            {/* Formulario para obtener recomendaciones */}
            {showRecommendationsForm && (
              <form className="mt-4" onSubmit={handleRecommendationsSubmit}>
                <h3>Buscar Recomendaciones</h3>
                <div className="row g-3">
                  <div className="col-6">
                    <label htmlFor="longitud" className="form-label">
                      Longitud
                    </label>
                    <input
                      type="text"
                      
                      id="longitud"
                      name="longitud"
                      value={recommendationsData.longitud}
                      onChange={handleRecommendationChange}
                      required
                    />
                  </div>

                  <div className="col-6">
                    <label htmlFor="latitud" className="form-label">
                      Latitud
                    </label>
                    <input
                      type="text"
                      
                      id="latitud"
                      name="latitud"
                      value={recommendationsData.latitud}
                      onChange={handleRecommendationChange}
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-100 btn btn-success btn-lg mt-3"
                >
                  Obtener Recomendaciones
                </button>
              </form>
            )}
          </>
        )}
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

export default DonacionVianda;
