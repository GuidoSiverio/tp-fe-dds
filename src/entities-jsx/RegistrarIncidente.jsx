import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

function RegistrarIncidente() {
  const [incidente, setIncidente] = useState({
    heladera: "",
    fechaVisita: "",
    comentario: "",
    imagenes: [],
    solucionado: false,
  });

  const [heladeras, setHeladeras] = useState([]);

  const navigate = useNavigate();
  const localhost = "http://localhost:8080";

  // Obtener heladeras desde el backend
  useEffect(() => {
    async function fetchHeladeras() {
      try {
        const response = await fetch(localhost + "/heladeras");
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setHeladeras(data);
      } catch (error) {
        console.error("Error al obtener heladeras:", error);
        alert("Error al cargar las heladeras.");
      }
    }

    fetchHeladeras();
  }, []);

  async function addIncidente() {
    if (!validateForm()) return;

    try {
      const response = await fetch(localhost + "/RegistrarIncidente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(incidente),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      alert("Incidente registrado exitosamente.");
      navigate("/");
    } catch (error) {
      console.error("Error durante el registro:", error);
      alert("Error al registrar incidente: " + error.message);
    }
  }

  function validateForm() {
    if (
      !incidente.heladera ||
      !incidente.fechaVisita ||
      !incidente.comentario
    ) {
      alert("Por favor completa todos los campos obligatorios.");
      return false;
    }
    return true;
  }

  const handleChange = (field, value) => {
    setIncidente({ ...incidente, [field]: value });
  };

  const handleCheckboxChange = () => {
    setIncidente({ ...incidente, solucionado: !incidente.solucionado });
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setIncidente({
      ...incidente,
      imagenes: [...incidente.imagenes, ...imageUrls],
    });
  };

  return (
    <div className="RegistrarIncidente">
      <Sidebar />
      <div className="content">
        <h1 className="display-4 fw-normal">Registrar Incidente</h1>
        <br />
        <form className="needs-validation" noValidate>
          <div className="row g-3">
            {/* Selección de heladeras desde el backend */}
            <div className="col-12">
              <label htmlFor="heladera" className="form-label">
                Heladera
              </label>
              <select
                className="form-control"
                id="heladera"
                value={incidente.heladera}
                onChange={(e) => handleChange("heladera", e.target.value)}
              >
                <option value="">Seleccione una heladera</option>
                {heladeras.map((heladera) => (
                  <option key={heladera.id} value={heladera.id}>
                    {heladera.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Fecha de Visita */}
            <div className="col-12">
              <label htmlFor="fechaVisita" className="form-label">
                Fecha de Visita
              </label>
              <input
                type="date"
                className="form-control"
                id="fechaVisita"
                required
                onChange={(e) => handleChange("fechaVisita", e.target.value)}
              />
            </div>

            {/* Comentario */}
            <div className="col-12">
              <label htmlFor="comentario" className="form-label">
                Comentario
              </label>
              <textarea
                className="form-control"
                id="comentario"
                placeholder="Describe el trabajo realizado"
                required
                onChange={(e) => handleChange("comentario", e.target.value)}
              />
            </div>

            {/* Carga de imágenes */}
            <div className="col-12">
              <label htmlFor="imagenes" className="form-label">
                Subir Imágenes
              </label>
              <input
                type="file"
                className="form-control"
                id="imagenes"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
              />
              <div className="mt-2">
                {incidente.imagenes.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt="Incidente"
                    width="100"
                    className="me-2"
                  />
                ))}
              </div>
            </div>

            {/* Checkbox de solucionado */}
            <div className="col-12 d-flex justify-content-center">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input custom-checkbox"
                  id="solucionado"
                  checked={incidente.solucionado}
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label ms-2" htmlFor="solucionado">
                  ¿Solucionado?
                </label>
              </div>
            </div>
          </div>
          <hr className="my-4" />
          <button
            className="w-100 btn btn-primary btn-lg"
            type="button"
            onClick={addIncidente}
          >
            Guardar
          </button>
        </form>
      </div>

      <style>
        {`
          .custom-checkbox {
            transform: scale(1.5); 
            margin-right: 10px; 
          }
        `}
      </style>
    </div>
  );
}

export default RegistrarIncidente;
