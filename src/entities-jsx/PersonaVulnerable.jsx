import React, { useState } from "react";
import Sidebar from "./Sidebar";

function PersonaVulnerable() {
  const [personaVulnerable, setPersonaVulnerable] = useState({
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
    situacionDeCalle: false,
    domicilio: "",
    tieneMenoresACargo: false,
    cantidadMenoresACargo: 0,
    tarjeta: "", // Campo de tarjeta
  });

  const localhost = "http://localhost:8080";

  // Función para agregar la persona vulnerable al backend
  async function addPersonaVulnerable(e) {
    e.preventDefault(); // Prevenir comportamiento por defecto del formulario
    try {
      const response = await fetch(localhost + "/personas-vulnerables", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(personaVulnerable),
      });

      if (response.ok) {
        console.log("Persona vulnerable registrada exitosamente.");
        // Aquí podrías agregar algún mensaje de éxito o redirigir a otra página.
      } else {
        console.error("Error al registrar la persona vulnerable.");
      }
    } catch (error) {
      console.error("Error durante la solicitud:", error);
    }
  }

  // Función para manejar los cambios en los campos del formulario
  const handleChange = (field, value) => {
    setPersonaVulnerable({
      ...personaVulnerable,
      [field]: value,
    });
  };

  return (
    <div className="PersonaVulnerable">
      <Sidebar />
      <div className="content">
        <h1 className="display-4 fw-normal">Registrar Persona Vulnerable</h1>
        <br />
        <form
          className="needs-validation"
          noValidate
          onSubmit={addPersonaVulnerable}
        >
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
              <label htmlFor="fechaNacimiento" className="form-label">
                Fecha de Nacimiento
              </label>
              <input
                type="date"
                className="form-control"
                id="fechaNacimiento"
                required
                onChange={(e) =>
                  handleChange("fechaNacimiento", e.target.value)
                }
              />
              <div className="invalid-feedback">
                Fecha de nacimiento requerida.
              </div>
            </div>

            <div className="col-12">
              <label htmlFor="situacionDeCalle" className="form-label">
                ¿Está en situación de calle?
              </label>
              <select
                className="form-select"
                id="situacionDeCalle"
                required
                onChange={(e) =>
                  handleChange("situacionDeCalle", e.target.value === "true")
                }
              >
                <option value="">Seleccione...</option>
                <option value="true">Sí</option>
                <option value="false">No</option>
              </select>
              <div className="invalid-feedback">
                Situación de calle requerida.
              </div>
            </div>

            {!personaVulnerable.situacionDeCalle && (
              <div className="col-12">
                <label htmlFor="domicilio" className="form-label">
                  Domicilio
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="domicilio"
                  placeholder="Domicilio"
                  onChange={(e) => handleChange("domicilio", e.target.value)}
                />
              </div>
            )}

            <div className="col-12">
              <label htmlFor="tieneMenoresACargo" className="form-label">
                ¿Tiene menores a cargo?
              </label>
              <select
                className="form-select"
                id="tieneMenoresACargo"
                required
                onChange={(e) =>
                  handleChange("tieneMenoresACargo", e.target.value === "true")
                }
              >
                <option value="">Seleccione...</option>
                <option value="true">Sí</option>
                <option value="false">No</option>
              </select>
              <div className="invalid-feedback">
                Debe indicar si tiene menores a cargo.
              </div>
            </div>

            {personaVulnerable.tieneMenoresACargo && (
              <div className="col-12">
                <label htmlFor="cantidadMenoresACargo" className="form-label">
                  Cantidad de menores a cargo
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="cantidadMenoresACargo"
                  placeholder="Cantidad de menores"
                  required
                  onChange={(e) =>
                    handleChange("cantidadMenoresACargo", e.target.value)
                  }
                />
                <div className="invalid-feedback">
                  Cantidad de menores requerida.
                </div>
              </div>
            )}

            {/* Campo tarjeta: obligatorio y solo 11 caracteres */}
            <div className="col-12">
              <label htmlFor="tarjeta" className="form-label">
                Tarjeta Asociada
              </label>
              <input
                type="text"
                className="form-control"
                id="tarjeta"
                placeholder="Ingrese una tarjeta"
                required
                maxLength="11"
                pattern=".{11}" // Asegura que sea exactamente 11 caracteres
                onChange={(e) => handleChange("tarjeta", e.target.value)}
              />
              <div className="invalid-feedback">
                Este campo es obligatorio y debe tener exactamente 11
                caracteres.
              </div>
            </div>
          </div>

          <hr className="my-4" />

          <button className="w-100 btn btn-primary btn-lg" type="submit">
            Registrar Persona Vulnerable
          </button>
        </form>
      </div>
    </div>
  );
}

export default PersonaVulnerable;
