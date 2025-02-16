import React, { useState, useEffect, useContext } from "react";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

function TecnicosAlta() {
  const [tecnico, setTecnico] = useState({
    nombre: "",
    apellido: "",
    tipoDocumento: "",
    documento: "",
    cuit: "",
    medioContacto: "",
    numero: "",
    email: "",
    areaCobertura: "",
    user: "",
    password: "",
  });

  const { user, loading } = useContext(UserContext);
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

  async function addTecnico() {
    if (!validateForm()) return;

    try {
      const response = await fetch(localhost + "/tecnicos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tecnico),
      });

      if (response.ok) {
        setMessage("Técnico registrado exitósamente.");
        setMessageType("success");
      } else {
        setMessage("Error al registrar el técnico.");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Error durante la solicitud: " + error.message);
      setMessageType("error");
    }
  }

  function validateForm() {
    if (
      !tecnico.nombre ||
      !tecnico.apellido ||
      !tecnico.tipoDocumento ||
      !tecnico.documento
    ) {
      alert("Por favor completa todos los campos obligatorios.");
      return false;
    }
    return true;
  }

  const handleChange = (field, value) => {
    setTecnico({ ...tecnico, [field]: value });
  };

  return (
    <div className="TecnicosAlta">
      <Sidebar />
      <div className="content">
        <h1 className="display-4 fw-normal">Alta Técnico</h1>
        <br />
        <form className="needs-validation" noValidate>
          <div className="row g-3">
            <div className="col-12">
              <label htmlFor="nombre" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                placeholder="Nombre"
                required
                onChange={(e) => handleChange("nombre", e.target.value)}
              />
              <div className="invalid-feedback">Nombre requerido.</div>
            </div>

            <div className="col-12">
              <label htmlFor="apellido" className="form-label">
                Apellido
              </label>
              <input
                type="text"
                className="form-control"
                id="apellido"
                placeholder="Apellido"
                required
                onChange={(e) => handleChange("apellido", e.target.value)}
              />
              <div className="invalid-feedback">Apellido requerido.</div>
            </div>

            <div className="col-12">
              <label htmlFor="tipoDocumento" className="form-label">
                Tipo de documento
              </label>
              <select
                className="form-control"
                id="tipoDocumento"
                required
                onChange={(e) => handleChange("tipoDocumento", e.target.value)}
              >
                <option value="">Choose...</option>
                <option value="DNI">DNI</option>
                <option value="Pasaporte">Pasaporte</option>
                <option value="CI">CI</option>
              </select>
              <div className="invalid-feedback">
                Tipo de Documento requerido.
              </div>
            </div>

            <div className="col-12">
              <label htmlFor="documento" className="form-label">
                Numero de Documento
              </label>
              <input
                type="text"
                className="form-control"
                id="documento"
                placeholder="Documento"
                required
                onChange={(e) => handleChange("documento", e.target.value)}
              />
              <div className="invalid-feedback">
                Numero de documento requerido.
              </div>
            </div>

            <div className="col-12">
              <label htmlFor="cuil" className="form-label">
                CUIL
              </label>
              <input
                type="text"
                className="form-control"
                id="cuil"
                placeholder="Cuil"
                required
                onChange={(e) => handleChange("cuil", e.target.value)}
              />
              <div className="invalid-feedback">CUIL requerido.</div>
            </div>

            <div className="col-12">
              <label htmlFor="medioContacto" className="form-label">
                Medio de Contacto
              </label>
              <select
                type="medioDeContacto"
                className="form-control"
                id="medioDeContacto"
                placeholder="Medio de contacto"
                required
                onChange={(e) => handleChange("medioContacto", e.target.value)}
              >
                <option value="">Choose...</option>
                <option>WhatsApp</option>
                <option>Email</option>
              </select>
              <div className="invalid-feedback">
                Medio de Contacto requerido.
              </div>
            </div>

            {tecnico.medioContacto === "WhatsApp" && (
              <>
                <div className="col-12">
                  <label htmlFor="numero" className="form-label">
                    Numero
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="numero"
                    placeholder="Numero"
                    required
                    onChange={(e) => handleChange("numero", e.target.value)}
                  />
                  <div className="invalid-feedback">Numero requerido.</div>
                </div>
              </>
            )}

            {tecnico.medioContacto === "Email" && (
              <>
                <div className="col-12">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    required
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                  <div className="invalid-feedback">Email requerido.</div>
                </div>
              </>
            )}

            <div className="col-12">
              <label htmlFor="areaCobertura" className="form-label">
                Area de Cobertura
              </label>
              <input
                type="text"
                className="form-control"
                id="areaCobertura"
                placeholder="AreaCobertura"
                required
                onChange={(e) => handleChange("areaCobertura", e.target.value)}
              />
              <div className="invalid-feedback">
                Area de Cobertura requerido.
              </div>
            </div>

            <div className="col-12">
              <label htmlFor="user" className="form-label">
                Usuario
              </label>
              <input
                type="text"
                className="form-control"
                id="user"
                placeholder="Usuario"
                required
                onChange={(e) => handleChange("user", e.target.value)}
              />
              <div className="invalid-feedback">Usuario requerido.</div>
            </div>

            <div className="col-12">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Contraseña"
                required
                onChange={(e) => handleChange("password", e.target.value)}
              />
              <div className="invalid-feedback">Contraseña requerida.</div>
            </div>
          </div>
          <hr className="my-4" />
          <button
            className="w-100 btn btn-primary btn-lg"
            type="button"
            onClick={addTecnico}
          >
            Guardar
          </button>
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

export default TecnicosAlta;
