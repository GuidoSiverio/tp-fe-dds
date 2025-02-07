import React, { useState, useEffect, useContext } from "react";
import Sidebar from "./Sidebar";
import { UserContext } from "./UserContext";

function DistribucionVianda() {
  const {
    collaborator: colaborador,
    isCollaboratorLinked: isColaboradorLinked,
  } = useContext(UserContext);
  const [distribucion, setDistribucion] = useState({
    heladeraOrigen: "",
    heladeraDestino: "",
    cantidadViandas: "",
    motivoDistribucion: "",
    fechaDistribucion: "",
    colaboradorId: "",
  });
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const [heladeras, setHeladeras] = useState([]); // Para almacenar las heladeras disponibles
  const [showRecommendationsForm, setShowRecommendationsForm] = useState(false);
  const [recommendationsData, setRecommendationsData] = useState({
    longitud: "",
    latitud: "",
    radio: "",
  });
  const localhost = "http://localhost:8080";

  // Obtener las heladeras disponibles desde el backend
  async function getHeladeras() {
    try {
      const response = await fetch(localhost + "/heladeras", {
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setHeladeras(data); // Asumimos que la respuesta es un array de heladeras
    } catch (error) {
      console.error("Error al obtener las heladeras:", error);
    }
  }

  // Función para agregar la distribución de vianda al backend
  async function addDistribucion(e) {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    try {
      const response = await fetch(localhost + "/contribuciones/distribucion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(distribucion),
      });

      if (response.ok) {
        setMessage("Distribución registrada exitósamente.");
        setMessageType("success");
      } else {
        setMessage("Error al registrar la distribución.");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Error durante la solicitud: " + error.message);
      setMessageType("error");
    }
  }

  // Función para manejar los cambios en los campos
  const handleChange = (field, value) => {
    setDistribucion({
      ...distribucion,
      [field]: value,
    });
  };

  const handleDateChange = (field, value) => {
    const formattedDate = new Date(value).toISOString().slice(0, -1);
    handleChange(field, formattedDate);
  };

  // Obtener las heladeras disponibles cuando el componente se monta
  useEffect(() => {
    getHeladeras();
  }, []);

  useEffect(() => {
    if (colaborador?.id) {
      setDistribucion((prev) => ({ ...prev, colaboradorId: colaborador.id }));
    }
  }, [colaborador]);

  // Manejo del cambio en los datos para recomendaciones
  const handleRecommendationChange = (e) => {
    const { name, value } = e.target;
    setRecommendationsData({
      ...recommendationsData,
      [name]: value,
    });
  };

  const handleRecommendationsSubmit = (e) => {
    e.preventDefault();
    console.log("Obteniendo recomendaciones para: ", recommendationsData);
    // Aquí iría la lógica para hacer la consulta a la API de recomendaciones
  };

  return (
    <div className="DistribucionVianda">
      <Sidebar />
      <div className="content">
        <h1 className="display-4 fw-normal">
          Registrar Distribución de Vianda
        </h1>
        <br />
        {!isColaboradorLinked ? (
          <h1>
            Debes ser colaborador para realizar una distribución de viandas o
            para obtener recomendaciones.
          </h1>
        ) : (
          <>
            {/* Formulario para registrar distribución de vianda */}
            <form
              className="needs-validation"
              noValidate
              onSubmit={addDistribucion}
            >
              <div className="row g-3">
                <div className="col-12">
                  <label htmlFor="heladeraOrigen" className="form-label">
                    Heladera de Origen
                  </label>
                  <select
                    className="form-select"
                    id="heladeraOrigen"
                    required
                    onChange={(e) =>
                      handleChange("heladeraOrigen", e.target.value)
                    }
                  >
                    <option value="">Seleccionar...</option>
                    {heladeras.map((heladera) => (
                      <option key={heladera.id} value={heladera.id}>
                        {heladera.nombre} - {heladera.ubicacion}
                      </option>
                    ))}
                  </select>
                  <div className="invalid-feedback">
                    Heladera de origen requerida.
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="heladeraDestino" className="form-label">
                    Heladera de Destino
                  </label>
                  <select
                    className="form-select"
                    id="heladeraDestino"
                    required
                    onChange={(e) =>
                      handleChange("heladeraDestino", e.target.value)
                    }
                  >
                    <option value="">Seleccionar...</option>
                    {heladeras.map((heladera) => (
                      <option key={heladera.id} value={heladera.id}>
                        {heladera.nombre} - {heladera.ubicacion}
                      </option>
                    ))}
                  </select>
                  <div className="invalid-feedback">
                    Heladera de destino requerida.
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="cantidadViandas" className="form-label">
                    Cantidad de Viandas
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="cantidadViandas"
                    placeholder="Cantidad"
                    required
                    onChange={(e) =>
                      handleChange("cantidadViandas", e.target.value)
                    }
                  />
                  <div className="invalid-feedback">
                    Cantidad de viandas requerida.
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="motivoDistribucion" className="form-label">
                    Motivo de la Distribución
                  </label>
                  <textarea
                    className="form-control"
                    id="motivoDistribucion"
                    placeholder="Motivo de la distribución"
                    required
                    onChange={(e) =>
                      handleChange("motivoDistribucion", e.target.value)
                    }
                  ></textarea>
                  <div className="invalid-feedback">
                    Motivo de la distribución requerido.
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="fechaDistribucion" className="form-label">
                    Fecha de la Distribución
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="fechaDistribucion"
                    required
                    onChange={(e) =>
                      handleDateChange("fechaDistribucion", e.target.value)
                    }
                  />
                  <div className="invalid-feedback">
                    Fecha de distribución requerida.
                  </div>
                </div>
              </div>

              <hr className="my-4" />

              {/* Botones invertidos: "Ver Recomendaciones" primero, "Registrar Distribución" después */}
              <div className="d-flex justify-content-between">
                {/* Botón "Ver Recomendaciones" a la izquierda */}
                <button
                  className="w-45 btn btn-success btn-lg"
                  onClick={() => setShowRecommendationsForm(true)}
                  type="button"
                >
                  Ver Recomendaciones
                </button>

                {/* Botón "Registrar Distribución" a la derecha */}
                <button className="w-45 btn btn-primary btn-lg" type="submit">
                  Registrar Distribución
                </button>
              </div>
            </form>

            {/* Formulario para obtener recomendaciones */}
            {showRecommendationsForm && (
              <form className="mt-4" onSubmit={handleRecommendationsSubmit}>
                <h3>Buscar Recomendaciones</h3>
                <div className="row g-3">
                  <div className="col-4">
                    <label htmlFor="longitud" className="form-label">
                      Longitud
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="longitud"
                      name="longitud"
                      value={recommendationsData.longitud}
                      onChange={handleRecommendationChange}
                      required
                    />
                  </div>

                  <div className="col-4">
                    <label htmlFor="latitud" className="form-label">
                      Latitud
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="latitud"
                      name="latitud"
                      value={recommendationsData.latitud}
                      onChange={handleRecommendationChange}
                      required
                    />
                  </div>

                  <div className="col-4">
                    <label htmlFor="radio" className="form-label">
                      Radio (en metros)
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="radio"
                      name="radio"
                      value={recommendationsData.radio}
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

        {/* Mostrar mensaje */}
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

export default DistribucionVianda;
