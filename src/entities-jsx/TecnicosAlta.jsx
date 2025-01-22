import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

function TecnicosAlta() {
  const [tecnico, setTecnico] = useState({
    nombre: "",
    apellido: "",
    tipoDocumento: "",
    documento: "",
    cuit: "",
    medioContacto: "",
    areaCobertura: "",
  });

  const navigate = useNavigate();
  const localhost = "http://localhost:8080";

  async function addTecnico() {
    if (!validateForm()) return;

    try {
      const response = await fetch(localhost + "/TecnicosAlta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tecnico),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      alert("Técnico registrado exitosamente.");
      navigate("/");
    } catch (error) {
      console.error("Error during register:", error);
      alert("Error al registrar técnico: " + error.message);
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
                Tipo de Documento
              </label>
              <input
                type="text"
                className="form-control"
                id="tipoDocumento"
                placeholder="TipoDocumento"
                required
                onChange={(e) => handleChange("tipoDocumento", e.target.value)}
              />
              <div className="invalid-feedback">
                Tipo de Documento requerido.
              </div>
            </div>

            <div className="col-12">
              <label htmlFor="documento" className="form-label">
                Documento
              </label>
              <input
                type="text"
                className="form-control"
                id="documento"
                placeholder="Documento"
                required
                onChange={(e) => handleChange("documento", e.target.value)}
              />
              <div className="invalid-feedback">Documento requerido.</div>
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
              <input
                type="text"
                className="form-control"
                id="medioContacto"
                placeholder="MedioContacto"
                required
                onChange={(e) => handleChange("medioContacto", e.target.value)}
              />
              <div className="invalid-feedback">
                Medio de Contacto requerido.
              </div>
            </div>

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
      </div>
    </div>
  );
}

export default TecnicosAlta;
