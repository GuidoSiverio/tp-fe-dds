import React, { useState, useContext, useEffect } from "react";
import Sidebar from "./Sidebar";
import { UserContext } from "./UserContext";

function DonacionDinero() {
  const {
    collaborator: colaborador,
    isCollaboratorLinked: isColaboradorLinked,
  } = useContext(UserContext);
  const [donacion, setDonacion] = useState({
    fechaDonacion: "",
    monto: "",
    frecuencia: "",
    formaPeriodica: false,
    colaboradorId: "",
  });
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const localhost = "http://localhost:8080";

  // Función para agregar la donación al backend
  async function addDonacion(e) {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    console.log("Datos enviados:", donacion);
    try {
      const response = await fetch(
        localhost + "/contribuciones/donacion-dinero",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(donacion),
        }
      );

      if (response.ok) {
        setMessage("Donación registrada exitósamente.");
        setMessageType("success");
      } else {
        setMessage("Error al registrar la donación.");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Error durante la solicitud: " + error.message);
      setMessageType("error");
    }
  }

  // Función para manejar los cambios en los campos
  const handleChange = (field, value) => {
    setDonacion({
      ...donacion,
      [field]: value,
    });
  };

  const handleDateChange = (field, value) => {
    const formattedDate = new Date(value).toISOString().slice(0, -1);
    handleChange(field, formattedDate);
  };

  useEffect(() => {
    if (isColaboradorLinked && colaborador?.id) {
      setDonacion((prev) => ({ ...prev, colaboradorId: colaborador.id }));
    }
  }, [isColaboradorLinked, colaborador]);

  return (
    <div className="DonacionDinero">
      <Sidebar />
      <div className="content">
        <h1 className="display-4 fw-normal">Registrar Donación de Dinero</h1>
        <br />
        {!isColaboradorLinked ? (
          <h1>Debes ser colaborador para realizar una donacion de dinero.</h1>
        ) : (
          <form className="needs-validation" noValidate onSubmit={addDonacion}>
            <div className="row g-3">
              <div className="col-12">
                <label htmlFor="fechaDonacion" className="form-label">
                  Fecha de la Donación
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="fechaDonacion"
                  required
                  onChange={(e) =>
                    handleDateChange("fechaDonacion", e.target.value)
                  }
                />
                <div className="invalid-feedback">
                  Fecha de la donación requerida.
                </div>
              </div>

              <div className="col-12">
                <label htmlFor="monto" className="form-label">
                  Monto de la donación
                </label>
                <input
                  type="number"
                  step="0.01" // Permite decimales
                  className="form-control"
                  id="monto"
                  placeholder="Monto"
                  required
                  onChange={(e) => handleChange("monto", e.target.value)}
                />
                <div className="invalid-feedback">Monto requerido.</div>
              </div>

              <div className="col-12">
                <label htmlFor="frecuencia" className="form-label">
                  Frecuencia de la donación
                </label>
                <select
                  className="form-select"
                  id="frecuencia"
                  required
                  onChange={(e) => handleChange("frecuencia", e.target.value)}
                >
                  <option value="">Seleccionar...</option>
                  <option value="mensual">Mensual</option>
                  <option value="anual">Anual</option>
                  <option value="semanal">Semanal</option>
                  <option value="puntual">Puntual</option>
                </select>
                <div className="invalid-feedback">Frecuencia requerida.</div>
              </div>

              <div className="col-12">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="formaPeriodica"
                    onChange={(e) =>
                      handleChange("formaPeriodica", e.target.checked)
                    }
                  />
                  <label className="form-check-label" htmlFor="formaPeriodica">
                    ¿Es una donación periódica?
                  </label>
                </div>
              </div>
            </div>

            <hr className="my-4" />

            <button className="w-100 btn btn-primary btn-lg" type="submit">
              Registrar Donación
            </button>
          </form>
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

export default DonacionDinero;
