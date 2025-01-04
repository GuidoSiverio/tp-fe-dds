import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";

function DistribucionVianda() {
  const [distribucion, setDistribucion] = useState({
    heladeraOrigen: "",
    heladeraDestino: "",
    cantidadViandas: "",
    motivoDistribucion: "",
    fechaDistribucion: "",
  });

  const [heladeras, setHeladeras] = useState([]); // Para almacenar las heladeras disponibles
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
      const response = await fetch(localhost + "/distribuciones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(distribucion),
      });

      if (response.ok) {
        console.log("Distribución registrada exitosamente.");
        // Aquí podrías agregar algún mensaje de éxito o redirigir a otra página.
      } else {
        console.error("Error al registrar la distribución");
      }
    } catch (error) {
      console.error("Error durante la solicitud:", error);
    }
  }

  // Función para manejar los cambios en los campos
  const handleChange = (field, value) => {
    setDistribucion({
      ...distribucion,
      [field]: value,
    });
  };

  // Obtener las heladeras disponibles cuando el componente se monta
  useEffect(() => {
    getHeladeras();
  }, []);

  return (
    <div className="DistribucionVianda">
      <Sidebar />
      <div className="content">
        <h1 className="display-4 fw-normal">
          Registrar Distribución de Vianda
        </h1>
        <br />
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
                onChange={(e) => handleChange("heladeraOrigen", e.target.value)}
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
                  handleChange("fechaDistribucion", e.target.value)
                }
              />
              <div className="invalid-feedback">
                Fecha de distribución requerida.
              </div>
            </div>
          </div>

          <hr className="my-4" />

          <button className="w-100 btn btn-primary btn-lg" type="submit">
            Registrar Distribución
          </button>
        </form>
      </div>
    </div>
  );
}

export default DistribucionVianda;
