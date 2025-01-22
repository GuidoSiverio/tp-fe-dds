import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";

function ModificarTecnico({ tecnicoId }) {
  const [tecnico, setTecnico] = useState({
    nombre: "",
    apellido: "",
    tipoDocumento: "",
    documento: "",
    cuit: "",
    medioContacto: "",
    areaCobertura: "",
  });

  const [loading, setLoading] = useState(true); // Para manejar el estado de carga
  const [error, setError] = useState(null); // Para manejar errores
  const localhost = "http://localhost:8080";

  useEffect(() => {
    if (!tecnicoId) {
      setError("El ID del técnico es requerido.");
      setLoading(false);
      return;
    }

    async function fetchTecnico() {
      try {
        const response = await fetch(`${localhost}/tecnicos/${tecnicoId}`);
        if (response.ok) {
          const data = await response.json();
          setTecnico({
            nombre: data.nombre || "",
            apellido: data.apellido || "",
            tipoDocumento: data.tipoDocumento || "",
            documento: data.documento || "",
            cuit: data.cuit || "",
            medioContacto: data.medioContacto || "",
            areaCobertura: data.areaCobertura || "",
          });
        } else {
          setError("No se pudo cargar la información del técnico.");
        }
      } catch (err) {
        setError("Error al conectarse al servidor.");
      } finally {
        setLoading(false);
      }
    }

    fetchTecnico();
  }, [tecnicoId]);

  const handleChange = (field, value) => {
    setTecnico({
      ...tecnico,
      [field]: value,
    });
  };

  async function updateTecnico() {
    try {
      const response = await fetch(`${localhost}/tecnicos/${tecnicoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tecnico),
      });

      if (response.ok) {
        alert("Técnico actualizado con éxito");
      } else {
        alert("Error al actualizar el técnico");
      }
    } catch (error) {
      console.error("Error durante la actualización:", error);
      alert("Error al actualizar el técnico");
    }
  }

  if (loading) {
    return <div>Cargando datos del técnico...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="ModificarTecnico">
      <Sidebar />
      <div className="content">
        <h1 className="display-4 fw-normal">Modificar Técnico</h1>
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
                value={tecnico.nombre}
                onChange={(e) => handleChange("nombre", e.target.value)}
              />
            </div>

            <div className="col-12">
              <label htmlFor="apellido" className="form-label">
                Apellido
              </label>
              <input
                type="text"
                className="form-control"
                id="apellido"
                value={tecnico.apellido}
                onChange={(e) => handleChange("apellido", e.target.value)}
              />
            </div>

            <div className="col-12">
              <label htmlFor="tipoDocumento" className="form-label">
                Tipo de Documento
              </label>
              <input
                type="text"
                className="form-control"
                id="tipoDocumento"
                value={tecnico.tipoDocumento}
                onChange={(e) => handleChange("tipoDocumento", e.target.value)}
              />
            </div>

            <div className="col-12">
              <label htmlFor="documento" className="form-label">
                Documento
              </label>
              <input
                type="text"
                className="form-control"
                id="documento"
                value={tecnico.documento}
                onChange={(e) => handleChange("documento", e.target.value)}
              />
            </div>

            <div className="col-12">
              <label htmlFor="cuil" className="form-label">
                CUIL
              </label>
              <input
                type="text"
                className="form-control"
                id="cuil"
                value={tecnico.cuit}
                onChange={(e) => handleChange("cuit", e.target.value)}
              />
            </div>

            <div className="col-12">
              <label htmlFor="medioContacto" className="form-label">
                Medio de Contacto
              </label>
              <input
                type="text"
                className="form-control"
                id="medioContacto"
                value={tecnico.medioContacto}
                onChange={(e) => handleChange("medioContacto", e.target.value)}
              />
            </div>

            <div className="col-12">
              <label htmlFor="areaCobertura" className="form-label">
                Área de Cobertura
              </label>
              <input
                type="text"
                className="form-control"
                id="areaCobertura"
                value={tecnico.areaCobertura}
                onChange={(e) => handleChange("areaCobertura", e.target.value)}
              />
            </div>
          </div>

          <hr className="my-4" />
          <button
            className="w-100 btn btn-primary btn-lg"
            type="button"
            onClick={updateTecnico}
          >
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModificarTecnico;
