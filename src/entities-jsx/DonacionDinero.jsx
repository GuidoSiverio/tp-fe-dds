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

  async function addDonacion(e) {
    e.preventDefault();
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
        setMessage("Donación registrada exitosamente.");
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
          <h1>Debes ser colaborador para realizar una donación de dinero.</h1>
        ) : (
          <form className="needs-validation" noValidate onSubmit={addDonacion}>
            <div className="row g-3">
              <div className="col-12">
                <label
                  htmlFor="fechaDonacion"
                  className="form-label"
                  style={{ fontSize: "1.2rem" }}
                >
                  Fecha de la Donación
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="fechaDonacion"
                  required
                  style={{ fontSize: "1.2rem" }}
                  onChange={(e) =>
                    handleDateChange("fechaDonacion", e.target.value)
                  }
                />
              </div>

              <div className="col-12">
                <label className="form-label" style={{ fontSize: "1.2rem" }}>
                  Monto de la donación
                </label>
                <div className="btn-group d-flex mb-2" role="group">
                  {[1000, 2000, 5000, 10000].map((amount) => (
                    <button
                      type="button"
                      key={amount}
                      className="btn btn-outline-primary"
                      style={{ fontSize: "1.2rem" }}
                      onClick={() => handleChange("monto", amount)}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  step="0.01"
                  className="form-control mt-2"
                  id="monto"
                  placeholder="Monto personalizado"
                  style={{ fontSize: "1.2rem" }}
                  onChange={(e) => handleChange("monto", e.target.value)}
                />
              </div>

              <div className="col-12">
                <label
                  htmlFor="frecuencia"
                  className="form-label"
                  style={{ fontSize: "1.2rem" }}
                >
                  Frecuencia de la donación
                </label>
                <select
                  className="form-select"
                  id="frecuencia"
                  required
                  style={{ fontSize: "1.2rem" }}
                  onChange={(e) => handleChange("frecuencia", e.target.value)}
                >
                  <option value="">Seleccionar...</option>
                  <option value="mensual">Mensual</option>
                  <option value="Por única vez">Por única vez</option>
                </select>
              </div>

              <div className="col-12 d-flex justify-content-center">
                <div
                  className="form-check form-check-lg"
                  style={{ padding: "10px", borderRadius: "5px" }}
                >
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="formaPeriodica"
                    style={{ transform: "scale(1.5)" }}
                    onChange={(e) =>
                      handleChange("formaPeriodica", e.target.checked)
                    }
                  />
                  <label
                    className="form-check-label ms-2"
                    htmlFor="formaPeriodica"
                    style={{ fontSize: "1.2rem" }}
                  >
                    ¿Es una donación periódica?
                  </label>
                </div>
              </div>
            </div>

            <hr className="my-4" />

            <button
              className="w-100 btn btn-primary btn-lg"
              type="submit"
              style={{ fontSize: "1.2rem" }}
            >
              Registrar Donación
            </button>
          </form>
        )}
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
    </div>
  );
}

export default DonacionDinero;
