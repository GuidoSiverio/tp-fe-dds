import React, { useState, useContext, useEffect } from "react";
import Sidebar from "./Sidebar";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

function DonacionDinero() {
  const { user, colaboradorContext, isColaboradorLinked, loading } =
    useContext(UserContext);
  const [donacion, setDonacion] = useState({
    monto: "",
    frecuencia: "",
    formaPeriodica: false,
    colaboradorId: "",
  });
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const localhost = "http://localhost:8080";

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      console.log("Usuario no encontrado, redirigiendo...");
      navigate("/");
    }
  }, [user, loading, navigate]);

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
        setDonacion({
          monto: "",
          frecuencia: "",
          formaPeriodica: false,
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

  const handleChange = (field, value) => {
    setDonacion({
      ...donacion,
      [field]: value,
    });
  };

  const handleDateChange = (field, value) => {
    const formattedDate = new Date(value).toISOString().split("T")[0];
    handleChange(field, formattedDate);
  };

  useEffect(() => {
    if (isColaboradorLinked && colaboradorContext?.id) {
      setDonacion((prev) => ({
        ...prev,
        colaboradorId: colaboradorContext.id,
      }));
    }
  }, [isColaboradorLinked, colaboradorContext]);

  return (
    <div className="DonacionDinero">
      <Sidebar />
      <h2 className="pb-2 animated-slideIn">Registrar Donación de Dinero</h2>
      <div className="content-heladera">
        
        
        {!isColaboradorLinked ? (
          <h1>Debes ser colaborador para realizar una donación de dinero.</h1>
        ) : (
          <form className="needs-validation" noValidate onSubmit={addDonacion}>
            <div className="row g-3">
              <div className="col-md-6">
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
                  id="monto"
                  placeholder="Monto personalizado"
                  style={{ fontSize: "1.2rem" }}
                  value={donacion.monto}
                  onChange={(e) => handleChange("monto", e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label
                  htmlFor="frecuencia"
                  style={{ fontSize: "1.2rem" }}
                >
                  Frecuencia de la donación
                </label>
                <select
                  className="select-formulario"
                  id="frecuencia"
                  required
                  style={{ fontSize: "1.2rem" }}
                  value={donacion.frecuencia}
                  onChange={(e) => handleChange("frecuencia", e.target.value)}
                >
                  <option value="">Seleccionar...</option>
                  <option value="mensual">Mensual</option>
                  <option value="Por única vez">Por única vez</option>
                </select>
              </div>

              <div className="col-md-6 ">
                <div
                  className="form-check form-check-lg"
                  style={{ padding: "10px", borderRadius: "5px" }}
                >
                  <input
                    type="checkbox"
                    id="formaPeriodica"
                    style={{ transform: "scale(1.5)" }}
                    checked={donacion.formaPeriodica}
                    onChange={(e) =>
                      handleChange("formaPeriodica", e.target.checked)
                    }
                  />
                  <label
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
