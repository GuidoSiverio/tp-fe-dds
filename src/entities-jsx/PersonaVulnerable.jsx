import React, { useState, useContext, useEffect } from "react";
import Sidebar from "./Sidebar";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

function PersonaVulnerable() {
  const { user, colaboradorContext, isColaboradorLinked, loading } =
    useContext(UserContext);
  const [personaVulnerable, setPersonaVulnerable] = useState({
    nombre: "",
    fechaNacimiento: "",
    situacionDeCalle: false,
    domicilio: "",
    poseeDni: false,
    tipoDni: "",
    numeroDni: "",
    tieneMenoresACargo: false,
    cantidadMenoresACargo: 0,
    tarjeta: "",
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
        setMessage("Persona registrada exitósamente.");
        setMessageType("success");
      } else {
        setMessage("Error al registrar la persona.");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Error durante la solicitud: " + error.message);
      setMessageType("error");
    }
  }

  // Función para manejar los cambios en los campos del formulario
  const handleChange = (field, value) => {
    setPersonaVulnerable({
      ...personaVulnerable,
      [field]: value,
    });
  };

  const handleDateChange = (field, value) => {
    const formattedDate = new Date(value).toISOString().split(".")[0];
    handleChange(field, formattedDate);
  };

  useEffect(() => {
    if (isColaboradorLinked && colaboradorContext?.id) {
      setPersonaVulnerable((prev) => ({
        ...prev,
        colaboradorId: colaboradorContext.id,
      }));
    }
  }, [isColaboradorLinked, colaboradorContext]);

  return (
    <div className="PersonaVulnerable">
      <Sidebar />
      <h2 className="pb-2 animated-slideIn">Registrar Persona Vulnerable</h2>
      <div className="content-heladera">
        
       
        {!isColaboradorLinked ? (
          <h1>
            Debes ser colaborador para registrar a una persona vulnerable.
          </h1>
        ) : (
          <form
            className="needs-validation"
            noValidate
            onSubmit={addPersonaVulnerable}
          >
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="nombre" className="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  
                  id="nombre"
                  placeholder="Nombre"
                  required
                  onChange={(e) => handleChange("nombre", e.target.value)}
                />
                <div className="invalid-feedback">Nombre requerido.</div>
              </div>

              <div className="col-md-6">
                <label htmlFor="fechaNacimiento" className="form-label">
                  Fecha de Nacimiento
                </label>
                <input
                  type="date"
                  
                  id="fechaNacimiento"
                  required
                  onChange={(e) =>
                    handleDateChange("fechaNacimiento", e.target.value)
                  }
                />
                <div className="invalid-feedback">
                  Fecha de nacimiento requerida.
                </div>
              </div>

              <div className="col-md-6">
                <label htmlFor="situacionDeCalle" className="form-label">
                  ¿Está en situación de calle?
                </label>
                <select
                  className="select-formulario"
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
                <div className="col-md-6">
                  <label htmlFor="domicilio" className="form-label">
                    Domicilio
                  </label>
                  <input
                    type="text"
                    
                    id="domicilio"
                    placeholder="Domicilio"
                    onChange={(e) => handleChange("domicilio", e.target.value)}
                  />
                </div>
              )}

              <div className="col-md-6">
                <label htmlFor="poseeDni" className="form-label">
                  ¿Posee documento?
                </label>
                <select
                  className="select-formulario"
                  id="poseeDni"
                  required
                  onChange={(e) =>
                    handleChange("poseeDni", e.target.value === "true")
                  }
                >
                  <option value="">Seleccione...</option>
                  <option value="true">Sí</option>
                  <option value="false">No</option>
                </select>
                <div className="invalid-feedback">Datos de DNI requeridos.</div>
              </div>

              {personaVulnerable.poseeDni && (
                <div className="col-md-6">
                  <label htmlFor="tipoDni" className="form-label">
                    Tipo de documento
                  </label>
                  <select
                    
                    id="tipoDni"
                    required
                    onChange={(e) => handleChange("tipoDni", e.target.value)}
                  >
                    <option value="">Choose...</option>
                    <option value="DNI">DNI</option>
                    <option value="Pasaporte">Pasaporte</option>
                    <option value="CI">CI</option>
                  </select>
                </div>
              )}
              {personaVulnerable.poseeDni && (
                <div className="col-md-6">
                  <label htmlFor="numeroDni" className="form-label">
                    Numero de documento
                  </label>
                  <input
                    type="text"
                    
                    id="numeroDni"
                    placeholder="Numero de documento"
                    onChange={(e) => handleChange("numeroDni", e.target.value)}
                  />
                </div>
              )}

              <div className="col-md-6">
                <label htmlFor="tieneMenoresACargo" className="form-label">
                  ¿Tiene menores a cargo?
                </label>
                <select
                  className="select-formulario"
                  id="tieneMenoresACargo"
                  required
                  onChange={(e) =>
                    handleChange(
                      "tieneMenoresACargo",
                      e.target.value === "true"
                    )
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
                <div className="col-md-6">
                  <label htmlFor="cantidadMenoresACargo" className="form-label">
                    Cantidad de menores a cargo
                  </label>
                  <input
                    type="number"
                    
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
              <div className="col-md-6">
                <label htmlFor="tarjeta" className="form-label">
                  Tarjeta Asociada
                </label>
                <input
                  type="text"
                  
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

export default PersonaVulnerable;
