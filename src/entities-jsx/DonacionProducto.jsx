import React, { useState } from "react";
import Sidebar from "./Sidebar";

function RegistroEmpresa() {
  const [empresa, setEmpresa] = useState({
    nombre: "",
    rubro: "",
    puntosNecesarios: 0,
    imagen: "",
  });

  const localhost = "http://localhost:8080";

  // Función para manejar los cambios en los campos del formulario
  const handleChange = (field, value) => {
    setEmpresa({
      ...empresa,
      [field]: value,
    });
  };

  // Función para manejar el envío del formulario
  async function addEmpresa(e) {
    e.preventDefault(); // Prevenir comportamiento por defecto del formulario
    try {
      const response = await fetch(localhost + "/empresas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(empresa),
      });

      if (response.ok) {
        console.log("Empresa registrada exitosamente.");
        // Aquí podrías agregar algún mensaje de éxito o redirigir a otra página.
      } else {
        console.error("Error al registrar la empresa.");
      }
    } catch (error) {
      console.error("Error durante la solicitud:", error);
    }
  }

  return (
    <div className="RegistroEmpresa">
      <Sidebar />
      <div className="content">
        <h1 className="display-4 fw-normal">
          Registrar Empresa para Ofrecer Beneficios
        </h1>
        <br />
        <form className="needs-validation" noValidate onSubmit={addEmpresa}>
          <div className="row g-3">
            <div className="col-12">
              <label htmlFor="nombre" className="form-label">
                Nombre de la oferta
              </label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                placeholder="Nombre de la oferta"
                required
                onChange={(e) => handleChange("nombre", e.target.value)}
              />
              <div className="invalid-feedback">
                Nombre de la oferta requerido.
              </div>
            </div>

            <div className="col-12">
              <label htmlFor="rubro" className="form-label">
                Rubro
              </label>
              <select
                className="form-select"
                id="rubro"
                required
                onChange={(e) => handleChange("rubro", e.target.value)}
              >
                <option value="">Seleccione...</option>
                <option value="gastronomia">Gastronomía</option>
                <option value="electronica">Electrónica</option>
                <option value="articulosHogar">Artículos para el hogar</option>
                <option value="ropa">Ropa</option>
                <option value="otros">Otros</option>
              </select>
              <div className="invalid-feedback">Rubro requerido.</div>
            </div>

            <div className="col-12">
              <label htmlFor="puntosNecesarios" className="form-label">
                Puntos necesarios
              </label>
              <input
                type="number"
                className="form-control"
                id="puntosNecesarios"
                placeholder="Cantidad de puntos"
                required
                onChange={(e) =>
                  handleChange("puntosNecesarios", e.target.value)
                }
              />
              <div className="invalid-feedback">
                Cantidad de puntos requerida.
              </div>
            </div>

            <div className="col-12">
              <label htmlFor="imagen" className="form-label">
                Imagen ilustrativa
              </label>
              <input
                type="url"
                className="form-control"
                id="imagen"
                placeholder="URL de la imagen"
                onChange={(e) => handleChange("imagen", e.target.value)}
              />
              <div className="invalid-feedback">
                Debe ingresar una URL válida si desea agregar una imagen.
              </div>
            </div>
          </div>

          <hr className="my-4" />

          <button className="w-100 btn btn-primary btn-lg" type="submit">
            Registrar Oferta
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegistroEmpresa;
