import React, { useState, useEffect, useContext } from "react";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

function ModificarTecnico() {
  const [tecnicos, setTecnicos] = useState([]); // Lista de técnicos
  const [tecnicoId, setTecnicoId] = useState(""); // Técnico seleccionado
  const [tecnico, setTecnico] = useState({
    nombre: "",
    apellido: "",
    tipoDocumento: "",
    documento: "",
    cuil: "",
    medioContacto: "",
    areaCobertura: "",
  });
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);
  const { user, loading } = useContext(UserContext);
  const localhost = "http://localhost:8080";

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      console.log("Usuario no encontrado, redirigiendo...");
      navigate("/");
    }
  }, [user, loading, navigate]);

  // Cargar lista de técnicos al montar el componente
  useEffect(() => {
    async function fetchTecnicos() {
      try {
        const response = await fetch(`${localhost}/tecnicos`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setTecnicos(data);
        } else {
          console.error("Error al cargar la lista de técnicos");
        }
      } catch (error) {
        console.error("Error durante la carga de técnicos:", error);
      }
    }

    fetchTecnicos();
  }, []);

  // Cargar datos del técnico seleccionado
  useEffect(() => {
    if (!tecnicoId) return;

    const selectedTecnico = tecnicos.find(
      (tec) => tec.id === Number(tecnicoId)
    );
    if (selectedTecnico) {
      setTecnico({
        nombre: selectedTecnico.nombre || "",
        apellido: selectedTecnico.apellido || "",
        tipoDocumento: selectedTecnico.tipoDocumento || "",
        documento: selectedTecnico.documento || "",
        cuil: selectedTecnico.cuil || "",
        medioContacto: selectedTecnico.medioContacto || "",
        areaCobertura: selectedTecnico.areaCobertura || "",
      });
    }
  }, [tecnicoId, tecnicos]);

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
        setMessage("Técnico actualizado exitósamente.");
        setMessageType("success");
      } else {
        setMessage("Error al actualizar al técnico.");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Error durante la solicitud: " + error.message);
      setMessageType("error");
    }
  }

  return (
    <div className="ModificarTecnico">
      <Sidebar />
      <div className="content">
        <h1 className="display-4 fw-normal">Modificar Técnico</h1>
        <br />

        <div className="mb-3">
          <label htmlFor="tecnicoSelect" className="form-label">
            Seleccione un Técnico
          </label>
          <select
            id="tecnicoSelect"
            className="form-select"
            value={tecnicoId}
            onChange={(e) => setTecnicoId(e.target.value)}
          >
            <option value="">Seleccione...</option>
            {tecnicos.map((tec) => (
              <option key={tec.id} value={tec.id}>
                {tec.nombre} {tec.apellido}
              </option>
            ))}
          </select>
        </div>

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
                value={tecnico.cuil}
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

export default ModificarTecnico;
